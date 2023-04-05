import React, {ReactElement, useCallback, useEffect, useMemo, useState} from 'react';
import styles from "../../styles/admin/Events.module.scss"
import DashboardLayout from "../../layouts/dashboard/layout";
import {CustomTable, TableRow} from "../../components/customtable/customtable";
import {useSelection} from "../../hooks/use-selection";
import {applyPagination} from "../../utils/apply-paginations";
import {AuthJWTService} from "../../service/auth/authJWTService";
import {NextApiRequest, NextApiResponse} from "next";
// @ts-ignore
import Cookies from 'cookies'
import {getEvents} from "../../service/api/eventsApi";
import {ResponseEvent, SystemUser} from "../../openaip";
import Stack from "@mui/material/Stack";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import AlertDialog from "../../components/AlertModal/AlertModal";
import {useModalState} from "../../hooks/use-form-state";
import {useRouter} from "next/router";
import Image from "next/image";
import {Checkbox} from "@mui/material";
import AdminForm from "../../components/adminForm/adminForm";
import TextInput from "../../components/formComponents/textInput";
import {SwitchInput} from "../../components/formComponents/switchInput";
import {createEvent, deleteEvents} from "../../service/api/eventsApi";
import {getImageOrText} from "../../utils/getImageOrText";


const useEvents = (page: number, rowsPerPage: number, events: Array<any>) => {
        return useMemo(
        () => {
            return applyPagination(events, page, rowsPerPage);
        },
        [page, rowsPerPage, events]
    );
};

const useEventsIds = (events: Array<TableRow>) => {
    return useMemo(
        () => {
            return events.map((events) => events.id);
        },
        [events]
    );
};


type EventType = {
    target: {
        value: number
    }
}

type EventsProps = {
    profileUser: SystemUser,
    events: Array<ResponseEvent>
}

const Events = ({events}: EventsProps) => {

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const eventsPage = useEvents(page, rowsPerPage, events);
    const eventsIds = useEventsIds(eventsPage);
    const eventsSelection = useSelection(eventsIds);

    const [alert, setAlert] = useState({show: false, message: "", description: ""})
    const formState = useModalState()
    const [deleteDisable, setDeleteDisable] = useState(true)
    const router = useRouter();
    const [showAlert, setShowAlert] = useState(false)

    const rowConf = [
        {fieldName: 'name', click: true, clickHandle: formState.handleClickOpen},
        {fieldName: 'published', component: (record: any) => <Checkbox disabled checked={record.published} color="success"/>},
        {fieldName: 'image', component: (record: any) => getImageOrText(record)},
    ]

    const headConf = ["Name", "Published", "Image"]

    const handlePageChange = useCallback(
        (event: EventType, value: number) => {
            setPage(value);
        },
        []
    );

    const handleRowsPerPageChange = useCallback(
        (event: EventType) => {
            setRowsPerPage(event.target.value);
        },
        []
    );

    const deleteSelected = async () => {
        await deleteEvents(eventsSelection.selected)
        eventsSelection.handleDeselectAll()
        refreshPage()
    }

    const refreshPage = () => {
        router.replace(router.asPath);
    }

    useEffect(() => {
        if (eventsSelection.selected.length) {
            setDeleteDisable(false)
        } else {setDeleteDisable(true)}
    }, [eventsSelection.selected])

    const defaultFormState = {
        id: "",
        name: "",
        description: "",
        published: true,
        image: "",
    }

    const handleSubmitForm = async (formData: any) => {
        await createEvent(formData)
        refreshPage()
    }

    return (
        <>
        <div className={styles.events}>
            <CustomTable
                count={events.length}
                items={eventsPage}
                onDeselectAll={eventsSelection.handleDeselectAll}
                onDeselectOne={eventsSelection.handleDeselectOne}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleRowsPerPageChange}
                onSelectAll={eventsSelection.handleSelectAll}
                onSelectOne={eventsSelection.handleSelectOne}
                page={page}
                rowsPerPage={rowsPerPage}
                selected={eventsSelection.selected}
                rowsConf={rowConf}
                headConf={headConf}
            />
            <Stack spacing={2}
                   direction="row"
                   sx={{
                       padding: 2
                   }}
            >
                <Fab color="primary" aria-label="add" onClick={formState.handleNewOpen}>
                    <AddIcon />
                </Fab>
                <Fab color="error" aria-label="add" onClick={() => setShowAlert(true)} disabled={deleteDisable}>
                    <DeleteForeverIcon />
                </Fab>
            </Stack>
            <AdminForm formState={formState} defaultState={defaultFormState} submit={handleSubmitForm} title="Event" >
                <TextInput name="name"
                           label="Name"
                           required={"Need name"}
                />
                <TextInput name="description"
                           label="Description"
                           required={"Need description"}
                           rows={4}
                />
                <SwitchInput name="published" label="Published"/>
            </AdminForm>
            <AlertDialog showDialog={showAlert} handleSubmit={deleteSelected} setShowDialog={setShowAlert} />
        </div>
      </>
    );
};


Events.getLayout = (page: ReactElement) => {
    return (
        <DashboardLayout>
            {page}
        </DashboardLayout>
    )
}

type ServerSideProps = {
    req: NextApiRequest,
    res: NextApiResponse
}

export const getServerSideProps = async ({req, res}: ServerSideProps) => {
    const authService = AuthJWTService()
    const cookies = new Cookies(req, res)
    const token = cookies.get("access_token")

    const redirectObject = {
        redirect: {
            destination: "/admin/login",
            permanent: false,
        }
    }

    const isAuth = await authService.isAuthUser(token)
    if (!isAuth) {
        return redirectObject
    }

    const user = await authService.getUser(token)
    const events = await getEvents(token)

    return  {
        props: {
            profileUser: user,
            events: events
        }
    }

}

export default Events;
