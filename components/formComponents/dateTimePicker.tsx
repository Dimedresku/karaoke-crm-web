import React, { useContext } from 'react';
import { Controller } from "react-hook-form";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import {MobileDateTimePicker } from '@mui/x-date-pickers/MobileDateTimePicker';
import FormContext from "../../context/formConatext";
import dayjs from "dayjs";

type DateTimePickerProps = {
    name: string,
    label: string,
    required?: boolean | string | undefined,
}

const DateTimePicker = ({name, label, required = false}: DateTimePickerProps) => {
    // @ts-ignore
    const {control} = useContext(FormContext)

    return (
        <Controller name={name}
                    control={control}
                    rules={{required: required}}
                    render={({ field: { onChange, value }}) => {
                        return (
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <MobileDateTimePicker  orientation="landscape"
                                                       value={dayjs(value)}
                                                       onChange={onChange}
                                                       sx={{width: "100%"}}
                                                       label={label}
                                />
                            </LocalizationProvider>
                        )}
                    }
        />
    );
};

export default DateTimePicker;
