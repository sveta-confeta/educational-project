import React, {useEffect, useState} from 'react';

import styles from '../../../common/c7-Modal/Modal.module.css';
import {TextField} from '@mui/material';
import {PackType} from '../../../api/packsAPI';
import {useAppDispatch} from "../../../bll/state";
import {updatePackTC} from "../../../bll/packsReducer";
import {BasicModal} from "../../../common/modal/Modal";

type UpdatePackModalType = {
    isOpenModal: boolean
    setIsOpenModal: (value: boolean) => void
    pack: PackType | null
}


export const UpdatePackModal: React.FC<UpdatePackModalType> = React.memo(({
                                                                              pack,
                                                                              isOpenModal,
                                                                              setIsOpenModal,
                                                                          }) => {
    const [newPackName, setNewPackName] = useState<string>(pack ? pack.name : '')
    const dispatch = useAppDispatch()

    useEffect(() => {
        pack && setNewPackName(pack.name)
    }, [pack])

    const updateCardPack = () => {
        pack && dispatch(updatePackTC(pack._id, newPackName))
        setNewPackName(newPackName)
        setIsOpenModal(false)
    }

    return (
        <BasicModal title={'Update Pack'}
                    buttonName={'Save'}
                    handleOperation={updateCardPack}
                    isOpenModal={isOpenModal}
                    setIsOpenModal={setIsOpenModal}
        >
            <TextField className={styles.addItemField}
                       label="Title"
                       variant="standard"
                       color="secondary"
                       value={newPackName}
                       onChange={(e) => setNewPackName(e.currentTarget.value)}/>
            <div>Do you really want to change <b>{pack!.name}</b>?</div>
        </BasicModal>
    );
});
