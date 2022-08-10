import React, {useState} from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import {Button, Rating, TableCell} from '@mui/material';
import TableBody from '@mui/material/TableBody';
import s from './Cards.module.css';
import TableContainer from '@mui/material/TableContainer';
import {useAppDispatch, useAppSelector} from "../../bll/state";
import DeleteIcon from '@mui/icons-material/Delete';
import {DeleteCardModal} from "./modals/DeleteCardModal";
import {CardType} from "../../api/cardsAPI";
import BorderColorIcon from '@mui/icons-material/BorderColor';
import {UpdateCardModal} from "./modals/UpdateCardModal";

export const CardsTable = () => {
    const dispatch = useAppDispatch()
    const userId = useAppSelector(state => state.profile._id)
    const cards = useAppSelector(state => state.cards.cards)

    // const deleteCard=(cardId:string,packsId:string)=>{  кода был хардкод без модалок
    //     dispatch(deleteCardTC(cardId, packsId));
    // }

    const [cardId, setcardId] = useState('');
    const [cardName, setCardName] = useState('');
    const [cardAnswer, setCardAnswer] = useState('');
    const [packId, setPackId] = useState('');
    const [isOpenModalCardDelete, setIsOpenModalCardDelete] = useState(false)
    const [isOpenModalCardUpdate, setIsOpenModalCardUpdate] = useState(false)

     const formatDate = (date: Date | string | number) => {
        return new Date(date).toLocaleDateString('ru-RU') + ' ' + new Date(date).toLocaleTimeString()
    }

    const openModalDeleteCard = (cardId: string, packId: string, cardName: string) => {
        setIsOpenModalCardDelete(true)
        setPackId(packId)
        setcardId(cardId)
        setCardName(cardName)

    }

    const openModalUpdateCard = (cardId:string, cardName:string, cardAnswer:string, packId:string) => {
        setIsOpenModalCardUpdate(true)
        setPackId(packId)
        setcardId(cardId)
        setCardName(cardName)
        setCardAnswer(cardAnswer)


    }

    return (
        <>
            <TableContainer component={Paper}>
                <Table sx={{minWidth: 400}} aria-label="simple  table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Question</TableCell>
                            <TableCell align="right">Answer</TableCell>
                            <TableCell align="right">Grade</TableCell>
                            <TableCell align="right">Updated</TableCell>
                            <TableCell align="right">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {cards?.map((card) => (
                            <TableRow
                                key={card._id}
                                sx={{'&:last-child td, &:last-child th': {border: 0}}}
                            >
                                <TableCell component="th" scope="row">
                                    {card.question}
                                </TableCell>
                                <TableCell align="right">{card.answer}</TableCell>
                                <TableCell align="right"><Rating name="read-only" value={card.grade} readOnly/>
                                </TableCell>
                                <TableCell align="right">{formatDate(card.updated)}</TableCell>
                                <TableCell className={s.buttonBlock}>
                                    <Button
                                        // onClick={()=>deleteCard(card._id,card.cardsPack_id)}
                                        onClick={() => openModalDeleteCard(card._id, card.cardsPack_id, card.question)}
                                        disabled={userId !== card.user_id}
                                        color="error"
                                        size="small"
                                        startIcon={<DeleteIcon/>}>
                                        Delete

                                    </Button>
                                    <Button
                                        onClick={() => openModalUpdateCard(card._id, card.question, card.answer, card.cardsPack_id)}
                                        disabled={userId !== card.user_id}
                                        color="secondary" size="small"
                                        startIcon={<BorderColorIcon/>}>
                                        Edit
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <DeleteCardModal
                isOpenModal={isOpenModalCardDelete}
                setIsOpenModal={setIsOpenModalCardDelete}
                cardId={cardId}
                packId={packId}
                cardName={cardName}
            />
            <UpdateCardModal
                isOpenModal={isOpenModalCardUpdate}
                setIsOpenModal={setIsOpenModalCardUpdate}
                packId={packId}
                cardId={cardId}
                cardName={cardName}
                cardAnswer={cardAnswer}

            />
        </>
    );
};