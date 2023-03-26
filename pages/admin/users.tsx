import React, {ReactElement, useMemo, useState, useCallback, SyntheticEvent, ChangeEvent, useEffect} from 'react';
import { subDays, subHours } from 'date-fns';
import {CustomersTable, TableRow} from "../../components/customtable/customtable";
import DashboardLayout from "../../layouts/dashboard/layout";
import {applyPagination} from "../../utils/apply-paginations";
import {useSelection} from "../../hooks/use-selection";
import {useModalState} from "../../hooks/use-form-state";
import UserForm from "../../components/userForm/userForm";
import Stack from '@mui/material/Stack';
import AddIcon from '@mui/icons-material/Add'
import Fab from "@mui/material/Fab";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import AlertDialog from "../../components/AlertModal/AlertModal";
import {NextApiRequest, NextApiResponse} from "next";
import {AuthJWTService} from "../../service/auth/authJWTService";
import type { UserResponse } from '../../openaip/models/UserResponse';
import styles from "../../styles/admin/Users.module.scss"
import {getUsers} from "../../service/api/usersApi";
// @ts-ignore
import Cookies from 'cookies'
import { useRouter } from 'next/router';


const now = new Date();


const useUsers = (page: number, rowsPerPage: number, data: Array<any>) => {
    return useMemo(
        () => {
            data = data.sort((first, second) => first.id - second.id)
            return applyPagination(data, page, rowsPerPage);
        },
        [page, rowsPerPage, data]
    );
};

const useUserIds = (customers: Array<TableRow>) => {
    return useMemo(
        () => {
            return customers.map((customer) => customer.id);
        },
        [customers]
    );
};

type EventType = {
    target: {
        value: number
    }
}

type UsersProps = {
    arrayUsers: Array<UserResponse>
}


const Users = ({arrayUsers}: UsersProps) => {

    const [page, setPage] = useState(0);
    const [showAlert, setShowAlert] = useState(false)
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const users = useUsers(page, rowsPerPage, arrayUsers);
    const usersIds = useUserIds(users);
    const usersSelection = useSelection(usersIds);
    const formState = useModalState()
    const [deleteDisable, setDeleteDisable] = useState(true)
    const router = useRouter();

    const deleteSelected = () => {
        console.log(`Will be deleted`)
        console.log(usersSelection.selected)
    }

    const refreshPage = () => {
        router.replace(router.asPath);
    }

    useEffect(() => {
        if (usersSelection.selected.length) {
            setDeleteDisable(false)
        } else {setDeleteDisable(true)}
    }, [usersSelection.selected])

    const rowConf = [
        {fieldName: 'name', click: true, clickHandle: formState.handleClickOpen},
        {fieldName: 'username'},
        {fieldName: 'avatar'},
    ]

    const headConf = ["Name", "Username", "Avatar"]


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


    return (
        <div className={styles.customTable}>
            <CustomersTable
                count={arrayUsers.length}
                items={users}
                onDeselectAll={usersSelection.handleDeselectAll}
                onDeselectOne={usersSelection.handleDeselectOne}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleRowsPerPageChange}
                onSelectAll={usersSelection.handleSelectAll}
                onSelectOne={usersSelection.handleSelectOne}
                page={page}
                rowsPerPage={rowsPerPage}
                selected={usersSelection.selected}
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
            <UserForm formState={formState} refresh={refreshPage}/>
            <AlertDialog showDialog={showAlert} handleSubmit={deleteSelected} setShowDialog={setShowAlert} />
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

    const arrayUsers = await getUsers(token)

    return  {
        props: {
            arrayUsers: arrayUsers
        }
    }

}

export default Users;
