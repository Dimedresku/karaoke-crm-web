import React, {useEffect} from 'react';
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import styles from "./actionForm.module.scss"
import { useForm } from "react-hook-form";
import TextInput from "../formComponents/textInput";

type ActionFormProps = {
    formState: any
}

const ActionForm = ({formState}: ActionFormProps) => {
    const { handleSubmit, reset, control } = useForm();

    const defaultValue = {
        name: '',
        email: '',
        phone: ''
    }

    useEffect(() => {
        let initData = formState.formData
        reset({...defaultValue,...initData})
    }, [formState])

    const submit = (data: any) => console.log(data)

    return (
            <Dialog open={formState.open}
                    onClose={() => formState.handleClose(reset)}
                    className={styles.actionForm}
                    PaperProps={{
                        sx: {
                            borderRadius: 5,
                            padding: 2
                        }
                    }}
            >
                <DialogTitle>Subscribe</DialogTitle>
                <DialogContent>
                    <form onSubmit={handleSubmit(submit)}>
                        <TextInput name="name" control={control} label="Name"/>
                        <TextInput name="email" control={control} label="Email"/>
                        <TextInput name="phone" control={control} label="Phone"/>
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => formState.handleClose(reset)}>Cancel</Button>
                    <Button onClick={handleSubmit(submit)}>Subscribe</Button></DialogActions>
            </Dialog>
    )
}

export default ActionForm;
