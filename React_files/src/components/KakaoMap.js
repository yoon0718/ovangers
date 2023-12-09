import React, { useEffect, useRef, useState } from "react";

const {kakao} = window;
function KakaoMap(){
    const [lat, setLat] = useState(34.6785);
    const [lng, setLng] = useState(126.736);
    const [chargerData,setChargerData] = useState([]);
    const [map, setMapData] = useState();
    const [markers, setMarker] = useState([]);
    
    const getChargerData = async (bounds) =>{
        if (bounds != null) {
            let latStart = bounds.qa;
            let latEnd = bounds.pa;
            let lngStart = bounds.ha;
            let lngEnd = bounds.oa;
            let url = `http://10.10.21.64:8080/api/location?lat_start=${latStart}&lat_end=${latEnd}&lng_start=${lngStart}&lng_end=${lngEnd}`;
            const request = await fetch(url);
            const response = await request.json();
            if (chargerData !== response){
                setChargerData(response);
            }
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
        kakao.maps.event.addListener(map,"tilesloaded",() => {getChargerData(map.getBounds())})
        kakao.maps.event.addListener(map,"dragstart",()=>{markers.forEach(marker=>{marker.setMap(null);})})
    }

    const createMarker = () => {
        chargerData.forEach((charger) => {
            var marker = new kakao.maps.Marker({position: new kakao.maps.LatLng(charger.lat, charger.lng)});
            markers.push(marker);
        })
        markers.forEach((marker)=>{marker.setMap(map)})
    }

    useEffect(()=>{createMap()},[])

    if (map != null){
        if(chargerData.length > 700){
            console.log("충전소가 너무 많아요")
        } else{
            createMarker();
        }
    }

    return(
        <div>
            <div id="map" style={{width:'100vw',height:'97vh'}}></div>
        </div>
    );
}

export default KakaoMap;