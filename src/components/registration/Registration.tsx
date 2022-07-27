import React from 'react';
import {useFormik} from "formik";
import {Navigate, NavLink} from "react-router-dom";
import s from "../login/Login.module.css";
import {Button, FormControl, IconButton, Input, InputAdornment, InputLabel, Paper, TextField} from "@mui/material";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import {useAppDispatch, useAppSelector} from "../../bll/state";
import {ErrorSnackbar} from "../../common/ErrorSnackbar/ErrorSnackbar";
import {setRegistrTC} from "../../bll/registrReducer";

const Registration = () => {
    const dispatch = useAppDispatch();
    const registr=useAppSelector(state=> state.registr.isRegistered);

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            password2: '',

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
            if (!values.password2) {
                errors.password2 = 'Required';
            } else if (values.password!==values.password2) { //сдесь изменения
                errors.password2 = 'The password and confirmation password do not match'
            }
            return errors;
        },
        onSubmit: values => {
            dispatch(setRegistrTC(values));
            formik.resetForm();
        },
    })
    //eye -2 стейта на 2а глаза
    const [valuesPassword1, setValuesPassword1] = React.useState<StatePassword1>({
        password: '',
        showPassword1: false,
    });
    const [valuesPassword2, setValuesPassword2] = React.useState<StatePassword2>({
        password2: '',
        showPassword2: false,
    });
    //eye
    const handleClickShowPassword1 = () => {
        setValuesPassword1({
            ...valuesPassword1,
            showPassword1: !valuesPassword1.showPassword1,
        });
    };
    const handleClickShowPassword2 = () => {
        setValuesPassword2({
            ...valuesPassword2,
            showPassword2: !valuesPassword2.showPassword2,
        });
    };
    //eye
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };


    if (registr) {
        return <Navigate to={'/'}/>
    }

    return (
        <div className={s.wrapper}>
            <Paper className={s.loginForm} elevation={3}>
                <p className={s.title}>Sign Up</p>
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

                    {/*//1eye-password*/}
                    <FormControl variant="standard" sx={{m: 1, mt: 1, width: '30ch'}}>
                        <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                        <Input
                            id="password"
                            type={valuesPassword1.showPassword1 ? 'text' : 'password'}
                            placeholder={'Password'}
                            className={s.input}
                            color="secondary"
                            {...formik.getFieldProps('password')}
                            autoComplete="on"
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={handleClickShowPassword1}
                                        onMouseDown={handleMouseDownPassword}
                                    >
                                        {valuesPassword1.showPassword1 ? <Visibility/> :  <VisibilityOff/>}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </FormControl>
                    {formik.touched.password && formik.errors.password &&
                        <div style={{color: "red"}}>{formik.errors.password}</div>}

                    {/*//2eye-password*/}
                    <FormControl variant="standard" sx={{m: 1, mt: 1, width: '30ch'}}>
                        <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                        <Input
                            id="password2"
                            type={valuesPassword2.showPassword2 ? 'text' : 'password'}
                            placeholder={'Password'}
                            className={s.input}
                            color="secondary"
                            {...formik.getFieldProps('password2')}
                            autoComplete="on"
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={handleClickShowPassword2}
                                        onMouseDown={handleMouseDownPassword}
                                    >
                                        {valuesPassword2.showPassword2 ? <Visibility/> :  <VisibilityOff/>}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </FormControl>

                    {/*           ////end eye*/}

                    {formik.touched.password2 && formik.errors.password2 &&
                        <div style={{color: "red"}}>{formik.errors.password2}</div>}



                    <Button className={s.btn} type={'submit'} variant={'contained'} color={'secondary'}>
                        Sign In
                    </Button>
                </form>
                <p> Don’t have an account?</p>
                <NavLink to={'/'}>Sign In</NavLink>
                <ErrorSnackbar/>

            </Paper>
        </div>

    )
};

// types
type FormikErrorType = {
    email?: string
    password?: string
    password2?: string

}

type StatePassword1 = {
    password: string;
    showPassword1: boolean;
}

type StatePassword2 = {
    password2: string;
    showPassword2: boolean;
}


export default Registration;