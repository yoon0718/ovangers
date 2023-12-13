import { useEffect, useState } from 'react';
import '../css/App.css'
import Login_modal from './Login_modal';
import Sidebar from './Sidebar';
import Splashscreen from './Splashscreen';
import Myaccount_modal from './Myaccount_modal';
import KakaoMap from './KakaoMap';
import ReportDetail from './ReportDetail';
import { Routes, Route } from 'react-router-dom';

function App(){
    const [loginSwitch,setLoginSwitch] = useState();
    const [accountSwitch,setAccountSwitch] = useState();
    const [userLat,setUserLat] = useState(34.452613);
    const [userLng,setUserLng] = useState(126.570888);

    useEffect(()=>{
        if(window.sessionStorage.managerCheck != "Y"){
            setTimeout(()=>{
                document.querySelector(".logo").style.opacity = "0";
            },1500);
            setTimeout(()=>{
                document.querySelector(".splash").style.display = "none";
            },3000);
        }
    },[]);
    
    if(window.sessionStorage.managerCheck != "Y"){
    return(
        <Routes>
            <Route path="/" element={
                <div>
                    <div className='main_map_page'>
                        <div className='splash'>
                            <Splashscreen/>
                        </div>
                        <Sidebar userLat={userLat} userLng={userLng} setLoginSwitch={setLoginSwitch} setAccountSwitch={setAccountSwitch}/>
                        <Login_modal loginSwitch={loginSwitch} setLoginSwitch={setLoginSwitch}/>
                        <Myaccount_modal accountSwitch={accountSwitch} setAccountSwitch={setAccountSwitch}/>
                        <KakaoMap userLat={userLat} userLng={userLng} setUserLat={setUserLat} setUserLng={setUserLng}/>
                    </div>
                </div>
            }/>
            <Route path='/board' element={<ReportDetail/>}/>
        </Routes>
    )
} else{
    return (<ReportDetail/>)
    }
}
export default App;