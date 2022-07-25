import React from 'react';
import './App.css';
import {Routes} from 'react-router-dom';
import {Route} from 'react-router-dom';
import {Login} from "../components/login/Login";
import {Profile} from "../components/Profile/Profile";
import {Header} from "../components/header/Header";



function App() {
  return (
    <div className="App">
        <Header/>
<Routes>

    <Route path={'/'} element={<Login/>}/>
    <Route path={'/profile'} element={<Profile/>}/>

    {/*<Route path={'Registration/'} element={<Registration/>}/>*/}
    {/*<Route path={'/*'} element={<NotFound/>}/>*/}

</Routes>
    </div>
  );
}

export default App;
