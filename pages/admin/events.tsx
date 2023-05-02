import React, {ReactElement, useState} from 'react';
import styles from "../../styles/admin/Events.module.scss"
import DashboardLayout from "../../layouts/dashboard/layout";
import {CustomTable} from "../../components/customtable/customtable";
import {AuthJWTService} from "../../service/auth/authJWTService";
import {NextApiRequest, NextApiResponse} from "next";
// @ts-ignore
import Cookies from 'cookies'
import {getEvents, publishEvents, unPublishEvents} from "../../service/api/eventsApi";
import Stack from "@mui/material/Stack";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import AlertDialog from "../../components/AlertModal/AlertModal";
import {useModalState} from "../../hooks/use-form-state";
import Image from "next/image";
import {Checkbox, IconButton, Tooltip} from "@mui/material";
import AdminForm from "../../components/adminForm/adminForm";
import TextInput from "../../components/formComponents/textInput";
import {SwitchInput} from "../../components/formComponents/switchInput";
import {createEvent, deleteEvents} from "../../service/api/eventsApi";
import {getImageOrText} from "../../utils/getImageOrText";
import {publishRefreshTable} from "../../utils/tableEvent";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckBoxOutlinedIcon from "@mui/icons-material/CheckBoxOutlined";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";


type EventsTableToolBarProps = {
    selected: Array<number>,
}

const EventsTableToolBar = ({selected}: EventsTableToolBarProps) => {

    const [showAlert, setShowAlert] = useState(false)

    const handleDelete = async () => {
        await deleteEvents(selected)
        publishRefreshTable()
    }

    const handleEnable = async () => {
        await publishEvents(selected)
        publishRefreshTable()
    }

    const handleDisable = async () => {
        await unPublishEvents(selected)
        publishRefreshTable()
    }


    return (
        <>
            <Stack direction="row" spacing={1}>
                <Tooltip title="Select">
                    <IconButton sx={{'&:hover': {color: "green"}}} onClick={handleEnable}>
                        <CheckBoxOutlinedIcon />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Disable">
                    <IconButton sx={{'&:hover': {color: "dodgerBlue"}}} onClick={handleDisable}>
                        <CancelOutlinedIcon />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Delete">
                    <IconButton sx={{'&:hover': {color: "#DC143C"}}} onClick={() => setShowAlert(true)} >
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
            </Stack>
            <AlertDialog showDialog={showAlert}
                         handleSubmit={handleDelete}
                         setShowDialog={setShowAlert}
                         message={"Delete selected users?"}
            />
        </>
    )
}


const Events = () => {

    const formState = useModalState()
    const [alert, setAlert] = useState(null)

    const rowConf = [
        {fieldName: 'name', click: true, clickHandle: formState.handleClickOpen},
        {fieldName: 'published', component: (record: any) => <Checkbox disabled checked={record.published} color="success"/>},
        {fieldName: 'image', component: (record: any) => getImageOrText(record)},
    ]

    const headConf = ["Name", "Published", "Image"]

    const defaultFormState = {
        id: "",
        name: "",
        description: "",
        published: true,
        image: "",
    }

    const handleSubmitForm = async (formData: any) => {
        await createEvent(formData)
        publishRefreshTable()
    }

    return (
        <>
        <div className={styles.events}>
            <CustomTable
                rowsConf={rowConf}
                headConf={headConf}
                // @ts-ignore
                TableAction={EventsTableToolBar}
                fetchData={getEvents}
                tableName="Events"
                setError={setAlert}
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

    const redirectObject = {
        redirect: {
            destination: "/admin/login",
            permanent: false,
        }
    }

    const token = await authService.getAuthToken(cookies)
    if (!token) {
        return redirectObject
    }

    const user = await authService.getUser(token)

    return  {
        props: {
            profileUser: user,
        }
    }

}

export default Events;
