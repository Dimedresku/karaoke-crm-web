import React from 'react';
import {
    Box,
    Card,
    Checkbox,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TablePagination,
    TableRow,
} from '@mui/material';
import {Scrollbar} from "../Scrollbar";

export type TableRowAddress = {
    city: string,
    country: string,
    state?: string,
    street: string

}

export type TableRow = {
    id: string,
    address: TableRowAddress,
    avatar: string,
    createdAt: number,
    email: string,
    name: string,
    phone: string

}

type CustomTableProps = {
    count: number,
    items: Array<TableRow>,
    onDeselectAll: Function,
    onDeselectOne: Function,
    onPageChange: any,
    onRowsPerPageChange: any,
    onSelectAll: Function,
    onSelectOne: Function,
    page: number,
    rowsPerPage: number,
    selected: Array<string>,
    rowsConf: Array<any>,
    headConf: Array<any>
}

export const CustomTable = (props: CustomTableProps) => {
    const {
        count = 0,
        items = [],
        onDeselectAll,
        onDeselectOne,
        onPageChange = () => {},
        onRowsPerPageChange,
        onSelectAll,
        onSelectOne,
        page = 0,
        rowsPerPage = 0,
        selected = [],
        rowsConf = [],
        headConf = []
    } = props;

    const selectedSome = (selected.length > 0) && (selected.length < items.length);
    const selectedAll = (items.length > 0) && (selected.length === items.length);

    return (
        <>
        <Card
        sx={{
            borderRadius: 4,
            boxShadow: 4
        }}>
            <Scrollbar>
                <Box sx={{ minWidth: 800 }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell padding="checkbox">
                                    <Checkbox
                                        checked={selectedAll}
                                        indeterminate={selectedSome}
                                        onChange={(event) => {
                                            if (event.target.checked) {
                                                onSelectAll?.();
                                            } else {
                                                onDeselectAll?.();
                                            }
                                        }}
                                    />
                                </TableCell>
                                {headConf.map((cellName: string) => <TableCell key={cellName} >{cellName}</TableCell>)}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {items.map((record) => {
                                const isSelected = selected.includes(record.id);

                                return (
                                    <TableRow
                                        hover
                                        key={record.id}
                                        selected={isSelected}
                                    >
                                        <TableCell padding="checkbox">
                                            <Checkbox
                                                checked={isSelected}
                                                onChange={(event) => {
                                                    if (event.target.checked) {
                                                        onSelectOne?.(record.id);
                                                    } else {
                                                        onDeselectOne?.(record.id);
                                                    }
                                                }}
                                            />
                                        </TableCell>
                                        {rowsConf.map((conf, idx) => {
                                            let cellResult = 'test'
                                            if (conf.handleFunc) {
                                                cellResult = conf.handleFunc(record)
                                            } else if (conf.component) {
                                                cellResult = conf.component(record)
                                            } else if (conf.fieldName) {
                                                // @ts-ignore
                                                cellResult = record[conf.fieldName]
                                            }
                                            if (conf.click) {
                                                return (
                                                    <TableCell key={`${record.id}-${idx}`}
                                                               onClick={() => conf.clickHandle(record)}
                                                               sx={{cursor: "pointer",
                                                                   textDecoration: "underline",
                                                                   "&:hover": {
                                                                        color: "blue"
                                                                   }
                                                               }}
                                                    >{cellResult}</TableCell>)
                                            } else {
                                                return (<TableCell key={`${record.id}-${idx}`}>{cellResult}</TableCell>)
                                            }
                                        })}
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </Box>
            </Scrollbar>
            <TablePagination
                component="div"
                count={count}
                onPageChange={onPageChange}
                onRowsPerPageChange={onRowsPerPageChange}
                page={page}
                rowsPerPage={rowsPerPage}
                rowsPerPageOptions={[5, 10, 25]}
            />
        </Card>
        </>
    );
}
