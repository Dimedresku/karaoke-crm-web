import React, {useRef, useState, useEffect, ReactElement} from 'react';
import Dialog from "@mui/material/Dialog";
import {Box, CircularProgress} from "@mui/material";
import {Cropper, CropperRef, StencilComponent} from "react-advanced-cropper";
import styles from "../adminForm/adminForm.module.scss";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";

type ImageCropperProps = {
    openCrop: boolean,
    setCrop: Function,
    filePondRef: React.RefObject<any>,
    cropImage: string,
    setCropImage: Function,
    setChange: Function,
    stencilComponent: StencilComponent
}

const ImageCropper = (
    {
        openCrop,
        setCrop,
        filePondRef,
        cropImage,
        setCropImage,
        setChange,
        stencilComponent
    }: ImageCropperProps) => {

    const [progress, setProgress] = useState(false)
    const cropperRef = useRef<CropperRef>(null);

    useEffect(() => {

    })

    const cropClose = () => {
        setCropImage('')
        setCrop((prev: boolean) => !prev)
    }
    const cropSubmit = async () => {
        setProgress(true)
        if (cropperRef.current) {
            const prevImage = filePondRef.current?.getFile()
            // @ts-ignore
            const blob = await new Promise(resolve => cropperRef.current?.getCanvas()?.toBlob(resolve, prevImage.file.type)) as Blob
            const newImage = new File([blob], prevImage.file.name, {type: prevImage.file.type})
            await filePondRef.current?.addFile(newImage)
            setChange(true)
        }
        setCrop((prev: boolean) => !prev)
        setProgress(false)
    }

    return (
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
                stencilComponent={stencilComponent}
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
    );
};

export default ImageCropper;
