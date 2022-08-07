import * as React from 'react';
import {useEffect} from 'react';
import {Navigate, useNavigate} from "react-router-dom";
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
import {addPackTC, getPacksTC, isMyPackAC, pageAC, pageCountAC, searchAC} from "../../bll/packsReducer";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import {Search} from "../../common/searchField/SearchField";
import {RangeSlider} from "./RangeSlider";


export const formatDate = (date: Date | string | number) => {
    return new Date(date).toLocaleDateString('ru-RU') + ' ' + new Date(date).toLocaleTimeString()
}

export const Packs = React.memo(() => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const cardPacksTotalCount = useAppSelector(state => state.packs.cardPacksTotalCount)
    const page = useAppSelector(state => state.packs.params.page)
    const pageCount = useAppSelector(state => state.packs.params.pageCount)
    const isMyPack = useAppSelector(state => state.packs.isMyPack)
    const packName = useAppSelector(state => state.packs.params.packName)
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
    const min = useAppSelector(state => state.packs.params.min)
    const max = useAppSelector(state => state.packs.params.max)
    const name=useAppSelector(state=>state.packs.name)



    useEffect(() => {
        dispatch(getPacksTC())
    }, [page, pageCount, packName, isMyPack, min, max]);

    //button add pack
    const addPackChange = () => {
        dispatch(addPackTC(name))
    }
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

    //back
    const returnToProfile = () => {
        navigate('/profile')
    }

    if (!isLoggedIn) {
        return <Navigate to={'/'}/>
    }

    return (
        <div>
            <div className={s.wrapper}>
                <div className={s.comeBack}>
                    <svg width="16" height="11" viewBox="0 0 16 11" fill= "#7b1fa2" xmlns="http://www.w3.org/2000/svg">
                        <path d="M16 5.5H2M2 5.5L6.66667 1M2 5.5L6.66667 10" stroke="#7b1fa2" stroke-width="2"/>
                    </svg>
                     <span className={s.span} onClick={returnToProfile}>Back to Profile</span>

                </div>
                <div className={s.titleBlock}>
                    <h1 className={s.title}>Packs List</h1>
                    <Button className={s.btn}
                            variant={'contained'}
                            color="secondary"
                            onClick={addPackChange}
                    >
                        Add new pack
                    </Button>
                </div>
                <div className={s.panel}>

                    <div className={s.search}>
                        Search:
                        <Search searchValue={packName}
                        arg={searchAC}
                        placeholder={"Search pack`s name"}/>
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
                            <RangeSlider/>
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
