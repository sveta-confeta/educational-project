import React, {useEffect} from 'react';
import s from './Cards.module.css'
import {useNavigate, useParams} from 'react-router-dom';
import {CardsTable} from './CardsTable';
import {useAppDispatch, useAppSelector} from "../../bll/state";
import {getCardsTC, searchQuestionAC, setCardsPageAC, setCardsPageCountAC} from "../../bll/cardsReducer";
import {FormControl, MenuItem, Pagination, PaginationItem, Select, SelectChangeEvent, Stack} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import {pageCountAC} from "../../bll/packsReducer";
import {Search} from "../../common/searchField/SearchField";


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

    const {packId} = useParams();

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
    //pagination
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
        [packId, page, pageCount,cardQuestion]
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

                    <div className={s.search}>
                        Search:
                        <Search searchValue={cardQuestion}
                                arg={searchQuestionAC}
                                placeholder={'Search question'}/>
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
                </div>
            </div>
        </div>
    )
};


