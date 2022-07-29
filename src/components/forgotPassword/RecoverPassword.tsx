import React, {ChangeEvent, useState} from 'react';
import s from './../login/Login.module.css'
import {Button, Paper, TextField} from '@mui/material';
import { NavLink, useNavigate} from 'react-router-dom';
import {recoverTC} from "../../bll/recoverPasswordReducer";
import {useAppDispatch} from "../../bll/state";


export const RecoverPassword = React.memo(() => {
    const dispatch = useAppDispatch()
    const [email, setEmail] = useState('')
    const navigate = useNavigate()

    const emailEnter = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.currentTarget.value)
    }

    const message = `<div style="background-color: gold; padding: 15px">
password recovery link: <a href='https://sveta-confeta.github.io/educational-project/#/set-new-password/$token$'>link</a></div>`

    const emailSend = () => {
        dispatch(recoverTC(email, message))
        setEmail('')
        navigate(`/check-email/${email}`)
    }

    return (
        <div className={s.wrapper}>
            <Paper className={s.loginForm} elevation={3}>
                <p className={s.title}>Forgot your password?</p>
                <TextField
                    type="email"
                    id="standard-basic"
                    label="Email"
                    variant="standard"
                    value={email}
                    onChange={emailEnter}
                    color={'secondary'}
                />
                <div className={s.instructions}>Enter your email address and we will send you further
                    instructions
                </div>
                <Button color={'secondary'} variant={'contained'} onClick={emailSend}>Send Instructions</Button>
                Did you remember your password?
                <NavLink to={'/'}>Try logging in</NavLink>
            </Paper>
            </div>

    );
});