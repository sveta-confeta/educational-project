import React from 'react';
import {TextField} from '@mui/material';
import s from './../../../common/modal/Modal.module.css'
import {useAppDispatch} from "../../../bll/state";
import {addCardTC} from "../../../bll/cardsReducer";
import {BasicModal} from "../../../common/modal/Modal";

type AddNewCardType = {
    isOpenModal: boolean
    setIsOpenModal: (value: boolean) => void
    packId:string | undefined
}

export const AddNewCardModal: React.FC<AddNewCardType> = React.memo(({isOpenModal, setIsOpenModal,packId}) => {
    const [newCardQuestion, setNewCardQuestion] = React.useState('') //для вопросов
    const [newCardAnswer, setNewCardAnswer] = React.useState('')   //для ответов
    const dispatch = useAppDispatch()


    const addNewCard = () => {
        if (packId) {
            dispatch(addCardTC( packId,newCardQuestion, newCardAnswer))
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
