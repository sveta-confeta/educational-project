import React, {ChangeEvent, useEffect, useState} from 'react';
import {CardType} from '../../api/cardsAPI';
import {Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup} from '@mui/material';
import s from './LearnPage.module.css'
import {NavLink, useNavigate, useParams} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from "../../bll/state";
import {getCardsTC, setCardGradeTC} from "../../bll/cardsReducer";

const grades = [
    {value: 1, label: 'I did not know'},
    {value: 2, label: 'I forgot'},
    {value: 3, label: 'I thought for a long time'},
    {value: 4, label: 'I got confused'},
    {value: 5, label: 'I knew the answer'}];

const getCard = (cards: CardType[]) => {
    const sum = cards.reduce((acc, card) => acc + (6 - card.grade) * (6 - card.grade), 0);
    const rand = Math.random() * sum;
    const res = cards.reduce((acc: { sum: number, id: number }, card, i) => {
            const newSum = acc.sum + (6 - card.grade) * (6 - card.grade);
            return {sum: newSum, id: newSum < rand ? i : acc.id}
        }
        , {sum: 0, id: -1});
    return cards[res.id + 1];
}

export const LearnPage = () => {
    const navigate = useNavigate()

    const {packId} = useParams()
    const packName = useAppSelector(state => state.packs.cardPacks.find(el => el._id === packId)?.name)

    const [value, setValue] = React.useState('');
    const [isChecked, setIsChecked] = useState<boolean>(false);

    const [first, setFirst] = useState<boolean>(true);
    const [grade, setGrade] = useState<number>(0);
    const {cards} = useAppSelector(state => state.cards)

    const [card, setCard] = useState<CardType>({
        _id: '',
        cardsPack_id: '',
        answer: '',
        question: '',
        grade: 0,
        shots: 0,
        type: '',
        rating: 0,
        more_id: '',
        created: '',
        updated: '',
    });

    const dispatch = useAppDispatch();
    //back

    const returnToProfile = () => {
        navigate('/packs')
    }
    const onNext = () => {
        setIsChecked(false);

        if (cards.length > 0) {
            dispatch(setCardGradeTC({grade: grade, card_id: card._id}))
            setCard(getCard(cards));
        }
    }

    const handleChangeGrade = (e: ChangeEvent<HTMLInputElement>) => {
        const gradeNumbers = [1, 2, 3, 4, 5];
        const value = Number(e.currentTarget.value);

        if (gradeNumbers.includes(value)) {
            setGrade(value);
        }
    }

    useEffect(() => {

        if (first) {
            packId && dispatch(getCardsTC(packId));
            setFirst(false);
        }

        if (cards.length > 0) setCard(getCard(cards));

    }, [dispatch, packId, cards, first]);

    return (
        <div className={s.wrapper}>
            <div className={s.comeBack}>
                <span className={s.span} onClick={returnToProfile}>Back to PacksList</span>
                <div className={s.title}>
                    <h1>Learn {packName}</h1>
                </div>
            </div>
            <div className={s.form}>

                <div><span className={s.bold}>Question: </span>{card.question}</div>
                <p>Количество попыток ответов на вопрос:</p>

                {isChecked
                    ? <>
                        <div><span className={s.bold}>Answer: </span>{card.answer}</div>

                        <FormControl>
                            <FormLabel color="secondary">Rate yourself</FormLabel>
                            <RadioGroup
                                value={value}
                                onChange={(e) => {
                                    setValue(e.currentTarget.value)
                                }}
                            >
                                {grades.map(({value, label}, i) => (
                                    <FormControlLabel
                                        key={'grade-' + i}
                                        value={value}
                                        control={<Radio value={value}
                                                        onChange={handleChangeGrade}
                                                        color="secondary"/>}
                                        label={label}/>
                                ))}
                            </RadioGroup>
                        </FormControl>
                        <div className={s.buttonsBlock}>
                            <Button
                                onClick={onNext}
                                color="secondary"
                                variant="contained">Next Question
                            </Button>
                        </div>
                    </>
                    : <>
                        <div className={s.buttonsBlock}>
                            <NavLink className={s.cancelButton} to={'/packs'}>
                                <Button
                                    color="secondary"
                                    variant="contained">Cancel</Button>
                            </NavLink>
                            <Button
                                onClick={() => setIsChecked(true)}
                                color="secondary"
                                variant="contained">Show
                                answer</Button>
                        </div>
                    </>
                }
            </div>
        </div>
    );
};
