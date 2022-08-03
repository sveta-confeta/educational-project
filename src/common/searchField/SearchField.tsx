import * as React from 'react';
import {ChangeEvent} from 'react';
import Toolbar from '@mui/material/Toolbar';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import {IconButton, Paper} from '@mui/material';
import {useAppDispatch, useAppSelector} from "../../bll/state";
import {searchAC} from "../../bll/packsReducer";



export const Search = React.memo(() => {

    const dispatch = useAppDispatch()

    // const {packId} = useParams<'packId'>();
    // const [isOpenModalAddNewPack, setIsOpenModalAddNewPack] = useState(false)
    // const [isOpenModalAddNewCard, setIsOpenModalAddNewCard] = useState(false)

    const packName = useAppSelector(state => state.packs.params.packName);

    const onChangeSearch = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        dispatch(searchAC(e.currentTarget.value))

    }



    return (
        <>
            {/*//search*/}
            <Paper
                component="form"
                sx={{p: '2px 4px', display: 'flex', alignItems: 'center', width: 300}}
            >
                <InputBase
                    sx={{ml: 1, flex: 1}}
                    placeholder="Search pack`s name"
                    inputProps={{'aria-label': 'search'}}
                    value={packName}
                    onChange={onChangeSearch}
                />
                <IconButton type="submit" sx={{p: '10px'}} aria-label="search">
                    <SearchIcon/>
                </IconButton>
            </Paper>


            <Toolbar style={{display: 'flex', justifyContent: 'space-between'}}>
                <div>
                    {/*<Button onClick={goBack}*/}
                    {/*        variant="contained"*/}
                    {/*        color="secondary">*/}
                    {/*    Back*/}
                    {/*</Button>*/}
                </div>
                {/*{packId && <SearchCardRadio radioValue={radioValue} onChangeRadio={onChangeRadio}/>}*/}

                <div>
                    {/*{packId*/}
                    {/*    ? <Button*/}
                    {/*        onClick={() => setIsOpenModalAddNewCard(true)}*/}
                    {/*        color="secondary"*/}
                    {/*        variant="contained">*/}
                    {/*        Add new card*/}
                    {/*    </Button>*/}
                    {/*    : <Button*/}
                    {/*        onClick={() => setIsOpenModalAddNewPack(true)}*/}
                    {/*        color="secondary"*/}
                    {/*        variant="contained">*/}
                    {/*        Add new Pack*/}
                    {/*    </Button>}*/}
                </div>
            </Toolbar>


            {/*{packId*/}
            {/*    ? <AddNewCardModal*/}
            {/*        isOpenModal={isOpenModalAddNewCard}*/}
            {/*        setIsOpenModal={setIsOpenModalAddNewCard}*/}
            {/*    />*/}
            {/*    : <AddNewPackModal*/}
            {/*        isOpenModal={isOpenModalAddNewPack}*/}
            {/*        setIsOpenModal={setIsOpenModalAddNewPack}*/}
            {/*    />*/}
            {/*}*/}
        </>
    );
});
