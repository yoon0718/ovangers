// import { Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import '../css/App.css'
import Login_modal from './Login_modal';
import Sidebar from './Sidebar';

function App(){
    const [loginSwitch,setLoginSwitch] = useState();
    return(
        <div>
            <Sidebar setLoginSwitch={setLoginSwitch}/>
            <Login_modal loginSwitch={loginSwitch} setLoginSwitch={setLoginSwitch}/>
        </div>
    )
}

export default App;