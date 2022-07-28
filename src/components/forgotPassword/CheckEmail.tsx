import React from 'react';
import styles from '../../styles/Authorization.module.css'
import {Link, useParams} from 'react-router-dom';
import Email from '../../assets/images/email.gif'

export const CheckEmail = () => {

    const {email} = useParams()
    console.log(email)
    return (
        <div className={styles.wrapper}>
            <div className={styles.form}>
                <img src={Email} alt={'Email img'}/>
                <div className={styles.title}>Check Email</div>
                We've sent an Email with instructions to <b>{email}</b>
                <div className={styles.login}>
                    <Link to={'/login'}>Sign In</Link>
                </div>
            </div>
        </div>
    );
};