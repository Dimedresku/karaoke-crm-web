import React, {useEffect, useState, useRef, SetStateAction} from 'react';
import {Stack} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import {SubmitHandler, useForm} from "react-hook-form";
import styles from "./adminForm.module.scss"
import {Coordinates, RectangleStencil} from 'react-advanced-cropper';
import {CircleStencil} from "../stencil/CircleStencil";
import DragAndDrop from "../dragAndDrop/dragAndDrop";
import ImageCropper from "../imageCropper/imageCropper";
import FormContext from "../../context/formConatext";


type AdminFormProps = {
    formState: any,
    defaultState: object,
    submit: SubmitHandler<any>,
    avatar?: boolean,
    title: string
}

const AdminForm = (
    {
        formState,
        defaultState,
        submit,
        title,
        avatar,
        children,
    }: React.PropsWithChildren<AdminFormProps>) => {
    const { handleSubmit, reset, control, formState: {errors}} = useForm();
    const [image, setImage] = useState([]);
    const [cropImage, setCropImage] = useState('')
    const [openCrop, setCrop] = useState(false)
    const [changeImage, setChange] = useState(false)
    const filePond = useRef(null)

    useEffect(() => {
        let initData = formState.formData
        reset({...defaultState,...initData})
        if (initData.avatar) {
            const avatar = `${process.env.NEXT_PUBLIC_BACK_HOST}${initData.avatar}`
            setImage(avatar as SetStateAction<any>)
        } else if (initData.image) {
            const image = `${process.env.NEXT_PUBLIC_BACK_HOST}${initData.image}`
            setImage(image as SetStateAction<any>)
        }
    }, [formState])

    const editor = {
        open: (file: File, instructions: any) => {
            if (file !== undefined) {
                setCropImage(URL.createObjectURL(file))
            }
            setCrop(true)
        },
    };

    const handleClose = () => {
        setImage([])
        formState.handleClose(reset)
    }
    const submitForm = (data: any) => {
        // @ts-ignore
        const submitImage = image[0]?.file
        data.image = submitImage
        data.changeImage = changeImage
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
                <DialogContent>
                    <Stack direction="row" sx={{justifyContent: "space-around"}}>
                        <form onSubmit={handleSubmit(submit)} className={styles.modalForm}>
                            <FormContext.Provider value={{control: control, errors: errors}} >
                                {children}
                            </FormContext.Provider>
                        </form>
                        <DragAndDrop image={image} setImage={setImage} editor={editor} filePondRef={filePond} avatar={avatar}/>
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSubmit(submitForm)}>Save</Button></DialogActions>
            </Dialog>
            <ImageCropper openCrop={openCrop}
                          setCrop={setCrop}
                          filePondRef={filePond}
                          cropImage={cropImage}
                          setCropImage={setCropImage}
                          setChange={setChange}
                          stencilComponent={avatar ? CircleStencil : RectangleStencil}
            />
        </>
    );
}

export default AdminForm;

export {FormContext}
