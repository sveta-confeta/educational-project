import React from 'react';
import {useAppDispatch} from "../../../bll/state";
import {deletePackTC} from "../../../bll/packsReducer";
import {BasicModal} from "../../../common/modal/Modal";

type DeletePackModalType = {
    isOpenModal: boolean
    setIsOpenModal: (value: boolean) => void
    packID:string
    packName:string
}

export const DeletePackModal: React.FC<DeletePackModalType> = React.memo(({
                                                                              packName,
                                                                              packID,
                                                                              isOpenModal,
                                                                              setIsOpenModal,
                                                                          }) => {
    const dispatch = useAppDispatch()

    const deleteCardPack = () => {
        dispatch(deletePackTC(packID))

    }

    return (
        <BasicModal title={'Delete Pack'}
                    buttonName={'Delete'}
                    handleOperation={deleteCardPack}
                    isOpenModal={isOpenModal}
                    setIsOpenModal={setIsOpenModal}
        >
            <div>Do you really want to remove <b>{packName}</b>?</div>
            <div>All cards will be excluded from this course.</div>
        </BasicModal>
    );
});
