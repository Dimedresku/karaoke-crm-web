import React, { useContext } from 'react';
import { Controller } from "react-hook-form";
import FormContext from "../../context/formConatext";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';

type SelectInputProps = {
    name: string,
    label: string,
    required?: boolean | string | undefined,
    selectValues: object
}

const SelectInput = ({name, label, selectValues, required = false}: SelectInputProps) => {
    // @ts-ignore
    const {control, errors} = useContext(FormContext)
    const error = errors[name]

    return (
        <Controller name={name}
                    control={control}
                    rules={{required: required}}
                    render={({ field: { onChange, value }}) => {
                        return (
                            <FormControl sx={{width: "100%", marginTop: 2, marginBottom: 2}}>
                                <InputLabel id="select-input-label">{label}</InputLabel>
                                <Select
                                    labelId="select-input-label"
                                    id="demo"
                                    value={value}
                                    label={label}
                                    onChange={onChange}
                                >
                                    {
                                        Object.entries(selectValues).map(selectValue =>
                                            <MenuItem key={selectValue[0]} value={selectValue[0]}>{selectValue[1]}</MenuItem>)}
                                </Select>
                            </FormControl>
                        )
                    }
                    }
        />
    );
};

export default SelectInput;
