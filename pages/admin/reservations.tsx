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
import {ResponseReservation, SystemUser} from "../../openaip";
import Checkbox from "@mui/material/Checkbox";
import Stack from "@mui/material/Stack";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import AlertDialog from "../../components/AlertModal/AlertModal";
import {useModalState} from "../../hooks/use-form-state";
import {useRouter} from "next/router";
import TextInput from "../../components/formComponents/textInput";
import DateTimePicker from "../../components/formComponents/dateTimePicker";
import NumberInput from "../../components/formComponents/numberInput";
import SimpleForm from "../../components/simpleForm/simpleForm";
import {
    getReservations,
    createReservation,
    deleteReservation,
    servedReservation,
    disableServedReservation
} from "../../service/api/reservationsApi";
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import dayjs from "dayjs";
import GetCommentChip from "../../utils/getCommentChip";
import getHumanDate from "../../utils/getHumanDate";
import {SwitchInput} from "../../components/formComponents/switchInput";

const useEvents = (page: number, rowsPerPage: number, reservations: Array<any>) => {
    return useMemo(
        () => {
            return applyPagination(reservations, page, rowsPerPage);
        },
        [page, rowsPerPage, reservations]
    );
};

const useEventsIds = (reservations: Array<TableRow>) => {
    return useMemo(
        () => {
            return reservations.map((reservation) => reservation.id);
        },
        [reservations]
    );
};


type EventType = {
    target: {
        value: number
    }
}

type ReservationsProps = {
    profileUser: SystemUser,
    reservations: Array<ResponseReservation>
}

const Reservations = ({reservations}: ReservationsProps) => {

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const reservationsPage = useEvents(page, rowsPerPage, reservations);
    const reservationsIds = useEventsIds(reservationsPage);
    const reservationsSelection = useSelection(reservationsIds);

    const [alert, setAlert] = useState({show: false, message: "", description: ""})
    const formState = useModalState()
    const [deleteDisable, setDeleteDisable] = useState(true)
    const router = useRouter();
    const [showAlert, setShowAlert] = useState(false)

    const rowConf = [
        {
            fieldName: 'date_reservation',
            click: true,
            clickHandle: formState.handleClickOpen,
            component: (record: any) => getHumanDate(record.reservation_date)
        },
        {fieldName: "served", component: (record: any) => <Checkbox disabled checked={record.served} color="success"/>},
        {
            fieldName: 'comments',
            component: (record: any) => <GetCommentChip comment={record.comment} adminComment={record.admin_comment} />
            },
        {fieldName: 'people_count'},
        {fieldName: 'phone_number'},
    ]

    const headConf = ["Date", "Served", "Comments", "People Count", "Phone"]

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

    const handleDisableServedReservation = async () => {
        await disableServedReservation(reservationsSelection.selected)
        reservationsSelection.handleDeselectAll()
        refreshPage()
    }

    const handleServedReservation = async () => {
        await servedReservation(reservationsSelection.selected)
        reservationsSelection.handleDeselectAll()
        refreshPage()
    }

    const deleteSelected = async () => {
        await deleteReservation(reservationsSelection.selected)
        reservationsSelection.handleDeselectAll()
        refreshPage()
    }

    const refreshPage = () => {
        router.replace(router.asPath);
    }

    useEffect(() => {
        if (reservationsSelection.selected.length) {
            setDeleteDisable(false)
        } else {setDeleteDisable(true)}
    }, [reservationsSelection.selected])

    const defaultFormState = {
        id: "",
        date_reservation: dayjs(),
        people_count: 0,
        phone_number: "",
        email: "",
        comment: "",
        admin_comment: "",
        served: false
    }

    const handleSubmitForm = async (formData: any) => {
        await createReservation(formData)
        refreshPage()
    }

    return (
        <>
            <div className={styles.events}>
                <CustomTable
                    count={reservations.length}
                    items={reservationsPage}
                    onDeselectAll={reservationsSelection.handleDeselectAll}
                    onDeselectOne={reservationsSelection.handleDeselectOne}
                    onPageChange={handlePageChange}
                    onRowsPerPageChange={handleRowsPerPageChange}
                    onSelectAll={reservationsSelection.handleSelectAll}
                    onSelectOne={reservationsSelection.handleSelectOne}
                    page={page}
                    rowsPerPage={rowsPerPage}
                    selected={reservationsSelection.selected}
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
                    <Fab color="success" aria-label="add" onClick={handleServedReservation} disabled={deleteDisable}>
                        <CheckBoxOutlinedIcon />
                    </Fab>
                    <Fab color="info" aria-label="add" onClick={handleDisableServedReservation} disabled={deleteDisable}>
                        <CancelOutlinedIcon />
                    </Fab>
                </Stack>
                <SimpleForm formState={formState} defaultState={defaultFormState} submit={handleSubmitForm} title="Reservation" >
                    <DateTimePicker name="date_reservation" label="Reservation date" />
                    <TextInput name="phone_number"
                               label="Phone Number"
                               required={"Need Phone Number"}
                            />
                    <NumberInput name="people_count"
                                 label="People count"
                    />
                    <TextInput name="email"
                               label="Email"
                    />
                    <TextInput name="comment"
                               label="Comment"
                               rows={2}
                    />
                    <TextInput name="admin_comment"
                               label="Admin Comment"
                               rows={4}
                    />
                    <SwitchInput name="served" label="Served" />
                </SimpleForm>
                <AlertDialog showDialog={showAlert} handleSubmit={deleteSelected} setShowDialog={setShowAlert} />
            </div>
        </>
    );
};

Reservations.getLayout = (page: ReactElement) => {
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
    const reservations = await getReservations(token)

    return  {
        props: {
            profileUser: user,
            reservations: reservations
        }
    }

}

export default Reservations;
