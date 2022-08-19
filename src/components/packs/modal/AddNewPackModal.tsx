import React, {ChangeEvent, useRef, useState} from 'react';
import {Checkbox, TextField} from '@mui/material';
import s from './../../../common/modal/Modal.module.css'
import {useAppDispatch} from "../../../bll/state";
import {addPackTC} from "../../../bll/packsReducer";
import {BasicModal} from "../../../common/modal/Modal";
import defoultImg from './../../../image/defaultImg.jpg'
import {convertFileToBase64} from "../../../common/utils/convertFileToBase64";
import {setErrorAC} from "../../../bll/appReducer";

type AddNewPackType = {
    isOpenModal: boolean
    setIsOpenModal: (value: boolean) => void
}

export const AddNewPackModal: React.FC<AddNewPackType> = React.memo(
    ({isOpenModal, setIsOpenModal}) => {

        const [newPackName, setNewPackName] = useState('')
        const [isPrivate, setPrivate] = React.useState(false)
        const [cover, setCover] = useState<string>(defoultImg);
        const [isAvaBroken, setAvaBroken] = useState(false) //битая картинка или не битая
        const dispatch = useAppDispatch()


        const addNewCardPack = () => {
            dispatch(addPackTC(newPackName, cover, isPrivate))
            setNewPackName('')

        }

        //возможность изменить дефолтную загрузку изображений:

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

        const errorHandler = () => { //этот колбэк отработает когда у меня будет битая картинка
            setAvaBroken(true)
        }

        return (
            <BasicModal
                isOpenModal={isOpenModal}
                setIsOpenModal={setIsOpenModal}
                title={'Add new Pack'}
                buttonName={'Save'}
                handleOperation={addNewCardPack}
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
                    <img onError={errorHandler} src={isAvaBroken ?  defoultImg : cover}/>
                </div>

                <TextField className={s.addItemField}
                           label="write title"
                           variant="standard"
                           color="secondary"
                           value={newPackName}
                           onChange={(e) => setNewPackName(e.currentTarget.value)}/>

                <div className={s.private}>
                    <Checkbox checked={isPrivate}
                              onChange={(e) => setPrivate(e.currentTarget.checked)}
                              color="secondary"/>
                    Private pack
                </div>

            </BasicModal>
        );
    });
