import React, { useContext } from 'react';
import { Controller } from "react-hook-form";
import TextField from "@mui/material/TextField";
import FormContext from "../../context/formConatext";

type TextInputProps = {
    name: string,
    label: string,
    required?: boolean | string | undefined,
    rows?: number | undefined
}

const TextInput = ({name, label, required = false, rows = 1}: TextInputProps) => {
    // @ts-ignore
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
                                rows={rows}
                                multiline={rows > 1 }
                            />
                        )
                    }
                    }
        />
    );
};

export default TextInput;
