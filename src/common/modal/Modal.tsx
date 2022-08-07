import * as React from 'react';
import {ReactNode} from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import styles from './Modal.module.css';
import {Button, IconButton} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #9c27b0',
    borderRadius: '8px',
    boxShadow: 24,
    p: 4,
};

type ModalPropsType = {
    operationTitle: string
    buttonName: string
    handleOperation: () => void
    isOpenModal: boolean
    children: ReactNode
    setIsOpenModal: (value: boolean) => void
}

export const BasicModal: React.FC<ModalPropsType> = React.memo(({
                                                                    operationTitle,
                                                                    buttonName,
                                                                    handleOperation,
                                                                    isOpenModal,
                                                                    setIsOpenModal,
                                                                    children
                                                                }) => {
    const handleClose = () => {
        setIsOpenModal(false);
    }

    const onClickHandler = () => {
        handleOperation()
        setIsOpenModal(false)
    }

    return (
        <Modal
            open={isOpenModal}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <div className={styles.title}>
                    {operationTitle}
                    <IconButton onClick={handleClose}>
                        <CloseIcon/>
                    </IconButton>
                </div>
                {children}
                <div className={styles.buttonsBlock}>
                    <Button onClick={handleClose} color="secondary" variant="contained">Cancel</Button>
                    <Button onClick={onClickHandler} color="secondary" variant="contained">{buttonName}</Button>
                </div>
            </Box>
        </Modal>
    );
});
