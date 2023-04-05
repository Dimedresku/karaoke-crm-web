import React, {useEffect} from 'react';
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import {SubmitHandler, useForm} from "react-hook-form";
import styles from "./simpleForm.module.scss"
import FormContext from "../../context/formConatext";


type SimpleForm = {
    formState: any,
    defaultState: object,
    submit: SubmitHandler<any>,
    title: string
}

const SimpleForm = (
    {
        formState,
        defaultState,
        submit,
        title,
        children,
    }: React.PropsWithChildren<SimpleForm>) => {
    const { handleSubmit, reset, control, formState: {errors}} = useForm();

    useEffect(() => {
        let initData = formState.formData
        reset({...defaultState,...initData})
    }, [formState])

    const handleClose = () => {
        formState.handleClose(reset)
    }
    const submitForm = (data: any) => {
        // @ts-ignore
        submit(data)
        handleClose()
    }

    // @ts-ignore
    return (
        <>
            <Dialog open={formState.open}

                    onClose={() => formState.handleClose(reset)}
                    className={styles.actionForm}
                    sx={{
                        backdropFilter: "blur(5px)"
                    }}
                    PaperProps={{
                        sx: {
                            borderRadius: 5,
                            padding: 2,
                            maxWidth: 800
                        }
                    }}
            >
                <DialogTitle>{title}</DialogTitle>
                <DialogContent style={{paddingTop: "20px"}}>
                    <form onSubmit={handleSubmit(submit)} className={styles.modalForm} >
                        <FormContext.Provider value={{control: control, errors: errors}} >
                            {children}
                        </FormContext.Provider>
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSubmit(submitForm)}>Save</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default SimpleForm;
