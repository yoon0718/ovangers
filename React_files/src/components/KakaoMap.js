import React, { useEffect, useState } from "react";

const {kakao} = window;
function KakaoMap(){
    const [lat, setLat] = useState(34.6785);
    const [lng, setLng] = useState(126.736);
    const [chargerData,setChargerData] = useState([]);
    const [map, setMapData] = useState();
    const [markers, setMarkers] = useState([]);
    const [mapCenter, setMapCenter] = useState("user");

    const getChargerData = async (bounds) =>{
        if (bounds != null) {
            let latStart = bounds.qa;
            let latEnd = bounds.pa;
            let lngStart = bounds.ha;
            let lngEnd = bounds.oa;
            let url = `http://10.10.21.64:8080/api/location?lat_start=${latStart}&lat_end=${latEnd}&lng_start=${lngStart}&lng_end=${lngEnd}`;
            const request = await fetch(url);
            const response = await request.json();
            setChargerData(response);
        }
    }
    
    const createMap = () => {
        let container = document.getElementById("map");
        let options = {
            center: new kakao.maps.LatLng(lat, lng),
            level: 3
        };
        let map = new kakao.maps.Map(container,options);
        setMapData(map);
        let zoomControl = new kakao.maps.ZoomControl();
        let typeControl = new kakao.maps.MapTypeControl();
        map.addControl(typeControl, kakao.maps.ControlPosition.TOPRIGHT);
        map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);
        kakao.maps.event.addListener(map,"dragstart",()=>{markers.forEach(marker=>{marker.setMap(null)})})
        kakao.maps.event.addListener(map,"idle",()=>{
            getChargerData(map.getBounds());
            setMapCenter("free");
        })
    }

    const createMarker = () => {
        chargerData.forEach((charger) => {
            var marker = new kakao.maps.Marker({map:map, position: new kakao.maps.LatLng(charger.lat, charger.lng)});
            markers.push(marker);
        })
    }

    if (markers.length > 0){
        markers.forEach((marker,idx) => {if (marker.Ad === false){markers.splice(idx,1)}})
    }

    if (map == null) {console.log("지도 로딩중")}
    else if (!navigator.geolocation){console.log("현재 위치정보를 찾을 수 없습니다")}
    else {
        navigator.geolocation.getCurrentPosition((position) => {setLat(position.coords.latitude);setLng(position.coords.longitude);})
        var marker = new kakao.maps.Marker({map:map, position: new kakao.maps.LatLng(lat, lng)});
        markers.push(marker)
        if(mapCenter === "user"){map.setCenter(new kakao.maps.LatLng(lat,lng))}
    }

    useEffect(()=>{createMap();},[])

    if (map != null && chargerData.length > 700){console.log("충전소가 너무 많아요");}
    else if (map != null) {createMarker();}
    return(
        <div>
            <div id="map" style={{width:'100vw',height:'97vh'}}></div>
            <button type="button" onClick={()=>{setMapCenter("user");}}>내 위치로</button>
        </div>
    );
}

export default KakaoMap;