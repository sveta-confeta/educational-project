import React from 'react';
import {useAppDispatch, useAppSelector} from "../../bll/state";
import s from './Profile.module.css'
import {Paper} from "@mui/material";
import {Navigate, NavLink} from "react-router-dom";
import {EditableSpan} from "./EditableSpan";
import {Preloader} from "../../common/loader/Loader";
import {LoaderAvatar} from "./LoaderAvatar";


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
    const status = useAppSelector(state => state.app.status)

    if (!isLogin) {
        return <Navigate to={'/'}/>
    }


    return (


        <div className={s.wrapper}>
            {status === true && <Preloader/>}

            <Paper className={s.loginForm} elevation={3}>
                <span className={s.title}>My profile</span>

                {profile.avatar ? profile.avatar :
                    <img src={'https://moskva.bezformata.com/content/image493312821.jpg'}/>}
                <LoaderAvatar/>
                <div className={s.userName}>
                    <EditableSpan/>
                </div>
                <p className={s.text}>E-mail: {profile.email}</p>
                <p className={s.text}>колличество моих коллод на сайте: {profile.publicCardPacksCount}</p>

                <div className={s.btn}><NavLink to={'/packs'} className={({isActive}) =>
                    isActive ? s.active : s.item}>Packs</NavLink></div>


            </Paper>
        </div>
    )
};


