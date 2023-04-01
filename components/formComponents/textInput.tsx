import React, { ForwardedRef, useContext } from 'react';
import { Controller } from "react-hook-form";
import TextField from "@mui/material/TextField";
import { FormContext } from "../adminForm/adminForm";
import {For} from "@babel/types";

type TextInputProps = {
    name: string,
    control: any,
    label: string,
    required: boolean | string | undefined,
    error: ForwardedRef<any> | undefined
}

const TextInput = ({name, label, required = false, error}: TextInputProps) => {
    const {control, errors} = useContext(FormContext)
    const error = errors[name]

    return (
        <Controller name={name}
                    control={control}
                    rules={{required: required}}
                    render={({ field: { onChange, value }}) => {
                        return (
                            <TextField
                                error={!!error}
                                autoFocus
                                margin="dense"
                                id="phone"
                                label={error === undefined ? label : error?.message}
                                type="text"
                                fullWidth
                                variant="outlined"
                                value={value}
                                onChange={onChange}
                            />
                        )
                    }
                    }
        />
    );
};

export default TextInput;
