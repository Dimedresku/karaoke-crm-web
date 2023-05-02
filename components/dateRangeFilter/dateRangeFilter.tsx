import React from 'react';
import Popover from '@mui/material/Popover';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import Button from '@mui/material/Button';

type DateRangeFilterProps = {
    open: boolean,
    anchorEl: HTMLElement | null,
    handleClose: Function,
    id: string | undefined,
    state: object,
    changeState: Function
}

const DateRangeFilter = (
    {
        open,
        anchorEl,
        id,
        handleClose,
        state,
        changeState
    }: DateRangeFilterProps) => {

    const clearFilter = () => {
        changeState({dateTo: null, dateFrom: null})
    }

    return (
        <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            // @ts-ignore
            onClose={handleClose}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
            sx={{maxHeight: "70%"}}
        >
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <List
                        sx={{ width: '100%', maxWidth: 300, bgcolor: 'background.paper', textAlign: "center" }}
                        component="nav"
                        aria-labelledby="nested-list-subheader"
                        subheader={
                            <ListSubheader component="div" id="nested-list-subheader">
                                Date filter
                            </ListSubheader>
                        }
                    >
                        <Button variant="text" onClick={clearFilter}>Clear filter</Button>
                        <DatePicker
                            label="Date from"
                            value={state.dateFrom}
                            onChange={(newValue) => changeState({...state, dateFrom: newValue})}
                            sx={{margin: 2}}
                            format="DD/MM/YYYY"
                        />
                        <DatePicker
                            label="Date to"
                            value={state.dateTo}
                            onChange={(newValue) => changeState({...state, dateTo: newValue})}
                            sx={{margin: 2}}
                            format="DD/MM/YYYY"
                        />
                    </List>
                </LocalizationProvider>
        </Popover>
    );
};

export default DateRangeFilter;
