import React, {ChangeEvent, SetStateAction, useCallback, useEffect, useMemo, useState} from 'react';
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
    Skeleton
} from '@mui/material';
import {Scrollbar} from "../Scrollbar";
import Toolbar from "@mui/material/Toolbar";
import {alpha} from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import {JSXElement} from "@babel/types";
import {useSelection} from "../../hooks/use-selection";
import {subscribe, unsubscribe, publishRefreshTable } from "../../utils/tableEvent";


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

interface EnhancedTableToolbarProps {
    numSelected: number,
    TableAction: JSXElement | undefined,
    selected: Array<any>,
    tableName: string,
}

function EnhancedTableToolbar(props: EnhancedTableToolbarProps) {
    const { numSelected, TableAction, selected, tableName } = props

    return (
        <Toolbar
            sx={{
                pl: { sm: 2 },
                pr: { xs: 1, sm: 1 },
                ...(numSelected > 0 && {
                    bgcolor: (theme) =>
                        alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
                }),
            }}
        >
            {numSelected > 0 ? (
                <Typography
                    sx={{ flex: '1 1 100%' }}
                    color="inherit"
                    variant="subtitle1"
                    component="div"
                >
                    {numSelected} selected
                </Typography>
            ) : (
                <Typography
                    sx={{ flex: '1 1 100%' }}
                    variant="h6"
                    id="tableTitle"
                    component="div"
                >
                    {tableName}
                </Typography>
            )}
            {numSelected > 0 && (<TableAction selected={selected} />)}
        </Toolbar>
    );
}

const useRecordIds = (records: Array<TableRow>) => {
    return useMemo(
        () => {
            if (records) {
                return records.map((record) => record.id);
            } else {
                return records
            }
        },
        [records]
    );
};

type CustomTableProps = {
    rowsConf: Array<any>,
    headConf?: Array<any>,
    TableCustomHead?: JSXElement | undefined
    TableAction?: JSXElement | undefined,
    fetchData: Function,
    setError: Function,
    tableName: string
}

export const CustomTable = (props: CustomTableProps) => {
    const {
        rowsConf = [],
        headConf = [],
        TableCustomHead,
        TableAction,
        fetchData,
        setError,
        tableName
    } = props;

    const [page, setPage] = useState(0);
    const [load, setLoad] = useState(true)
    const [count, setCount] = useState(0)
    const [order, setOrder] = useState('')
    const [data, setData] = useState<any>([])
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const recordsIds = useRecordIds(data);
    const recordsSelection = useSelection(recordsIds);

    const selectedSome = (recordsSelection.selected.length > 0) && (recordsSelection.selected.length < data.length);
    const selectedAll = (data.length > 0) && (recordsSelection.selected.length === data.length);

    const handlePageChange = useCallback(
        (event: MouseEvent, value: number) => {
            setPage(value);
        },
        []
    );

    const handleRowsPerPageChange = useCallback(
        (event: ChangeEvent) => {
            setRowsPerPage(event.target.value);
        },
        []
    );

    const refreshTable = async () => {
        console.log('refresh')
        recordsSelection.handleDeselectAll()
        const dataRows = await fetchData(rowsPerPage, page + 1, order)
        setData(dataRows.result as SetStateAction<any>)
        setCount(dataRows.count)
        setLoad(false)
    }

    useEffect(() => {
        refreshTable().catch((e) => {
                setError({show: true, message: e.message})
            })

    }, [page, rowsPerPage, order])

    useEffect(() => {
        subscribe(refreshTable)
        return () => unsubscribe(refreshTable)
    }, [page, rowsPerPage, order])

    const getTableHead = () => {
        if (TableCustomHead !== undefined) {
            // @ts-ignore
            return <TableCustomHead checked={selectedAll}
                                    indeterminate={selectedSome}
                                    recordsSelection={recordsSelection}
                                    order={order}
                                    setOrder={setOrder}
            />
        } else {
            return (
                <TableHead>
                    <TableRow>
                        <TableCell padding="checkbox">
                            <Checkbox
                                checked={selectedAll}
                                indeterminate={selectedSome}
                                onChange={(event) => {
                                    if (event.target.checked) {
                                        recordsSelection.handleSelectAll();
                                    } else {
                                        recordsSelection.handleDeselectAll();
                                    }
                                }}
                            />
                        </TableCell>
                        {headConf.map((cellName: string) => <TableCell key={cellName} >{cellName}</TableCell>)}
                    </TableRow>
                </TableHead>
            )
        }
    }

    if (load) {
        return <Card sx={{borderRadius: 4, boxShadow: 4, padding: 2}}>
            <Skeleton sx={{padding: 2, height: 80}}/>
            <Skeleton sx={{padding: 2}} />
            <Skeleton sx={{padding: 2}} />
            <Skeleton sx={{padding: 2}} />
        </Card>
    }

    return (
        <>
        <Card
        sx={{
            borderRadius: 4,
            boxShadow: 4
        }}>
            <>
            <Scrollbar>
                <Box sx={{ minWidth: 800 }}>
                    <EnhancedTableToolbar numSelected={recordsSelection.selected.length}
                                          TableAction={TableAction}
                                          selected={recordsSelection.selected}
                                          tableName={tableName}
                                          refreshTable={refreshTable}
                    />
                    <Table>
                        {getTableHead()}
                        <TableBody>
                            {data.map((record: any) => {
                                const isSelected = recordsSelection.selected.includes(record.id as never);

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
                                                        recordsSelection.handleSelectOne?.(record.id as never);
                                                    } else {
                                                        recordsSelection.handleDeselectOne?.(record.id);
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
                onPageChange={(event, page) => handlePageChange(event, page)}
                onRowsPerPageChange={(event) => handleRowsPerPageChange(event)}
                page={page}
                rowsPerPage={rowsPerPage}
                rowsPerPageOptions={[5, 10, 25]}
            />
            </>
        </Card>
        </>
    );
}
