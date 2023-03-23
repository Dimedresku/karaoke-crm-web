import React, {ReactElement, useCallback, useMemo, useState} from 'react';
import styles from "../../styles/admin/Events.module.scss"
import DashboardLayout from "../../layouts/dashboard/layout";
import DataTable from "../../components/datatable/DataTable";
import {GridColDef, GridValueGetterParams} from "@mui/x-data-grid";
import {CustomersTable, TableRow} from "../../components/customtable/customtable";
import {useSelection} from "../../hooks/use-selection";
import {applyPagination} from "../../utils/apply-paginations";
import {AuthJWTService} from "../../service/auth/authJWTService";
import {NextApiRequest, NextApiResponse} from "next";

const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70, editable: false },
    { field: 'firstName', headerName: 'First name', width: 130, editable: false },
    { field: 'lastName', headerName: 'Last name', width: 130, editable: false },
    {
        field: 'age',
        headerName: 'Age',
        type: 'number',
        width: 90,
        editable: false
    },
    {
        field: 'fullName',
        headerName: 'Full name',
        description: 'This column has a value getter and is not sortable.',
        sortable: false,
        width: 160,
        editable: false,
        valueGetter: (params: GridValueGetterParams) =>
            `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    },
];

const headConf = ["ID", "First name", "Last name", "Age", "Full name"]

const rowConf = [
    {fieldName: "id"},
    {fieldName: "firstName"},
    {fieldName: "lastName"},
    {fieldName: "age"},
    {handleFunc: (row: any) => {return `${row.firstName} ${row.lastName}`}}]

const rows = [
    { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
    { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
    { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
    { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
    { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
    { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
    { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
    { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
    { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];


const useCustomers = (page: number, rowsPerPage: number) => {
    return useMemo(
        () => {
            return applyPagination(rows, page, rowsPerPage);
        },
        [page, rowsPerPage]
    );
};

const useCustomerIds = (customers: Array<TableRow>) => {
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

const Events = () => {

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const customers = useCustomers(page, rowsPerPage);
    const customersIds = useCustomerIds(customers);
    const customersSelection = useSelection(customersIds);


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
        <div className={styles.events}>
            <CustomersTable
                count={rows.length}
                items={customers}
                onDeselectAll={customersSelection.handleDeselectAll}
                onDeselectOne={customersSelection.handleDeselectOne}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleRowsPerPageChange}
                onSelectAll={customersSelection.handleSelectAll}
                onSelectOne={customersSelection.handleSelectOne}
                page={page}
                rowsPerPage={rowsPerPage}
                selected={customersSelection.selected}
                rowsConf={rowConf}
                headConf={headConf}
            />

        </div>
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
    const redirectObject = {
        redirect: {
            destination: "/admin/login",
            permanent: false,
        }
    }

    const isAuth = await authService.isAuthUser(req, res)
    if (!isAuth) {
        return redirectObject
    }

    return  {
        props: {}
    }

}

export default Events;
