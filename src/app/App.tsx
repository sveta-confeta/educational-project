import React, {useEffect} from 'react';
import './App.css';
import {Routes} from 'react-router-dom';
import {Route} from 'react-router-dom';
import {Login} from "../components/login/Login";
import {Profile} from "../components/Profile/Profile";
import {Header} from "../components/header/Header";
import Registration from "../components/registration/Registration";
import {initializeTC} from "../bll/authReducer";
import {useAppDispatch, useAppSelector} from "../bll/state";
import {Preloader} from "../common/loader/Loader";


function App() {
    const dispatch = useAppDispatch();
    const initialize = useAppSelector(state => state.auth.isInitialized)

    useEffect(() => {
        dispatch(initializeTC())
    }, [])
    if (!initialize) {
        return (
            <Preloader/>
        )

    }
    return (
        <div>profile</div>
    )
    return (
        <div className="App">
            <Header/>
            <Routes>

                <Route path={'/'} element={<Login/>}/>
                <Route path={'/registration'} element={<Registration/>}/>
                <Route path={'/profile'} element={<Profile/>}/>


                {/*<Route path={'/*'} element={<NotFound/>}/>*/}

            </Routes>
        </div>
    );
}

export default App;
