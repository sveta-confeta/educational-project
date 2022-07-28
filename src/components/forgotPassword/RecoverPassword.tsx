import React, {ChangeEvent, useState} from 'react';
import styles from '../../styles/Authorization.module.css'
import {Button, TextField} from '@mui/material';
import {Link, useNavigate} from 'react-router-dom';
import {recoverTC} from '../../bll/reducers/recover-password-reducer';
import {useAppDispatch} from '../../bll/store';

export const RecoverPassword = React.memo(() => {
    const dispatch = useAppDispatch()
    const [email, setEmail] = useState('')
    const navigate = useNavigate()

    const emailEnter = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.currentTarget.value)
    }

    const message = `<div style="background-color: lime; padding: 15px">
password recovery link: <a href='https://zouker.github.io/cards/#/set-new-password/$token$'>link</a></div>`

    const emailSend = () => {
        dispatch(recoverTC(email, message))
        setEmail('')
        navigate(`/check-email/${email}`)
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.form}>
                <div className={styles.title}>Forgot your password?</div>
                <TextField
                    type="email"
                    id="standard-basic"
                    label="Email"
                    variant="standard"
                    value={email}
                    onChange={emailEnter}
                    color={'secondary'}
                />
                <div className={styles.instructions}>Enter your email address and we will send you further
                    instructions
                </div>
                <Button color={'secondary'} variant={'contained'} onClick={emailSend}>Send Instructions</Button>
                Did you remember your password?
                <Link to={'/login'}>Try logging in</Link>
            </div>
        </div>
    );
});