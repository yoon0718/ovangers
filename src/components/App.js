import { useEffect, useState } from 'react';
import '../css/App.css'
import Login_modal from './Login_modal';
import Sidebar from './Sidebar';
import Splashscreen from './Splashscreen'

function App(){
    const [loginSwitch,setLoginSwitch] = useState();

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
                <h3>ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ@@@@@</h3>
                <Sidebar setLoginSwitch={setLoginSwitch}/>
                <Login_modal loginSwitch={loginSwitch} setLoginSwitch={setLoginSwitch}/>
            </div>
        </div>
    )
}

export default App;