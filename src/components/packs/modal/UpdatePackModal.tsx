import React, {useEffect, useState} from 'react';
import s from './../../../common/modal/Modal.module.css'
import {TextField} from '@mui/material';
import {useAppDispatch} from "../../../bll/state";
import {updatePackTC} from "../../../bll/packsReducer";
import {BasicModal} from "../../../common/modal/Modal";

type UpdatePackModalType = {
    isOpenModal: boolean
    setIsOpenModal: (value: boolean) => void
    packID: string
    packName:string
}


export const UpdatePackModal: React.FC<UpdatePackModalType> =({
                                                                              packID,
                                                                              packName,
                                                                              isOpenModal,
                                                                              setIsOpenModal,
                                                                          }) => {
    const [newPackName, setNewPackName] = useState<string >(packName)
    const dispatch = useAppDispatch()

        //чтобы в inpute подтягивалось старое название перед тем какм редактировать
    useEffect(() => {
        setNewPackName(packName)
    }, [packName])

    const updateCardPack = () => {
       dispatch(updatePackTC(packID,newPackName))
    }

    return (
        <BasicModal title={'Update Pack'}
                    buttonName={'Save'}
                    handleOperation={updateCardPack}
                    isOpenModal={isOpenModal}
                    setIsOpenModal={setIsOpenModal}
        >
            <TextField className={s.addItemField}
                       label="Title"
                       variant="standard"
                       color="secondary"
                       value={newPackName}
                       onChange={(e) => setNewPackName(e.currentTarget.value)}/>
            <div>Do you really want to change <b>{packName}</b>?</div>
        </BasicModal>
    );
};
