import React from 'react';
import { Controller } from "react-hook-form";
import TextField from "@mui/material/TextField";

type TextInputProps = {
    name: string,
    control: any,
    label: string,
}

const TextInput = ({name, control, label}: TextInputProps) => {
    return (
        <Controller name={name}
                    control={control}
                    render={({ field: { onChange, value }}) => {
                        return (
                            <TextField
                                autoFocus
                                margin="dense"
                                id="phone"
                                label={label}
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
