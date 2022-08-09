import React, {useEffect, useState} from 'react';
import s from './Cards.module.css'
import {useNavigate, useParams} from 'react-router-dom';
import {CardsTable} from './CardsTable';
import {useAppDispatch, useAppSelector} from "../../bll/state";
import {addCardTC, getCardsTC, searchQuestionAC, setCardsPageAC, setCardsPageCountAC} from "../../bll/cardsReducer";
import {
    Button,
    FormControl,
    MenuItem,
    Pagination,
    PaginationItem,
    Select,
    SelectChangeEvent,
    Stack
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import {Search} from "../../common/searchField/SearchField";
import {AddNewCardModal} from "./modals/AddNewCardModal";


export const Cards = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const {packId} = useParams();
    const userId = useAppSelector(state => state.profile._id)
    const packUserId = useAppSelector(state => state.cards.packUserId)
    const packName = useAppSelector(state => state.packs.cardPacks.find(el => el._id === packId)?.name)
    const cardsTotalCount = useAppSelector(state => state.cards.params.cardsTotalCount)
    const page = useAppSelector(state => state.cards.params.page)
    const pageCount = useAppSelector(state => state.cards.params.pageCount)
    const cardQuestion = useAppSelector(state => state.cards.params.cardQuestion)
    //const cardAnswer = useAppSelector(state => state.cards.params.cardAnswer)

    const [isOpenModalAddNewCard, setIsOpenModalAddNewCard] = useState(false)
    const [packID, setPackID] = useState('');

    // const clearValue = (value: string) => {
    //     if (searchCardValue === 'Question') dispatch(searchQuestionAC(''))
    //     else dispatch(searchAnswerAC(''))
    //     setSearchCardValue(value)
    // }


    const handleChangePage = () => {
        dispatch(setCardsPageAC(page + 1))
    };

    const handleChange = (e: SelectChangeEvent) => {
        dispatch(setCardsPageCountAC(Number(e.target.value)))
    };
    const actualPageCount = Math.ceil(cardsTotalCount / pageCount);

    useEffect(() => {
            if (packId) {
                dispatch(getCardsTC(packId))
            }
        },
        [packId, page, pageCount, cardQuestion, packUserId]
    );

    // const returnToPacks = () => {
    //     dispatch(searchQuestionAC(''))
    //     dispatch(searchAnswerAC(''))
    //     navigate('/packs')
    // }

    //button add сard
    // const addCardChange = () => { //была тут ошибка string | undefined
    //     if (packId) {
    //         dispatch(addCardTC(packId))
    //     }
    // }           добавление кардсов до модалки

    const addCardModal=(packId:string)=>{
            setIsOpenModalAddNewCard(true);
            setPackID(packID)
    }

    //back
    const returnToPacks = () => {
        navigate('/packs')
    }


    return (
        <div>
            <div className={s.tableWrapper}>

                <div className={s.container}>
                    <div className={s.comeBack}>

                        <span className={s.span} onClick={returnToPacks}>Back to Packs</span>

                    </div>

                    <h1 className={s.title}>
                        {packName}
                    </h1>

                    <div className={s.wrapperTitle}>
                        <div className={s.search}>
                            Search:
                            <Search searchValue={cardQuestion}
                                    arg={searchQuestionAC}
                                    placeholder={'Search question'}/>
                        </div>
                        <Button className={s.btn}
                                variant={'contained'}
                                color="secondary"
                                onClick={() => addCardModal(packId ? packId:'')}
                                disabled={userId !== packUserId}
                        >
                            Add new card
                        </Button>
                    </div>

                    <CardsTable/>

                    <div className={s.paginatorBlock}>
                        <Stack className={s.numberPagination} spacing={2}>
                            <Pagination
                                onChange={handleChangePage}
                                color="secondary"
                                count={actualPageCount}
                                renderItem={(item) => (
                                    <PaginationItem
                                        components={{previous: ArrowBackIcon, next: ArrowForwardIcon}}
                                        {...item}
                                    />
                                )}
                            />
                        </Stack>
                        Show
                        <FormControl sx={{m: 1, minWidth: 45}}>
                            <Select
                                labelId="demo-simple-select-autowidth-label"
                                id="demo-simple-select-autowidth"
                                value={String(pageCount)}
                                onChange={handleChange}
                            >
                                <MenuItem value=''>
                                </MenuItem>
                                <MenuItem value={5}>5</MenuItem>
                                <MenuItem value={10}>10</MenuItem>
                                <MenuItem value={20}>20</MenuItem>
                            </Select>
                        </FormControl>
                        cards per page

                    </div>
                    <AddNewCardModal
                        isOpenModal={isOpenModalAddNewCard}
                        setIsOpenModal={setIsOpenModalAddNewCard}
                        packId={packId}
                    />
                </div>
            </div>
        </div>
    )
};


