import React from 'react';
import s from './Header.module.css';
import {NavLink} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../bll/state";
import {logoutTC} from "../../bll/authReducer";

export const Header = () => {
    const dispatch = useAppDispatch();
    //const isLogin = useAppSelector(state => state.auth.isLoggedIn)

    const logoutHandler = () => {
        dispatch(logoutTC());
    }
    return (
        <div className={s.wrapper}>
            <nav className={s.nav}>

                <div className={s.item}><NavLink to={'/'} className={({isActive}) =>
                    isActive ? s.active : s.item}>Login</NavLink></div>
                <div className={s.item}><NavLink to={'/registration'} className={({isActive}) =>
                    isActive ? s.active : s.item}>Registration</NavLink></div>
                <div className={s.item}><NavLink to={'/forgot'} className={({isActive}) =>
                 isActive ? s.active : s.item}>Forgot</NavLink></div>
                <div className={s.item}><NavLink to={'/profile'} className={({isActive}) =>
                    isActive ? s.active : s.item}>Profile</NavLink></div>
                {/*<div className={s.item}><NavLink to={'/packs'} className={({isActive}) =>*/}
                {/*    isActive ? s.active : s.item}>Packs</NavLink></div>*/}
                {/*<div className={s.item}><NavLink to={'/cards'} className={({isActive}) =>*/}
                {/*    isActive ? s.active : s.item}>Cards</NavLink></div>*/}
                {/*<div className={s.item}><NavLink to={'/error'} className={({isActive}) =>*/}
                {/*    isActive ? s.active : s.item}>Error</NavLink></div>*/}

            </nav>

            <button className={s.logautIcon} onClick={logoutHandler}> </button>

        </div>
    );
};

