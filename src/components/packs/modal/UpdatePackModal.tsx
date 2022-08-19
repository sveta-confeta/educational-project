import React, {ChangeEvent, useEffect, useRef, useState} from 'react';
import s from './../../../common/modal/Modal.module.css'
import {TextField} from '@mui/material';
import {useAppDispatch} from "../../../bll/state";
import {updatePackTC} from "../../../bll/packsReducer";
import {BasicModal} from "../../../common/modal/Modal";
import {convertFileToBase64} from "../../../common/utils/convertFileToBase64";
import {setErrorAC} from "../../../bll/appReducer";

type UpdatePackModalType = {
    isOpenModal: boolean
    setIsOpenModal: (value: boolean) => void
    packID: string
    packName: string
    img: string
}


export const UpdatePackModal: React.FC<UpdatePackModalType> = ({
                                                                   packID,
                                                                   packName,
                                                                   isOpenModal,
                                                                   setIsOpenModal,
                                                                   img,
                                                               }) => {
    const [newPackName, setNewPackName] = useState<string>(packName)
    const [cover, setCover] = useState<string>(img);

    const dispatch = useAppDispatch()

    //чтобы в inpute подтягивалось старое название перед тем какм редактировать
    useEffect(() => {
        setNewPackName(packName)
        setCover(img);
    }, [packName,img])

    const updateCardPack = () => {
        dispatch(updatePackTC(packID, newPackName,cover))

    }

    const refLoader = useRef<HTMLInputElement>(null);
    const selectImageHandler = () => {
        refLoader && refLoader.current?.click();
    }
    const uploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length) { //e.target.files=это массив . нужно проверить что он тру и у него есть длина
            const file = e.target.files[0]
            if (file.size < 1000000) { //это одно из свойст загружаемого файла показано сколько mgbate-1, если больше то преобразование
                convertFileToBase64(file, (file64: string) => {
                    setCover(file64)


                })
            } else {
                dispatch(setErrorAC('The file is more 1 mgBite'))
            }
        }
    }
    return (
        <BasicModal title={'Update Pack'}
                    buttonName={'Save'}
                    handleOperation={updateCardPack}
                    isOpenModal={isOpenModal}
                    setIsOpenModal={setIsOpenModal}
        >
            <div className={s.coverText}>
                <p>Cover</p>
                {/*//привязываем загрузку рефом к этому тексту:*/}
                <a className={s.link} onClick={selectImageHandler}>Change cover</a>
            </div>
            <input type='file' //дефолтный инпут загрузки скрывается
                   ref={refLoader}
                   onChange={uploadHandler}
                   style={{display: 'none'}}
                   accept={'img/gif'}/>

            <div className={s.coverImg}>
                <img className={s.imgUpdate} src={cover}/>
            </div>
            <TextField className={s.addItemField}
                       label="Title"
                       variant="standard"
                       color="secondary"
                       value={newPackName}
                       onChange={(e) => setNewPackName(e.currentTarget.value)}/>
            <div>Do you really want to change <b>{packName}</b>?</div>
        </BasicModal>
    );
};
