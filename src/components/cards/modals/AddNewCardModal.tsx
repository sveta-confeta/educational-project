import React from 'react';
import {TextField} from '@mui/material';
import s from './../../../common/modal/Modal.module.css'
import {useParams} from 'react-router-dom';
import {useAppDispatch} from "../../../bll/state";
import {addCardTC} from "../../../bll/cardsReducer";
import {BasicModal} from "../../../common/modal/Modal";

type AddNewCardType = {
    isOpenModal: boolean
    setIsOpenModal: (value: boolean) => void
}

export const AddNewCardModal: React.FC<AddNewCardType> = React.memo(({isOpenModal, setIsOpenModal}) => {
    const [newCardQuestion, setNewCardQuestion] = React.useState('')
    const [newCardAnswer, setNewCardAnswer] = React.useState('')
    const dispatch = useAppDispatch()
    const {packId} = useParams<'packId'>();

    const addNewCard = () => {
        if (packId) {
            dispatch(addCardTC({cardsPack_id: packId, question: newCardQuestion, answer: newCardAnswer}))
            setNewCardQuestion('')
            setNewCardAnswer('')
        }
    }

    return (
        <BasicModal isOpenModal={isOpenModal}
                    setIsOpenModal={setIsOpenModal}
                    title={'Add new Card'}
                    buttonName={'Save'}
                    handleOperation={addNewCard}>

            <>
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
            </>
        </BasicModal>
    );
});
