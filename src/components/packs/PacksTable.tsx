import React, {useState} from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import {NavLink, useNavigate} from 'react-router-dom';
import s from './Packs.module.css'
import {Button} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import TableContainer from '@mui/material/TableContainer';
import {formatDate} from './Packs';
import {PackType} from '../../api/packsAPI';
import {useAppSelector} from "../../bll/state";


export const PacksTable = () => {
    const navigate = useNavigate()

     const packs = useAppSelector(state => state.packs.cardPacks)
    // const userId = useAppSelector(state => state.profile._id)
    // const sort = useAppSelector(state => state.packs.params.sortPacks)
    // const dispatch = useAppDispatch()

    const [isOpenModalDelete, setIsOpenModalDelete] = useState(false)
    const [isOpenModalUpdate, setIsOpenModalUpdate] = useState(false)
    const [deletePackData, setDeletePackData] = useState<PackType | null>(null);
    const [updatePackData, setUpdatePackData] = useState<PackType | null>(null);

    // const sortUpdate = (sortParams: string) => {
    //     return sort === `1${sortParams}` ? dispatch(setParamsSortPack(`0${sortParams}`)) : dispatch(setParamsSortPack(`1${sortParams}`));
    //
    // }

    const openModalDeletePack = (pack: PackType) => {
        setIsOpenModalDelete(true)
        setDeletePackData(pack)
    }

    const openModalUpdatePack = (pack: PackType) => {
        setIsOpenModalUpdate(true)
        setUpdatePackData(pack)
    }

    return (
        <>
            <TableContainer component={Paper}>
                <Table sx={{minWidth: 400}} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            {/*<TableCell onClick={() => sortUpdate('name')}*/}
                            {/*           className={sort === '0name' ? styles.sortUp : styles.sortDown}>Name</TableCell>*/}
                            {/*<TableCell align="right" onClick={() => sortUpdate('cardsCount')}*/}
                            {/*           className={sort === '0cardsCount' ? styles.sortUp : styles.sortDown}>Cards</TableCell>*/}
                            {/*<TableCell align="right" onClick={() => sortUpdate('user_name')}*/}
                            {/*           className={sort === '0user_name' ? styles.sortUp : styles.sortDown}>Created*/}
                            {/*    By</TableCell>*/}
                            {/*<TableCell align="right" onClick={() => sortUpdate('updated')}*/}
                            {/*           className={sort === '0updated' ? styles.sortUp : styles.sortDown}>Last*/}
                            {/*    Updated</TableCell>*/}
                            {/*<TableCell align="right">Actions</TableCell>*/}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {packs?.map((pack) => (
                            <TableRow
                                key={pack._id}
                                sx={{'&:last-child td, &:last-child th': {border: 0}}}
                            >
                                <TableCell component="th" scope="row">
                                    <NavLink className={s.pack}
                                             to={`/cards/${pack._id}`}>{pack.name}</NavLink>
                                </TableCell>
                                <TableCell align="right">{pack.cardsCount}</TableCell>
                                <TableCell align="right">{pack.user_name}</TableCell>
                                <TableCell align="right">{formatDate(pack.updated)}</TableCell>
                                <TableCell className={s.buttonBlock}>
                                    <Button
                                        onClick={() => openModalDeletePack(pack)}
                                        // disabled={userId !== pack.user_id}
                                        color="error"
                                        size="small"
                                        startIcon={<DeleteIcon/>}>
                                        Delete
                                    </Button>
                                    <Button
                                        onClick={() => openModalUpdatePack(pack)}
                                        // disabled={userId !== pack.user_id}
                                        color="secondary"
                                        size="small"
                                        startIcon={<BorderColorIcon/>}>
                                        Edit
                                    </Button>
                                    <Button
                                        disabled={pack.cardsCount === 0}
                                        onClick={() => {
                                            navigate(`/learn/${pack._id}`)
                                        }} color="secondary" size="small"
                                        startIcon={<MenuBookIcon/>}>
                                        Learn
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {/*{deletePackData && <DeletePackModal*/}
            {/*    isOpenModal={isOpenModalDelete}*/}
            {/*    setIsOpenModal={setIsOpenModalDelete}*/}
            {/*    packName={deletePackData && deletePackData.name}*/}
            {/*    cardPackId={deletePackData && deletePackData._id}*/}
            {/*/>}*/}
            {/*{updatePackData && <UpdatePackModal*/}
            {/*    isOpenModal={isOpenModalUpdate}*/}
            {/*    setIsOpenModal={setIsOpenModalUpdate}*/}
            {/*    pack={updatePackData}*/}
            {/*/>}*/}
        </>
    );
};
