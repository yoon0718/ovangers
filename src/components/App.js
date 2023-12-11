import { useEffect, useState } from 'react';
import '../css/App.css'
import Login_modal from './Login_modal';
import Sidebar from './Sidebar';
import Splashscreen from './Splashscreen';
import Myaccount_modal from './Myaccount_modal';

function App(){
    const [loginSwitch,setLoginSwitch] = useState();
    const [accountSwitch,setAccountSwitch] = useState();

    useEffect(()=>{
        const fadeout = setTimeout(()=>{
            document.querySelector(".logo").style.opacity = "0";
        },1500);
        const hide = setTimeout(()=>{
            document.querySelector(".splash").style.display = "none";
        },3000);
    },[]);
    return(
        <div>
            <div className='splash'>
                <Splashscreen/>
            </div>
            <div>
                <Sidebar setLoginSwitch={setLoginSwitch} setAccountSwitch={setAccountSwitch}/>
                <Login_modal loginSwitch={loginSwitch} setLoginSwitch={setLoginSwitch}/>
                <Myaccount_modal accountSwitch={accountSwitch} setAccountSwitch={setAccountSwitch}/>
            </div>
        </div>
    )
}

export default App;