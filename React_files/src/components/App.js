import { useEffect, useState } from 'react';
import '../css/App.css'
import Login_modal from './Login_modal';
import Sidebar from './Sidebar';
import Splashscreen from './Splashscreen';
import Myaccount_modal from './Myaccount_modal';
import KakaoMap from './KakaoMap';

function App(){
    const [loginSwitch,setLoginSwitch] = useState();
    const [accountSwitch,setAccountSwitch] = useState();
    const [userLat,setUserLat] = useState(35.1587261);
    const [userLng,setUserLng] = useState(126.7959607);
    let [pointObj, setPointObj] = useState({
        startPoint: { marker: null, lat: null, lng: null },
        endPoint: { marker: null, lat: null, lng: null },
        polyline: null
      });
    const [findRoute,setFindRoute] = useState(false);

    useEffect(()=>{
        setTimeout(()=>{
            document.querySelector(".logo").style.opacity = "0";
        },1500);
        setTimeout(()=>{
            document.querySelector(".splash").style.display = "none";
        },3000);
    },[]);
    return(
        <div>
            <div className='splash'>
                <Splashscreen/>
            </div>
            <div>
                <Sidebar userLat={userLat} userLng={userLng} setFindRoute={setFindRoute} setLoginSwitch={setLoginSwitch} setAccountSwitch={setAccountSwitch}/>
                <Login_modal loginSwitch={loginSwitch} setLoginSwitch={setLoginSwitch}/>
                <Myaccount_modal accountSwitch={accountSwitch} setAccountSwitch={setAccountSwitch}/>
                <KakaoMap userLat={userLat} userLng={userLng} pointObj={pointObj}
                    setUserLat={setUserLat} setUserLng={setUserLng} setPointObj={setPointObj}/>
            </div>
        </div>
    )
}

export default App;