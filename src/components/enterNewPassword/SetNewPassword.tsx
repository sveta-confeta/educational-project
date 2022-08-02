import React, {useCallback} from 'react';
import {useFormik} from 'formik';
import {Button, FormControl, IconButton, Input, InputAdornment, InputLabel, Paper} from '@mui/material';
import {Visibility, VisibilityOff} from '@mui/icons-material';

import {Navigate, useParams} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from "../../bll/state";
import {setInfoTC} from "../../bll/setNewPasswordReducer";
import s from "../login/Login.module.css";

export const SetNewPassword = React.memo(() => {
    const dispatch = useAppDispatch()
    const isPassChanged = useAppSelector(state => state.newPassword.isPassChanged)
    const {token} = useParams()

    const formik = useFormik({
        initialValues: {
            password: '',
            password2: '',
        },
        validate: (values) => {
            const errors: FormikErrorType = {};
            if (!values.password) {
                errors.password = 'Required';
            } else if (values.password.length <= 7) {
                errors.password = 'Password must be more than 7 characters...'
            }
            if (!values.password2) {
                errors.password2 = 'Required';
            } else if (values.password2 !== values.password) {
                errors.password2 = 'The password and confirmation password do not match'
            }
            return errors;
        },
        onSubmit: values => {
            debugger
            token && dispatch(setInfoTC({password: values.password, resetPasswordToken:token}))
        },
    })

    const [valuesPassword, setValuesPassword] = React.useState<StatePassword>({
        password: '',
        showPassword: false,
    });

    const [valuesConfirmPassword, setValuesConfirmPassword] = React.useState<StateConfirmPassword>({
        password2: '',
        showConfirmPassword: false,
    });

    const handleClickShowPassword = useCallback(() => {
        setValuesPassword({
            ...valuesPassword,
            showPassword: !valuesPassword.showPassword,
        });
    }, [valuesPassword]);

    const handleClickShowConfirmPassword = useCallback(() => {
        setValuesConfirmPassword({
            ...valuesConfirmPassword,
            showConfirmPassword: !valuesConfirmPassword.showConfirmPassword,
        });
    }, [valuesConfirmPassword]);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    if (isPassChanged) {
        return <Navigate to={'/'}/>
    }

    return (
        <div className={s.wrapper}>
            <Paper className={s.loginForm} elevation={3}>
                <div className={s.title}>Create new password</div>
                <FormControl variant="standard">
                    <InputLabel color={'secondary'}>New password</InputLabel>
                    <Input
                        id="password"
                        type={valuesPassword.showPassword ? 'text' : 'password'}
                        placeholder={'New password'}
                        className={s.input}
                        color={'secondary'}
                        {...formik.getFieldProps('password')}
                        autoComplete="on"
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                >
                                    {valuesPassword.showPassword ? <VisibilityOff/> : <Visibility/>}
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                </FormControl>
                {formik.errors.password && formik.touched.password &&
                    <div style={{color: "red"}}>{formik.errors.password}</div>}

                <FormControl variant="standard">
                    <InputLabel color={'secondary'}>Confirm new
                        password</InputLabel>
                    <Input
                        id="password2"
                        type={valuesConfirmPassword.showConfirmPassword ? 'text' : 'password'}
                        placeholder={'Confirm new password'}
                        className={s.input}
                        color={'secondary'}
                        {...formik.getFieldProps('password2')}
                        autoComplete="on"

                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={handleClickShowConfirmPassword}
                                    onMouseDown={handleMouseDownPassword}
                                >
                                    {valuesConfirmPassword.showConfirmPassword ? <VisibilityOff/> : <Visibility/>}
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                </FormControl>
                {formik.errors.password2 && formik.touched.password2 &&
                    <div style={{color: "red"}}>{formik.errors.password2}</div>}
                <div className={s.instructions}>Create new password and we will send you further instructions to
                    email
                </div>
                <Button color={'secondary'} variant={'contained'} type="submit">Create new password</Button>
            </Paper>
        </div>
    );
});

// types
type FormikErrorType = {
    password?: string
    password2?: string
}

type StatePassword = {
    password: string;
    showPassword: boolean;
}

type StateConfirmPassword = {
    password2: string;
    showConfirmPassword: boolean;
}