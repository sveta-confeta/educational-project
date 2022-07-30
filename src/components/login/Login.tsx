import React from 'react';
import {useFormik} from "formik";
import {
    Button,
    Checkbox,
    FormControl,
    FormControlLabel, IconButton, Input, InputAdornment, InputLabel,
    Paper, TextField
} from "@mui/material";
import {NavLink, Navigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../bll/state";
import s from './Login.module.css'
import {loginTC} from "../../bll/authReducer";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import {ErrorSnackbar} from "../../common/ErrorSnackbar/ErrorSnackbar";

export const Login = () => {
    const dispatch = useAppDispatch()
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)


    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false
        },
        validate: (values) => {
            const errors: FormikErrorType = {};
            if (!values.email) {
                errors.email = 'Required';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            }
            if (!values.password) {
                errors.password = 'Required';
            } else if (values.password.length <= 7) {
                errors.password = 'Password must be more than 7 characters...'
            }
            return errors;
        },
        onSubmit: values => {
            dispatch(loginTC(values));
            formik.resetForm();
        },
    })
    //eye
    const [valuesPassword, setValuesPassword] = React.useState<StatePassword>({
        password: '',
        showPassword: false,
    });
    //eye
    const handleClickShowPassword = () => {
        setValuesPassword({
            ...valuesPassword,
            showPassword: !valuesPassword.showPassword,
        });
    };
    //eye
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    if (isLoggedIn) {
        return <Navigate to={'/profile'}/>
    }

    return (
        <div className={s.wrapper}>
            <Paper className={s.loginForm} elevation={3}>
                <p className={s.title}>Sign In</p>
                {/*//оборачиваем наши все формы тегом form..*/}
                <form onSubmit={formik.handleSubmit}>
                    {/* FormControl-задает размеры и параметы полей инпутов-для каждого свой*/}
                    <FormControl variant="standard" sx={{m: 1, mt: 1, width: '30ch'}}>
                        {/*//email*/}
                        <TextField
                            className={s.input}
                            id="email"
                            label="Email"
                            variant="standard"
                            color="secondary"
                            margin="normal" {...formik.getFieldProps('email')}
                        />
                        {formik.touched.email && formik.errors.email &&
                            <div style={{color: "red"}}>{formik.errors.email}</div>}
                    </FormControl>

                    {/*//eye-password*/}
                    <FormControl variant="standard" sx={{m: 1, mt: 1, width: '30ch'}}>
                        <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                        <Input
                            id="password"
                            type={valuesPassword.showPassword ? 'text' : 'password'}
                            placeholder={'Password'}
                            className={s.input}
                            color="secondary"
                            {...formik.getFieldProps('password')}
                            autoComplete="on"
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                    >
                                        {valuesPassword.showPassword ? <Visibility/> :  <VisibilityOff/>}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </FormControl>

                    {/*           ////end eye*/}

                    {formik.touched.password && formik.errors.password &&
                        <div style={{color: "red"}}>{formik.errors.password}</div>}

                    <FormControl variant="standard" sx={{m: 1, mt: 1, width: '30ch'}}>
                    <FormControlLabel label={'Remember me'}
                                      control={<Checkbox color="secondary"
                                                         {...formik.getFieldProps('rememberMe')}
                                                         checked={formik.values.rememberMe}/> //благодаря этой строке чекбокс тоже сбрасывается
                                      }/>

                    </FormControl>
                    <NavLink className={s.textLink} to={'/forgot'}>Forgot Password</NavLink>

                    <Button className={s.btn} type={'submit'} variant={'contained'} color={'secondary'}>
                        Sign In
                    </Button>
                </form>
                    <p> Don’t have an account?</p>
                    <NavLink to={'/registration'}>Sign Up</NavLink>
                    <ErrorSnackbar/>



            </Paper>
        </div>

    )
};

// types
type FormikErrorType = {
    email?: string
    password?: string
    rememberMe?: false
}

type StatePassword = {
    password: string;
    showPassword: boolean;
}
