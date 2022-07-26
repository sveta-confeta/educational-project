import React from 'react';
import {useFormik} from "formik";
import {loginTC} from "../../bll/authReducer";
import {Navigate, NavLink} from "react-router-dom";
import s from "../login/Login.module.css";
import {
    Button,
    Checkbox,
    FormControl,
    FormControlLabel,
    IconButton,
    Input,
    InputAdornment,
    InputLabel,
    Paper,
    TextField
} from "@mui/material";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import {useAppDispatch} from "../../bll/state";

const Registration = () => {
    const dispatch = useAppDispatch();

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

    // if (isLoggedIn) {
    //     return <Navigate to={'/profile'}/>
    // }

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
                    {formik.touched.password && formik.errors.password &&
                        <div style={{color: "red"}}>{formik.errors.password}</div>}

                    {/*//2eye-password*/}
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



                    <Button className={s.btn} type={'submit'} variant={'contained'} color={'secondary'}>
                        Sign In
                    </Button>
                </form>
                <p> Don’t have an account?</p>
                <NavLink to={'/'}>Sign In</NavLink>
                {/*<ErrorSnackbar/>*/}



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


export default Registration;