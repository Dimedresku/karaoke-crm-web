import {useState} from "react";

export const useModalState = () => {
    const [formData, setFormData] = useState({})
    const [open, setOpen] = useState(false)

    const handleClickOpen = (customer: any) => {
        setFormData(customer)
        setOpen(true);
    };

    const handleNewOpen = () => {
        setFormData({})
        setOpen(true)
    }

    const handleClose = (resetForm: Function) => {
        resetForm()
        setOpen(false);
        setFormData({})
    };

    return {
        handleClickOpen,
        handleClose,
        handleNewOpen,
        open,
        formData,
    };

}
