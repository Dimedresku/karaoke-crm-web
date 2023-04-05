import React, { useContext } from 'react';
import { Controller } from "react-hook-form";
import {Switch, FormGroup, FormControlLabel } from "@mui/material";
import FormContext from "../../context/formConatext";

type SwitchInputProps = {
    name: string,
    label: string
}

const SwitchInput = ({name, label}: SwitchInputProps) => {
    // @ts-ignore
    const {control} = useContext(FormContext)

    return (
        <Controller name={name}
                    control={control}
                    render={({ field: { onChange, value }}) => {
                        return (
                            <FormGroup>
                                <FormControlLabel
                                    control={<Switch checked={value}
                                                     onChange={onChange}
                                                     inputProps={{ 'aria-label': 'controlled' }}/>}
                                    label={label} />
                            </FormGroup>
                        )
                    }
             }
        />
    );
};

export {SwitchInput};
