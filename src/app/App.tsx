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
import {CheckEmail} from "../components/forgotPassword/CheckEmail";
import {RecoverPassword} from "../components/forgotPassword/RecoverPassword";
import {SetNewPassword} from "../components/enterNewPassword/SetNewPassword";
import {Packs} from "../components/packs/Packs";
import {PageNoSearch} from "../components/packs/PageNoSearch";
import {Cards} from "../components/cards/Cards";


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
        <div className="App">
            <Header/>
            <Routes>

                <Route path={'/'} element={<Login/>}/>
                <Route path={'/registration'} element={<Registration/>}/>
                <Route path={'/profile'} element={<Profile/>}/>
                <Route path={'/forgot'} element={<RecoverPassword/>}/>
                <Route path={'/check-email/:email'} element={<CheckEmail/>}/>
                <Route path={'/set-new-password/:token'} element={<SetNewPassword/>}/>
                {/*<Route path={'/set-new-password/'}>*/}
                {/*    <Route index element={<SetNewPassword/>}/>*/}
                {/*    <Route path={':token'} element={<SetNewPassword/>}/>*/}
                {/*</Route>*/}
                <Route path={'/packs'} element={<Packs/>}/>
                <Route path={'/cards/:packId'} element={<Cards/>}/>
                <Route path={'/no-search'} element={<PageNoSearch/>}/>


                {/*<Route path={'/*'} element={<NotFound/>}/>*/}

            </Routes>
        </div>
    );
}

export default App;
