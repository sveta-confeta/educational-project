import React, {useState} from 'react';
import {Checkbox, TextField} from '@mui/material';
import s from './../../../common/modal/Modal.module.css'
import {useNavigate} from 'react-router-dom';
import {useAppDispatch} from "../../../bll/state";
import {addPackTC} from "../../../bll/packsReducer";
import {BasicModal} from "../../../common/modal/Modal";

type AddNewPackType = {
    isOpenModal: boolean
    setIsOpenModal: (value: boolean) => void
}

export const AddNewPackModal: React.FC<AddNewPackType> = React.memo(
    ({isOpenModal, setIsOpenModal}) => {
        const [newPackName, setNewPackName] = useState('')
        const [isPrivate, setPrivate] = React.useState(false)
        const dispatch = useAppDispatch()
        // const navigate = useNavigate()

        const addNewCardPack = () => {
            dispatch(addPackTC(newPackName, 'ggg', isPrivate))
            setNewPackName('')
            // navigate('/packs')
        }

        return (
            <BasicModal
                 isOpenModal={isOpenModal}
                 setIsOpenModal={setIsOpenModal}
                title={'Add new Pack'}
                buttonName={'Save'}
                handleOperation={addNewCardPack}
            >

                <TextField className={s.addItemField}
                           label="Title"
                           variant="standard"
                           color="secondary"
                           value={newPackName}
                           onChange={(e) => setNewPackName(e.currentTarget.value)}/>

                <div className={s.private}>
                    <Checkbox checked={isPrivate}
                              onChange={(e) => setPrivate(e.currentTarget.checked)}
                              color="secondary"/>
                    Private pack
                </div>

            </BasicModal>
        );
    });
