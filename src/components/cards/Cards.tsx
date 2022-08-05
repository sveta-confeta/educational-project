import React, {useEffect} from 'react';
import s from './Cards.module.css'
import {useNavigate, useParams} from 'react-router-dom';
import {CardsTable} from './CardsTable';
import {useAppDispatch, useAppSelector} from "../../bll/state";
import {getCardsTC} from "../../bll/cardsReducer";


export const Cards = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const userId = useAppSelector(state => state.profile._id)
    const cardsTotalCount = useAppSelector(state => state.cards.params.cardsTotalCount)
    const page = useAppSelector(state => state.cards.params.page)
    const pageCount = useAppSelector(state => state.cards.params.pageCount)
    const cardQuestion = useAppSelector(state => state.cards.params.cardQuestion)
    const cardAnswer = useAppSelector(state => state.cards.params.cardAnswer)
    const packUserId = useAppSelector(state => state.cards.packUserId)

    const {packId} = useParams<'packId'>();

  //  const [searchCardValue, setSearchCardValue] = React.useState('Question');
    // const handleChangeSearchCardValue = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    //     if (searchCardValue === 'Question') {
    //     //     dispatch(searchQuestionAC(e.currentTarget.value))
    //     // } else {
    //     //     dispatch(searchAnswerAC(e.currentTarget.value))
    //     // }
    // };

    // const clearValue = (value: string) => {
    //     if (searchCardValue === 'Question') dispatch(searchQuestionAC(''))
    //     else dispatch(searchAnswerAC(''))
    //     setSearchCardValue(value)
    // }

    // const debouncedValue = useDebounce((searchCardValue === 'Question') ? cardQuestion : cardAnswer, 1000)
    //
    // const handleChangePage = (
    //     event: React.MouseEvent<HTMLButtonElement> | null,
    //     newPage: number,
    // ) => {
    //     dispatch(setCardsPageAC(newPage + 1))
    // };

    // const handleChangeRowsPerPage = (
    //     event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    // ) => {
    //     dispatch(setCardsPageCountAC(Number(event.target.value)))
    //     dispatch(setCardsPageAC(1))
    // };

    useEffect(() => {
        if (packId) {
            dispatch(getCardsTC(packId))
        }
    },
        [packId]
        // [dispatch, page, pageCount, debouncedValue]
    );

    // const returnToPacks = () => {
    //     dispatch(searchQuestionAC(''))
    //     dispatch(searchAnswerAC(''))
    //     navigate('/packs')
    // }

    return (
        <div>
            <div className={s.tableWrapper}>
                <div className={s.container}>
                    <h1 className={s.title}>Cards name</h1>
                    {/*<SearchAppBar radioValue={searchCardValue}*/}
                    {/*              onChangeRadio={clearValue}*/}
                    {/*              disabled={packUserId !== userId}*/}
                    {/*              title={'Add new card'}*/}
                    {/*              goBack={returnToPacks}*/}
                    {/*              value={searchCardValue === 'Question' ? cardQuestion : cardAnswer}*/}
                    {/*              onChange={handleChangeSearchCardValue}*/}
                    {/*/>*/}
                    <CardsTable/>
                    {/*<div className={styles.paginatorBlock}>*/}
                    {/*    <Pagination*/}
                    {/*        count={cardsTotalCount}*/}
                    {/*        page={page - 1}*/}
                    {/*        onPageChange={handleChangePage}*/}
                    {/*        rowsPerPage={pageCount}*/}
                    {/*        onRowsPerPageChange={handleChangeRowsPerPage}/>*/}
                    {/*</div>*/}
                </div>
            </div>
        </div>
    )
};


