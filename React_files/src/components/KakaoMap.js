import React, { useEffect } from "react";

const {kakao} = window;
function KakaoMap(){
    useEffect(()=>{
        let container = document.getElementById("map");
        let options = {
            center: new kakao.maps.LatLng(33.450701, 126.570667),
            level: 3
        };
        let map = new kakao.maps.Map(container,options);
        let zoomControl = new kakao.maps.ZoomControl();
        let typeControl = new kakao.maps.MapTypeControl();
        map.addControl(typeControl, kakao.maps.ControlPosition.TOPRIGHT);
        map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);
    })
    return(
        <div>
            <div id="map" style={{width:'500px',height:'400px'}}></div>
        </div>
    );
}

export default KakaoMap;