import React from 'react';
import s from './../login/Login.module.css'
import {Link, useParams} from 'react-router-dom';
import Email from './../../image/email.gif'
import {Paper} from "@mui/material";

export const CheckEmail = () => {

    const {email} = useParams()
    console.log(email)
    return (
        <div className={s.wrapper}>
            <Paper className={s.loginForm} elevation={3}>
                <img src={Email} alt={'Email img'}/>
                <div className={s.title}>Check Email</div>
                We're send an Email with instructions to <b>{email}</b>
                <div className={s.login}>
                    <Link to={'/'}>Sign In</Link>
                </div>
           </Paper>
        </div>
    );
};