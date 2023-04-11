import React, {ReactElement, useEffect, useRef, useState} from 'react';
import styles from "../../styles/admin/Events.module.scss"
import DashboardLayout from "../../layouts/dashboard/layout";
import {CustomTable} from "../../components/customtable/customtable";
import {AuthJWTService} from "../../service/auth/authJWTService";
import {NextApiRequest, NextApiResponse} from "next";
// @ts-ignore
import Cookies from 'cookies'
import {
    Box,
    Checkbox,
    Stack,
    Fab,
    TableRow,
    TableCell,
    TableHead,
    IconButton,
    Tooltip,
    TableSortLabel
} from "@mui/material";
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
import DeleteIcon from "@mui/icons-material/Delete";
import { publishRefreshTable } from "../../utils/tableEvent";


type ReservationTableToolBarProps = {
    selected: Array<number>,
}

const ReservationTableToolBar = ({selected}: ReservationTableToolBarProps) => {

    const [showAlert, setShowAlert] = useState(false)

    const handleDelete = async () => {
        await deleteReservation(selected)
        publishRefreshTable()
    }

    const handleEnable = async () => {
        await servedReservation(selected)
        publishRefreshTable()
    }

    const handleDisable = async () => {
        await disableServedReservation(selected)
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
                     message={"Delete selected reservations?"}
        />
        </>
)
}

type ReservationsTableHeadProps = {
    checked: boolean,
    indeterminate: boolean,
    recordsSelection: any,
    order: string,
    setOrder: Function
}

const ReservationsTableHead = ({checked, indeterminate, recordsSelection, order, setOrder}: ReservationsTableHeadProps) => {
    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox">
                    <Checkbox
                        checked={checked}
                        indeterminate={indeterminate}
                        onChange={(event) => {
                            if (event.target.checked) {
                                recordsSelection.handleSelectAll();
                            } else {
                                recordsSelection.handleDeselectAll();
                            }
                        }}
                    />
                </TableCell>
                <TableCell>
                    <TableSortLabel
                        active={["date_asc", "date_desc"].includes(order)}
                        direction={order == "date_asc" ? "asc" : "desc"}
                        onClick={() => setOrder((prev) => {
                            if (prev === "date_asc") {
                                return "date_desc"
                            } else {
                                return 'date_asc'
                            }
                        })}
                    >
                        Date
                    </TableSortLabel>
                </TableCell>
                <TableCell>Served</TableCell>
                <TableCell>Comments</TableCell>
                <TableCell>
                    <TableSortLabel
                        active={["people_desc", "people_asc"].includes(order)}
                        direction={order == "people_asc" ? "asc" : "desc"}
                        onClick={() => setOrder((prev) => {
                            if (prev === "people_asc") {
                                return "people_desc"
                            } else {
                                return "people_asc"
                            }
                        })}
                    >
                        People Count
                    </TableSortLabel>
                </TableCell>
                <TableCell>Phone</TableCell>
            </TableRow>
        </TableHead>
    )
}

const Reservations = () => {

    const [alert, setAlert] = useState({show: false, message: "", description: ""})
    const formState = useModalState()

    const rowConf = [
        {
            fieldName: 'date_reservation',
            click: true,
            clickHandle: formState.handleClickOpen,
            component: (record: any) => getHumanDate(record.date_reservation)
        },
        {fieldName: "served", component: (record: any) => <Checkbox disabled checked={record.served} color="success"/>},
        {
            fieldName: 'comments',
            component: (record: any) => <GetCommentChip comment={record.comment} adminComment={record.admin_comment} />
            },
        {fieldName: 'people_count'},
        {fieldName: 'phone_number'},
    ]

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
        publishRefreshTable()
    }

    return (
        <>
            <div className={styles.events}>
                <CustomTable
                    rowsConf={rowConf}
                    // @ts-ignore
                    TableCustomHead={ReservationsTableHead}
                    // @ts-ignore
                    TableAction={ReservationTableToolBar}
                    fetchData={getReservations}
                    setError={setAlert}
                    tableName="Reservations"
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

    return  {
        props: {
            profileUser: user,
        }
    }

}

export default Reservations;
