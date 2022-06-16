import React from 'react';
import './App.css';
import {Routes} from 'react-router-dom';
import Profile from "./Profile/Profile";
import Login from "../../n2-features/f1-auth/a1-login/Login";
import {Route} from 'react-router-dom';
import Registration from "../../n2-features/f1-auth/a2-registration/Registration";
import NotFound from "../../n2-features/f2-404/NotFound";
import RecoveryParol from "../../n2-features/f1-auth/a3-recovery parol/RecoveryParol";
import EnterParol from "../../n2-features/f1-auth/a4-enter parol/EnterParol";


function App() {
  return (
    <div className="App">
<Routes>
    <Route path={'Profile/'} element={<Profile/>}/>
    <Route path={'Login/'} element={<Login/>}/>
    <Route path={'Registration/'} element={<Registration/>}/>
    <Route path={'RecoveryParol/'} element={<RecoveryParol/>}/>
    <Route path={'EnterParol/'} element={<EnterParol/>}/>
    <Route path={'/*'} element={<NotFound/>}/>

</Routes>
    </div>
  );
}

export default App;
