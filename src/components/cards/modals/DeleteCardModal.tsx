import React from 'react';
import {useAppDispatch} from "../../../bll/state";
import {BasicModal} from "../../../common/modal/Modal";
import {deleteCardTC} from "../../../bll/cardsReducer";


type DeleteCardType = {
    cardName: string
    cardId: string
    packId: string
    isOpenModal: boolean
    setIsOpenModal: (value: boolean) => void
}

export const DeleteCardModal: React.FC<DeleteCardType> = React.memo(({
                                                                         cardId,
                                                                         packId,
                                                                         cardName,
                                                                         isOpenModal,
                                                                         setIsOpenModal
                                                                     }) => {
    const dispatch = useAppDispatch()

    const deleteCard = () => {
        dispatch(deleteCardTC(cardId, packId))
    }

    return (
        <BasicModal
            title={'Delete Card'}
            buttonName={'Delete'}
            handleOperation={deleteCard}
            isOpenModal={isOpenModal}
            setIsOpenModal={setIsOpenModal}
        >
            <div>Do you really want to remove card with question <b>{cardName}</b>?</div>
            <div>The card will be removed.</div>
        </BasicModal>
    );
});
