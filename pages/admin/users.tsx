import React, {ReactElement, useState} from 'react';
import {CustomTable} from "../../components/customtable/customtable";
import DashboardLayout from "../../layouts/dashboard/layout";
import {useModalState} from "../../hooks/use-form-state";
import Stack from '@mui/material/Stack';
import AddIcon from '@mui/icons-material/Add'
import Fab from "@mui/material/Fab";
import AlertDialog from "../../components/AlertModal/AlertModal";
import {NextApiRequest, NextApiResponse} from "next";
import {AuthJWTService} from "../../service/auth/authJWTService";
import styles from "../../styles/admin/Users.module.scss"
import {getUsers, deleteUsers, createUserOrUpdate } from "../../service/api/usersApi";
// @ts-ignore
import Cookies from 'cookies'
import {Snackbar, Alert, Avatar, Tooltip, IconButton} from "@mui/material";
import {BaseUser} from "../../openaip";
import AdminForm from "../../components/adminForm/adminForm";
import TextInput from "../../components/formComponents/textInput";
import {publishRefreshTable} from "../../utils/tableEvent";
import DeleteIcon from "@mui/icons-material/Delete";

type UsersTableToolBarProps = {
    selected: Array<number>,
}

const UsersTableToolBar = ({selected}: UsersTableToolBarProps) => {

    const [showAlert, setShowAlert] = useState(false)

    const handleDelete = async () => {
        await deleteUsers(selected)
        publishRefreshTable()
    }

    return (
        <>
            <Stack direction="row" spacing={1}>
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


const Users = () => {

    const [alert, setAlert] = useState({show: false, message: "", description: ""})
    const formState = useModalState()

    const rowConf = [
        {fieldName: 'name', click: true, clickHandle: formState.handleClickOpen},
        {fieldName: 'username'},
        {fieldName: 'avatar', component: (record: BaseUser) => <Avatar src={`${process.env.NEXT_PUBLIC_BACK_HOST}${record.avatar}`} />},
    ]

    const headConf = ["Name", "Username", "Avatar"]

    const handleSubmitForm = async (formData: any) => {
        await createUserOrUpdate(formData)
        publishRefreshTable()
    }

    const defaultFormValue = {
        id: '',
        name: '',
        username: '',
        avatar: '',
        password: '',
        confirmPassword: ''
    }

    return (
        <div className={styles.customTable}>
            <CustomTable
                rowsConf={rowConf}
                headConf={headConf}
                // @ts-ignore
                TableAction={UsersTableToolBar}
                fetchData={getUsers}
                setError={setAlert}
                tableName="Users"
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
            <AdminForm formState={formState}
                       defaultState={defaultFormValue}
                       submit={handleSubmitForm}
                       title="Пользователь"
                       avatar={true}
            >
                <TextInput name="name"
                           label="Name"
                />
                <TextInput name="username"
                           required={'Need username'}
                           label="Username"/>
                {!formState.formData?.id &&
                <>
                    <TextInput name="password"
                               required={"Incorrect password"}
                               label="Password"/>
                    <TextInput name="confirmPassword"
                               required={"Incorrect password"}
                               label="Confirm Password"/>
                </>
                }
            </AdminForm>
            <Snackbar
                open={alert.show}
                autoHideDuration={6000}
                onClose={() => setAlert({show: false, message: "", description: ""})}
            >
                <Alert onClose={() => setAlert({show: false, message: "", description: ""})}
                       severity="error" sx={{ width: '100%' }}>
                    <>
                    <h3>{alert.message}</h3>
                    <p>{alert.description}</p>
                    </>
                </Alert>
            </Snackbar>
        </div>
    );
};

Users.getLayout = (page: ReactElement) => {
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

    return  {
        props: {
            profileUser: user
        }
    }

}

export default Users;
