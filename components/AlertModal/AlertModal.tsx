import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

type AlertDialogProps = {
    showDialog: boolean,
    handleSubmit: Function,
    setShowDialog: Function
}

export default function AlertDialog({showDialog, setShowDialog, handleSubmit}: AlertDialogProps) {

    const handleAgree = () => {
        handleSubmit();
        setShowDialog(false)
    }

    const handleClose = () => {
        setShowDialog(false);
    };

    return (
        <>
            <Dialog
                open={showDialog}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Delete selected users?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} sx={{color: "red"}}>No</Button>
                    <Button onClick={handleAgree} sx={{color: "green"}} autoFocus>
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
