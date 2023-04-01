import React, { useEffect, useState, useRef } from 'react';
import {Box, CircularProgress, Stack} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import { useForm } from "react-hook-form";
import TextInput from "../formComponents/textInput";
import {createUser, updateUser, uploadAvatar} from "../../service/api/usersApi";
import { FilePond, registerPlugin } from 'react-filepond';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import FilePondPluginImageCrop from "filepond-plugin-image-crop";
import FilePondPluginImageResize from "filepond-plugin-image-resize";
import FilePondPluginImageTransform from "filepond-plugin-image-transform";
import FilePondPluginImageEdit from "filepond-plugin-image-edit";
import styles from "./eventForm.module.scss"
import { Cropper, CropperRef, Coordinates } from 'react-advanced-cropper';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import {CircleStencil} from "../stencil/CircleStencil";


registerPlugin(
    FilePondPluginFileValidateType,
    FilePondPluginImageExifOrientation,
    FilePondPluginImagePreview,
    FilePondPluginImageCrop,
    FilePondPluginImageResize,
    FilePondPluginImageTransform,
    FilePondPluginImageEdit
);

type EventFormProps = {
    formState: any,
    refresh: Function,
    handleErrors: Function
}

const EventForm = ({formState, refresh, handleErrors}: EventFormProps) => {
    const { handleSubmit, reset, control, formState: {errors}, setError } = useForm();
    const [image, setImage] = useState([]);
    const [openCrop, setCrop] = useState(false)
    const [cropImage, setCropImage] = useState('')
    const [progress, setProgress] = useState(false)
    const cropperRef = useRef<CropperRef>(null);
    const filePond = useRef(null)

    const defaultValue = {
        id: '',
        name: '',
        description: '',
        published: false,
        image: '',
    }

    useEffect(() => {
        let initData = formState.formData
        reset({...defaultValue,...initData})
    }, [formState])

    const submit = async (data: any) => {
        try {
            if (data.id) {
                const response = await updateUser(data.id, data)
                if (image.length > 0) {
                    await uploadAvatar(data.id, image[0].file)
                }
            } else {
                if (data.password !== data.confirmPassword) {
                    setError("password", {type: "custom", message: "Check password"})
                    setError("confirmPassword", {type: "custom", message: "Check password"})
                    return
                }
                const response = await createUser(data)
                if (image.length > 0) {
                    const user_id = response.user.id
                    await uploadAvatar(user_id, image[0].file)
                }
            }
            formState.handleClose(reset)
            refresh()
            setImage([])
        } catch (e) {
            handleErrors({show: true, message: e.message, description: e.description})
        }
    }

    const editor = {
        open: (file, instructions) => {
            if (file !== undefined) {
                setCropImage(URL.createObjectURL(file))
            }
            setCrop(true)
        },
        onconfirm: (output) => {},
        oncancel: () => {},
        onclose: () => {},
    };

    const cropClose = () => {
        setCropImage('')
        setCrop((prev) => !prev)
    }
    const cropSubmit = async () => {
        setProgress(true)
        if (cropperRef.current) {
            const prevImage = filePond.current?.getFile()
            const blob = await new Promise(resolve => cropperRef.current?.getCanvas()?.toBlob(resolve, prevImage.file.type)) as Blob
            const newImage = new File([blob], prevImage.file.name, {type: prevImage.file.type})
            await filePond.current?.addFile(newImage)
        }
        setCrop((prev) => !prev)
        setProgress(false)
    }

    const handleClose = () => {
        setImage([])
        formState.handleClose(reset)
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
                <DialogTitle>Event</DialogTitle>
                <DialogContent>
                    <Stack direction="row">
                        <form onSubmit={handleSubmit(submit)} className={styles.modalForm}>
                            <TextInput name="name"
                                       control={control}
                                       error={errors.name}
                                       label="Name"/>
                            <TextInput name="description"
                                       error={errors.username}
                                       control={control}
                                       label="Description"/>
                        </form>
                        <div className={styles.dragAndDropWrapper}>
                            <FilePond
                                ref={filePond}
                                files={image}
                                //@ts-ignore
                                onupdatefiles={setImage}
                                allowMultiple={false}
                                maxFiles={1}
                                name="files"
                                labelIdle={`Drag & Drop your picture or <span class="filepond--label-action">Browse</span>`}
                                imagePreviewHeight={500}
                                imageCropAspectRatio='1:1'
                                imageResizeTargetWidth={300}
                                imageResizeTargetHeight={300}
                                stylePanelLayout='compact'
                                styleLoadIndicatorPosition='center bottom'
                                styleProgressIndicatorPosition='right bottom'
                                styleButtonRemoveItemPosition='left bottom'
                                styleButtonProcessItemPosition='right bottom'
                                imageEditEditor={editor}
                                allowImageEdit={true}
                            />
                        </div>
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSubmit(submit)}>Save</Button></DialogActions>
            </Dialog>
            <Dialog open={openCrop}
                    sx={{
                        backdropFilter: "blur(5px)"
                    }}
                    PaperProps={{
                        sx: {
                            height: "fit-content",
                            overflowY: "visible"
                        }
                    }}>
                {progress && <Box sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    zIndex: 10,
                    backdropFilter: "blur(10px)",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                }}><CircularProgress  size={60}/></Box>}
                <Cropper
                    ref={cropperRef}
                    src={cropImage}
                    className={styles.cropper}
                    stencilComponent={CircleStencil}
                />
                <div className={styles.buttons}>
                    <button onClick={cropSubmit} className={styles.success}>
                        <CheckCircleOutlineIcon sx={{
                            width: 60,
                            height: 60,
                            color: "green"
                        }}/></button>
                    <button onClick={cropClose} className={styles.reject}>
                        <CancelOutlinedIcon
                            sx={{
                                width: 45,
                                height: 45,
                                color: "firebrick"
                            }}
                        />
                    </button>
                </div>
            </Dialog>
        </>
    );
}

export default EventForm;