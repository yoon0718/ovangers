import React, { useEffect, useState } from "react";

const {kakao} = window;
function KakaoMap(){
    const [lat, setLat] = useState(34.6785);
    const [lng, setLng] = useState(126.736);
    const [chargerData,setChargerData] = useState([]);
    const [map, setMap] = useState();
    
    const getChargerData = async (latStart,latEnd,lngStart,lngEnd) =>{
        let url = `http://10.10.21.64:8080/api/location?lat_start=${latStart}&lat_end=${latEnd}&lng_start=${lngStart}&lng_end=${lngEnd}`;
        const request = await fetch(url);
        const response = await request.json();
        setChargerData(response);
    }

    const createMap = async () => {
        let container = document.getElementById("map");
        let options = {
            center: new kakao.maps.LatLng(lat, lng),
            level: 3
        };
        let map = new kakao.maps.Map(container,options);
        setMap(map);
        let zoomControl = new kakao.maps.ZoomControl();
        let typeControl = new kakao.maps.MapTypeControl();
        map.addControl(typeControl, kakao.maps.ControlPosition.TOPRIGHT);
        map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);
    }

    const createMarker = () => {
        let bounds = map.getBounds();
        chargerData.forEach((item) => {
            let marker = new kakao.maps.Marker({map:map,position: new kakao.maps.LatLng(item.lat, item.lng)});
        })
        kakao.maps.event.addListener(map,"bounds_changed",()=>{getChargerData(bounds.qa,bounds.pa,bounds.ha,bounds.oa);});
    }

    useEffect(()=>{
        createMap();
        if (map != null){createMarker()};
    },[])

    

    console.log(chargerData);
    return(
        <div>
            <div id="map" style={{width:'100vw',height:'97vh'}}></div>
        </div>
    );
}

export default KakaoMap;