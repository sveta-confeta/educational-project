import React from 'react';
import {useFormik} from "formik";
import {
    Button,
    Checkbox,
    FormControl,
    FormControlLabel, FormGroup, Grid,
    Paper, TextField
} from "@mui/material";
import {NavLink, Navigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../bll/state";
import s from './Login.module.css'
import {loginTC} from "../../bll/authReducer";

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
        },
    })

    // const [valuesPassword, setValuesPassword] = React.useState<StatePassword>({
    //     // password: '',
    //     // showPassword: false,
    // });

    const handleClickShowPassword = () => {
        //setValuesPassword({
        // ...valuesPassword,
        // showPassword: !valuesPassword.showPassword,
        // });
    };

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
                    <FormControl>
                        <FormGroup>
                            <TextField label="Email"
                                       color="secondary"
                                       margin="normal" {...formik.getFieldProps('email')} />

                            {formik.touched.email && formik.errors.email &&
                                <div style={{color: "red"}}>{formik.errors.email}</div>}

                            <TextField type="password"
                                       color="secondary"
                                       label="Password" {...formik.getFieldProps('password')}
                                       margin="normal"
                            />
                            {formik.touched.password && formik.errors.password &&
                                <div style={{color: "red"}}>{formik.errors.password}</div>}


                            <FormControlLabel label={'Remember me'}
                                              control={<Checkbox color="secondary"
                                                                 {...formik.getFieldProps('rememberMe')}
                                                                 checked={formik.values.rememberMe}/> //благодаря этой строке чекбокс тоже сбрасывается
                                              }/>

                            <NavLink className={s.textLink} to={'/recover-password'}>Forgot Password</NavLink>

                            <Button type={'submit'} variant={'contained'} color={'primary'}>
                                Sign In
                            </Button>
                            <p> Don’t have an account?</p>
                            <NavLink to={'/register'}>Sign Up</NavLink>
                            {/*<ErrorSnackbar/>*/}
                        </FormGroup>
                    </FormControl>
                </form>
            </Paper>
        </div>

//
//
//                     <Input
//                         id="password"
//                         // type={valuesPassword.showPassword ? 'text' : 'password'}
//                         placeholder={'Password'}
//                         className={s.input}
//                         color="secondary"
//                         {...formik.getFieldProps('password')}
//                         autoComplete="on"
//                         endAdornment={
//                             <InputAdornment position="end">
//                                 <IconButton
//                                     onClick={handleClickShowPassword}
//                                     onMouseDown={handleMouseDownPassword}
//                                 >
//                                     {/*{valuesPassword.showPassword ? <VisibilityOff/> : <Visibility/>}*/}
//                                 </IconButton>
//                             </InputAdornment>
//                         }
//                     />
//                 </FormControl>
//                 {formik.errors.password && formik.touched.password &&
//                     // <div className={error.error}>{formik.errors.password}</div>
//                 ''}
//
//                 <FormControlLabel label={'Remember me'}
//                                   control={<Checkbox color="secondary"
//                                                      checked={formik.values.rememberMe}
//                                                      {...formik.getFieldProps('rememberMe')}
//                                   />
//                                   }/>
//                 <NavLink className={s.textLink} to={'/recover-password'}>Forgot Password</NavLink>
//                 <Button color="secondary" variant={'contained'} type="submit">Login</Button>
//                 Don’t have an account?
//                 <NavLink to={'/register'}>Sign Up</NavLink>
//             </form>
//         </div>
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
