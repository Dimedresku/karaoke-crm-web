import React, { useEffect, useState } from 'react';
import { Stack } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import { useForm } from "react-hook-form";
import TextInput from "../formComponents/textInput";
import {createUser, updateUser} from "../../service/api/usersApi";
import { FilePond, registerPlugin } from 'react-filepond';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import FilePondPluginImageCrop from "filepond-plugin-image-crop";
import FilePondPluginImageResize from "filepond-plugin-image-resize";
import FilePondPluginImageTransform from "filepond-plugin-image-transform";
import FilePondPluginImageEdit from "filepond-plugin-image-edit";
import styles from "./userForm.module.scss"


registerPlugin(
    FilePondPluginFileValidateType,
    FilePondPluginImageExifOrientation,
    FilePondPluginImagePreview,
    FilePondPluginImageCrop,
    FilePondPluginImageResize,
    FilePondPluginImageTransform,
    FilePondPluginImageEdit
);

type UserFormProps = {
    formState: any,
    refresh: Function
}

const UserForm = ({formState, refresh}: UserFormProps) => {
    const { handleSubmit, reset, control } = useForm();
    const [files, setFiles] = useState([]);

    const defaultValue = {
        id: '',
        name: '',
        username: '',
        avatar: ''
    }

    useEffect(() => {
        let initData = formState.formData
        reset({...defaultValue,...initData})
    }, [formState])

    const submit = async (data: any) => {
        if (data.id) {
            await updateUser(data.id, data)
        } else {
            await createUser(data)
        }
        formState.handleClose(reset)
        refresh()
    }

    // @ts-ignore
    // @ts-ignore
    // @ts-ignore
    return (
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
            <DialogTitle>Пользователь</DialogTitle>
            <DialogContent>
                <Stack direction="row">
                    <form onSubmit={handleSubmit(submit)} className={styles.modalForm}>
                        <TextInput name="name" control={control} label="Name"/>
                        <TextInput name="username" control={control} label="Username"/>
                        <TextInput name="password" control={control} label="Password"/>
                        <TextInput name="confirmPassword" control={control} label="Confirm Password"/>
                    </form>
                    <div className={styles.dragAndDropWrapper}>
                        <FilePond
                            files={files}
                            //@ts-ignore
                            onupdatefiles={setFiles}
                            allowMultiple={false}
                            maxFiles={1}
                            name="files"
                            labelIdle={`Drag & Drop your picture or <span class="filepond--label-action">Browse</span>`}
                            imagePreviewHeight={250}
                            imageCropAspectRatio='1:1'
                            imageResizeTargetWidth={300}
                            imageResizeTargetHeight={300}
                            stylePanelLayout='compact circle'
                            styleLoadIndicatorPosition='center bottom'
                            styleProgressIndicatorPosition='right bottom'
                            styleButtonRemoveItemPosition='left bottom'
                            styleButtonProcessItemPosition='right bottom'
                        />
                    </div>
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => formState.handleClose(reset)}>Cancel</Button>
                <Button onClick={handleSubmit(submit)}>Save</Button></DialogActions>
        </Dialog>
    )
}

export default UserForm;
