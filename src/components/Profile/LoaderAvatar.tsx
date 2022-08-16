import React, {ChangeEvent, useRef, useState} from 'react';
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import {convertFileToBase64} from "../../common/utils/convertFileToBase64";
import {setErrorAC} from "../../bll/appReducer";
import {useAppDispatch, useAppSelector} from "../../bll/state";
import {updateAvatarDataTC} from "../../bll/profileReducer";
import defaultImg from './../../image/defaultImg.jpg';

export const LoaderAvatar = () => {
    const dispatch = useAppDispatch();

    const userAvatar = useAppSelector(state => state.profile.avatar);


    const [avatar, setAvatar] = useState<string>(userAvatar ? userAvatar : defaultImg)

    const refLoader = useRef<HTMLInputElement>(null)
    const selectImageHandler = () => {
        refLoader && refLoader.current?.click();
    }
    const uploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length) { //e.target.files=это массив . нужно проверить что он тру и у него есть длина
            const file = e.target.files[0]
            if (file.size < 1000000) { //это одно из свойст загружаемого файла показано сколько mgbate-1, если больше то преобразование
                convertFileToBase64(file, (file64: string) => {
                    setAvatar(file64)
                    dispatch(updateAvatarDataTC(file64));
                })
            } else {
                dispatch(setErrorAC('The file is more 1 mgBite'))
            }
        }
    }
    return (
        <div>
            <img
                src={avatar}/>

            <CloudDownloadIcon onClick={selectImageHandler} color="action" sx={{right: 0, top: '-8px'}}/>
            <input type='file'
                   ref={refLoader}
                   onChange={uploadHandler}
                   style={{display: 'none'}}
                   accept={'img/gif'}/>
        </div>
    );
};

