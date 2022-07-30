import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../bll/state";
import s from './Profile.module.css'
import {Paper} from "@mui/material";
import {initializeTC} from "../../bll/authReducer";
import {Navigate} from "react-router-dom";
import {EditableSpan} from "./EditableSpan";


type ProfileType = {
    title?: string
    changeTitle?: (title: string) => void
    disabled?: boolean
    activateEditMode?: () => void
}

export const Profile: React.FC<ProfileType> = () => {
    const dispatch = useAppDispatch();
    const profile = useAppSelector(state => state.profile)
    const isLogin = useAppSelector(state => state.auth.isLoggedIn)

    useEffect(() => {
        if (isLogin) {
            dispatch(initializeTC())
        }

    }, [isLogin])

    if (!isLogin) {
        return <Navigate to={'/'}/>
    }


    //
    // const activateEditMode = () => {
    //     if (disabled) {
    //         return
    //     } else {
    //         setEditMode(true)
    //     }
    // }
    //
    // const changeUserName = (name: string) => {
    //     dispatch(updateUserDataTC({name: name, avatar: userAvatar, _id: userId, publicCardPacksCount, email}))
    // }
    //
    // const changeUserAvatar = (avatar: string) => {
    //     dispatch(updateUserDataTC({name: userName, avatar, _id: userId, publicCardPacksCount, email}))
    // }
    //
    // const handleLogout = () => {
    //     dispatch(logoutTC())
    // }
    //

    return (

        <div className={s.wrapper}>

            <Paper className={s.loginForm} elevation={3}>
                <span className={s.title}>My profile</span>

                {profile.avatar ? profile.avatar :
                    <img src={'https://moskva.bezformata.com/content/image493312821.jpg'}/>}
                <div className={s.userName}>
                    <EditableSpan/>
                </div>
                <p className={s.text}>E-mail: {profile.email}</p>
                <p className={s.text}>колличество моих коллод на сайте: {profile.publicCardPacksCount}</p>


            </Paper>
        </div>
    )
};


