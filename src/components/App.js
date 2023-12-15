import { useEffect, useState } from 'react';
import '../css/App.css'
import Login_modal from './Login_modal';
import Sidebar from './Sidebar';
import Splashscreen from './Splashscreen';
import Myaccount_modal from './Myaccount_modal';
import KakaoMap from './KakaoMap';
import ReportDetail from './ReportDetail';
import GateWay from './GateWay';
import { Routes, Route } from 'react-router-dom';

function App(){
    const [loginSwitch,setLoginSwitch] = useState();
    const [accountSwitch,setAccountSwitch] = useState();
    const [userLat,setUserLat] = useState(35.1587261);
    const [userLng,setUserLng] = useState(126.7959607);
    const [findRoute,setFindRoute] = useState(false);
    let [pointObj, setPointObj] = useState({
        startPoint: { lat: null, lng: null },
        endPoint: { lat: null, lng: null },
        polyline: null
      });

    useEffect(()=>{
        if(document.querySelector(".logo") != null){
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
                        <Sidebar userLat={userLat} userLng={userLng} pointObj={pointObj}
                            setLoginSwitch={setLoginSwitch}setAccountSwitch={setAccountSwitch} setFindRoute={setFindRoute} setPointObj={setPointObj}/>
                        <Login_modal loginSwitch={loginSwitch} setLoginSwitch={setLoginSwitch}/>
                        <Myaccount_modal accountSwitch={accountSwitch} setAccountSwitch={setAccountSwitch}/>
                        <KakaoMap userLat={userLat} userLng={userLng} pointObj={pointObj} findRoute={findRoute}
                            setUserLat={setUserLat} setUserLng={setUserLng} setPointObj={setPointObj} setFindRoute={setFindRoute}/>
                    </div>
                </div>
            }/>
            <Route path='/board' element={<ReportDetail/>}/>
            <Route path="/breakdown/:stchId/:sessionId" element={<GateWay/>}/>
        </Routes>
    )
} else{
    return (<ReportDetail/>)
    }
}
export default App;