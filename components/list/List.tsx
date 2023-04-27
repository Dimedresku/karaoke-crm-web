import React, {useEffect, useState} from 'react';
import styles from "./List.module.scss"
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {getReservations} from "../../service/api/reservationsApi";
import getHumanDate from "../../utils/getHumanDate";


const List = () => {

    const [rows, setRows] = useState([])

    useEffect(() => {
        getReservations(5, 1, "").then((result) => {
            setRows(result.result)
        })

    }, [])

    return (
        <TableContainer component={Paper} className={styles.table}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell className={styles.tableCell}>Date</TableCell>
                        <TableCell className={styles.tableCell}>People Count</TableCell>
                        <TableCell className={styles.tableCell}>Phone Number</TableCell>
                        <TableCell className={styles.tableCell}>Status</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow key={row.id}>
                            <TableCell className={styles.tableCell}>{getHumanDate(row.date_reservation)}</TableCell>
                            <TableCell className={styles.tableCell}>{row.people_count}</TableCell>
                            <TableCell className={styles.tableCell}>{row.phone_number}</TableCell>
                            <TableCell className={styles.tableCell}>
                                {row.served ? <span className={`${styles.status} ${styles.Approved}`}>Served</span> :
                                    <span className={`${styles.status} ${styles.Pending}`}>Pending</span>}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default List;
