import * as React from 'react';
import {useEffect} from 'react';
import {Navigate} from "react-router-dom";
import {
    Button,
    FormControl,
    MenuItem,
    Pagination,
    PaginationItem,
    Select,
    SelectChangeEvent,
    Stack
} from '@mui/material';
import {PacksTable} from './PacksTable';
import {useAppDispatch, useAppSelector} from "../../bll/state";
import s from './Packs.module.css'
import {getPacksTC, isMyPackAC, pageAC, pageCountAC} from "../../bll/packsReducer";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import {Search} from "../../common/searchField/SearchField";
import {useDebounce} from "../../hooks/useDebounce";


export const formatDate = (date: Date | string | number) => {
    return new Date(date).toLocaleDateString('ru-RU') + ' ' + new Date(date).toLocaleTimeString()
}

export const Packs = React.memo(() => {
    //const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const cardPacksTotalCount = useAppSelector(state => state.packs.cardPacksTotalCount)
    const page = useAppSelector(state => state.packs.params.page)
    const pageCount = useAppSelector(state => state.packs.params.pageCount)
    // const minCardsCount = useAppSelector(state => state.packs.minCardsCount)
    // const maxCardsCount = useAppSelector(state => state.packs.maxCardsCount)
    // const min = useAppSelector(state => state.packs.params.min)
    // const max = useAppSelector(state => state.packs.params.max)
    const isMyPack = useAppSelector(state => state.packs.isMyPack)
    const packName = useAppSelector(state => state.packs.params.packName)
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)

    // const [value, setValue] = React.useState<number | number[]>([min, max]);

    // // Min and Max scale of cards in pack
    // const handleChangeMinMax = (event: React.SyntheticEvent | Event, value: number | Array<number>) => {
    //     if (Array.isArray(value)) {
    //         dispatch(setMinMaxAC(value[0], value[1]));
    //         setValue([value[0], value[1]])
    //     }
    // };

    //for search:
    const debouncedValue = useDebounce<string>(packName, 3000)

    useEffect(() => {
        dispatch(getPacksTC())
    }, [page, pageCount, packName, isMyPack, debouncedValue]);

    // All Packs and My Packs
    const allPacksHandler = () => {
        dispatch(isMyPackAC(false))
    };

    const myPacksHandler = () => {
        dispatch(isMyPackAC(true))
    }


    // Packs Paginator
    const handleChangePage = () => {
        dispatch(pageAC(page + 1))
    };
    const handleChange = (e: SelectChangeEvent) => {
        dispatch(pageCountAC(Number(e.target.value)))
    };
    const actualPageCount = Math.ceil(cardPacksTotalCount / pageCount);

    // [ min, max])

    // const returnToProfile = () => {
    //     navigate('/profile')
    // }

    if (!isLoggedIn) {
        return <Navigate to={'/'}/>
    }

    return (
        <div>
            <div className={s.wrapper}>
                <div className={s.titleBlock}>
                    <h1 className={s.title}>Packs List</h1>
                    <Button className={s.btn}
                            variant={'contained'}
                            color="secondary"
                        // onClick={}
                    >
                        Add new pack
                    </Button>
                </div>
                <div className={s.panel}>

                    <div className={s.search}>
                        Search:
                        <Search/>
                    </div>
                    <div className={s.buttons}>
                        <p>Show packs cards </p>
                        <Button variant={isMyPack ? 'contained' : 'outlined'}
                                color="secondary"
                                onClick={myPacksHandler}>
                            My
                        </Button>
                        <Button variant={!isMyPack ? 'contained' : 'outlined'}
                                color="secondary"
                                onClick={allPacksHandler}>
                            All
                        </Button>
                    </div>
                    <div className={s.numberCard}>
                        <p className={s.sidebarBlock}>Number of cards</p>
                        <div className={s.rangeSlider}>
                            {/*<RangeSlider*/}
                            {/*    min={minCardsCount}*/}
                            {/*    max={maxCardsCount}*/}
                            {/*    value={value}*/}
                            {/*    onChange={(e, newValue) => setValue(newValue)}*/}
                            {/*    onChangeCommitted={handleChangeMinMax}*/}
                            {/*/>*/}
                        </div>
                    </div>

                </div>

                <PacksTable/>


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
    )
});
