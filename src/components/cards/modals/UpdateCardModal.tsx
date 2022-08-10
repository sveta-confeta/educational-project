import React, {useState} from 'react';

import {TextField} from '@mui/material';
import s from './../../../common/modal/Modal.module.css';
import {useAppDispatch} from "../../../bll/state";
import {updateCardTC} from "../../../bll/cardsReducer";
import {BasicModal} from "../../../common/modal/Modal";

type UpdateCardType = {
    isOpenModal: boolean
    setIsOpenModal: (value: boolean) => void
    packId: string
    cardId: string
    cardName: string
    cardAnswer: string
}

export const UpdateCardModal: React.FC<UpdateCardType> = React.memo(({
                                                                         packId,
                                                                         cardId,
                                                                         cardName,
                                                                         cardAnswer,
                                                                         isOpenModal,
                                                                         setIsOpenModal
                                                                     }) => {

    const [newCardQuestion, setNewCardQuestion] = useState( cardName)
    const [newCardAnswer, setNewCardAnswer] = useState(cardAnswer)

    const dispatch = useAppDispatch()

    const card = {_id:cardId,question:cardName,answer:cardAnswer}

    const updateCard = () => {
        if (packId) {
            dispatch(updateCardTC(card, packId))
        }
    }

    return (
        <BasicModal isOpenModal={isOpenModal}
                    setIsOpenModal={setIsOpenModal}
                    title={'Update Card'}
                    buttonName={'Save'}
                    handleOperation={updateCard}
        >
            <TextField
                className={s.addItemField}
                label="Question"
                variant="standard"
                color="secondary"
                value={newCardQuestion}
                onChange={(e) => setNewCardQuestion(e.currentTarget.value)}/>
            <TextField
                className={s.addItemField}
                label="Answer"
                variant="standard"
                color="secondary"
                value={newCardAnswer}
                onChange={(e) => setNewCardAnswer(e.currentTarget.value)}/>
            <div>Do you really want to change <b>{cardName}</b> and <b>{cardAnswer}</b>?</div>
        </BasicModal>
    );
});
