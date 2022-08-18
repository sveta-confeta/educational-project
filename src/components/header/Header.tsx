import React from 'react';
import s from './Header.module.css';
import {useAppDispatch} from "../../bll/state";
import {logoutTC} from "../../bll/authReducer";

export const Header = () => {
    const dispatch = useAppDispatch();


    const logoutHandler = () => {
        dispatch(logoutTC());
    }
    return (
        <div className={s.wrapper}>
            <div className={s.contentWrapper}>
            <div className={s.title}>Training cards</div>
                <button className={s.logautIcon} onClick={logoutHandler}> </button>
            </div>

        </div>
    );
};

