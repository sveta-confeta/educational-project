import React, {useState} from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import {Link, useNavigate} from 'react-router-dom';
import s from './Packs.module.css'
import {Button} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import TableContainer from '@mui/material/TableContainer';
import {formatDate} from './Packs';
import {useAppDispatch, useAppSelector} from "../../bll/state";
import {setParamsSortPack} from "../../bll/packsReducer";
import {DeletePackModal} from "./modal/DeletePackModal";
import {UpdatePackModal} from "./modal/UpdatePackModal";


export const PacksTable = () => {
    const navigate = useNavigate()

    const packs = useAppSelector(state => state.packs.cardPacks)
    const userId = useAppSelector(state => state.profile._id)
    const sort = useAppSelector(state => state.packs.params.sortPacks)
    const dispatch = useAppDispatch()


    const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
    const [packID, setPackID] = useState('');
    const [packName, setPackName] = useState('');
    const [isOpenUpdateModal, setIsOpenUpdateModal] = useState(false);

    const sortUpdate = (sortParams: string) => {
        return sort === `1${sortParams}` ? dispatch(setParamsSortPack(`0${sortParams}`)) : dispatch(setParamsSortPack(`1${sortParams}`));

    }

    // const deleteHandler = (id: string) => {   был хардкод удаления пака
    //     dispatch(deletePackTC(id));
    // }
     //modal:
    const openModalDeletePack = (packID: string,name:string) => {
        setIsOpenDeleteModal(true)
        setPackID(packID);
        setPackName(name);
    }
    const openModalUpdatePack = (packID: string,name:string) => {
        setIsOpenUpdateModal(true)
        setPackID(packID);
        setPackName(name);
    }


    return (
        <>
            <TableContainer component={Paper}>
                <Table sx={{minWidth: 400}} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell onClick={() => sortUpdate('name')}
                                       className={sort === '0name' ? s.sortUp : s.sortDown}>Name</TableCell>
                            <TableCell align="right" onClick={() => sortUpdate('cardsCount')}
                                       className={sort === '0cardsCount' ? s.sortUp : s.sortDown}>Cards</TableCell>
                            <TableCell align="right" onClick={() => sortUpdate('user_name')}
                                       className={sort === '0user_name' ? s.sortUp : s.sortDown}>Created
                                By</TableCell>
                            <TableCell align="right" onClick={() => sortUpdate('updated')}
                                       className={sort === '0updated' ? s.sortUp : s.sortDown}>Last
                                Updated</TableCell>
                            <TableCell align="right">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {packs?.map((pack) => (
                            <TableRow
                                key={pack._id}
                                sx={{'&:last-child td, &:last-child th': {border: 0}}}
                            >
                                <TableCell component="th" scope="row">
                                    <Link className={s.pack}
                                          to={`/cards/${pack._id}`}>{pack.name}</Link>
                                </TableCell>

                                <TableCell align="right">{pack.cardsCount}</TableCell>
                                <TableCell align="right">{pack.user_name}</TableCell>
                                <TableCell align="right">{formatDate(pack.updated)}</TableCell>
                                <TableCell className={s.buttonBlock}>
                                    <Button
                                        // onClick={() => deleteHandler(pack._id)} был хардкод
                                        onClick={()=>openModalDeletePack(pack._id,pack.name)}
                                        disabled={userId !== pack.user_id}
                                        color="error"
                                        size="small"
                                        startIcon={<DeleteIcon/>}>
                                        Delete
                                    </Button>
                                    <Button
                                        onClick={() => openModalUpdatePack(pack._id,pack.name)}
                                        disabled={userId !== pack.user_id}
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
            <DeletePackModal isOpenModal={isOpenDeleteModal}
                             setIsOpenModal={setIsOpenDeleteModal}
                             packID={packID}
                             packName={packName}

            />
            <UpdatePackModal isOpenModal={isOpenUpdateModal}
                             setIsOpenModal={setIsOpenUpdateModal}
                             packName={packName}
                             packID={packID}
            />

        </>
    );
};
