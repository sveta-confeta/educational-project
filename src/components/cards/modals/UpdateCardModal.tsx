import React, {useState} from 'react';
import {BasicModal} from '../../../common/c7-Modal/Modal';
import {useAppDispatch} from '../../../bll/store';
import {updateCardTC} from '../../../bll/reducers/cards-reducer';
import {TextField} from '@mui/material';
import styles from '../../../common/c7-Modal/Modal.module.css';

type UpdateCardType = {
    isOpenModal: boolean
    setIsOpenModal: (value: boolean) => void
    cardQuestion: string
    cardAnswer: string
    cardId: string
    packId: string
}

export const UpdateCardModal: React.FC<UpdateCardType> = React.memo(({
                                                                         cardId,
                                                                         packId,
                                                                         cardQuestion,
                                                                         cardAnswer,
                                                                         isOpenModal,
                                                                         setIsOpenModal
                                                                     }) => {

    const [newCardQuestion, setNewCardQuestion] = useState(cardQuestion)
    const [newCardAnswer, setNewCardAnswer] = useState(cardAnswer)

    const dispatch = useAppDispatch()

    const updateCard = () => {
        if (packId) {
            dispatch(updateCardTC({_id: cardId, question: newCardQuestion, answer: newCardAnswer}, packId))
        }
    }

    return (
        <BasicModal isOpenModal={isOpenModal}
                    setIsOpenModal={setIsOpenModal}
                    operationTitle={'Update Card'}
                    buttonName={'Save'}
                    handleOperation={updateCard}
        >
            <TextField
                className={styles.addItemField}
                label="Question"
                variant="standard"
                color="secondary"
                value={newCardQuestion}
                onChange={(e) => setNewCardQuestion(e.currentTarget.value)}/>
            <TextField
                className={styles.addItemField}
                label="Answer"
                variant="standard"
                color="secondary"
                value={newCardAnswer}
                onChange={(e) => setNewCardAnswer(e.currentTarget.value)}/>
            <div>Do you really want to change <b>{cardQuestion}</b> and <b>{cardAnswer}</b>?</div>
        </BasicModal>
    );
});
