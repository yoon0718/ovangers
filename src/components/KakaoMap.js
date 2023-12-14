import React, { useEffect, useState } from "react";

const {kakao} = window;
function KakaoMap(props){
  const [chargerData,setChargerData] = useState([]);
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [mapCenter, setMapCenter] = useState("user");
  const [chargerDetail, setChargerDetail]=useState([]);

  const getChargerLocationData = async (bounds) =>{ // 충전소 정보 받기
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

  const getChargerData = async (bounds) =>{ // 충전기 정보 받기
    if (bounds != null) {
      let latStart = bounds.qa;
      let latEnd = bounds.pa;
      let lngStart = bounds.ha;
      let lngEnd = bounds.oa;
      let url = `http://10.10.21.64:8080/api/finds?lat_start=${latStart}&lat_end=${latEnd}&lng_start=${lngStart}&lng_end=${lngEnd}`;
      const request = await fetch(url);
      const response = await request.json();
      setChargerDetail(response);
    }
  }
    
  const createMap = () => {  //지도 생성
    let container = document.getElementById("map");
    let options = {
      center: new kakao.maps.LatLng(props.userLat, props.userLng),
      level: 3
    };
    let map = new kakao.maps.Map(container,options);
    setMap(map);
    let zoomControl = new kakao.maps.ZoomControl();
    let typeControl = new kakao.maps.MapTypeControl();
    map.addControl(typeControl, kakao.maps.ControlPosition.TOPRIGHT);
    map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);
    kakao.maps.event.addListener(map,"dragstart",()=>{markers.forEach(marker=>{marker.setMap(null)})});
    kakao.maps.event.addListener(map,"zoom_start",()=>{markers.forEach(marker=>{marker.setMap(null)})});
    kakao.maps.event.addListener(map,"idle",()=>{
      getChargerLocationData(map.getBounds());
      getChargerData(map.getBounds());
      setMapCenter("free");
    })
  }

  const createMarker = () => {  // 충전소 마커 및 인포윈도우 생성
    chargerData.forEach((chargerLoc) => {
      var marker = new kakao.maps.Marker({
        map:map, 
        position: new kakao.maps.LatLng(chargerLoc.lat, chargerLoc.lng),
        title:chargerLoc.statNm,
        clickable: true,
      });
      let chargerList = `<div class="chargerInfo" style="display:flex">
        <div class="chargerLocation">상세위치</div>
        <div class="chargerId">기기번호</div>
        <div class="chargerType">충전기 타입</div>
        <div class="chargerOutput">출력전압(kV)</div>
        <div class="chargerBtn"></div>
        </div>`
      let iwContent, iwPosition, iwRemoveable;
      chargerDetail.forEach(charger =>{
        if (charger.addr === chargerLoc.addr){
          chargerList += `<div class="chargerInfo" style="display:flex">
          <div class="chargerLocation">${charger.location}</div>
          <div class="chargerId">${charger.stchId}</div>
          <div class="chargerType">${charger.chgerType.type}</div>
          <div class="chargerOutput">${charger.output} kV</div>
          <div class="chargerBtn"><button type="button">고장신고</button></div>
          </div>`
        }
        iwContent =
        `<div class="wrap">
            <div class="info">
                <div class="title">
                    ${charger.statNm}
                    <div class="close" onclick="closeOverlay()" title="닫기"></div>
                </div>
                <div class="body">
                    <div class="desc">
                        <div class="ellipsis">${chargerLoc.addr}</div>
                        ${chargerList}
                        <div class="ellipsis">${charger.useTime}</div>
                        <div class="ellipsis">${charger.busiNm} ${charger.busiCall}</div>
                        <div class="ellipsis">${charger.limitDetail}</div>
                        <div class="ellipsis"><button type="button" onClick="{document.querySelector('#find_addr').value='${chargerLoc.addr}'}">길찾기</button></div>
                        <br>
                    </div>
                </div>
            </div>
        </div>`;
        iwPosition = new kakao.maps.LatLng(chargerLoc.lat, chargerLoc.lng);
        iwRemoveable = true;
      })
      let infowindow = new kakao.maps.InfoWindow({
        position: iwPosition,
        content: iwContent,
        removable: iwRemoveable,
      });
      kakao.maps.event.addListener(marker, "click", function () {
        infowindow.open(map, marker);
        marker.setMap(null);
        setPoint({ lat: marker.getPosition().Ma, lng: marker.getPosition().La }, "endPoint")
        setPoint({ lat: props.userLat, lng: props.userLng }, "startPoint")
      });

      markers.push(marker);
    })
  }

  if (markers.length > 0){ //마커 지우기
    markers.forEach((marker,idx) => {if (marker.Ad === false){markers.splice(idx,1)}})
  }

  if (map == null) {console.log("지도 로딩중")} // GeoLocation
  else if (!navigator.geolocation){console.log("현재 위치정보를 찾을 수 없습니다")}
  else {
    navigator.geolocation.getCurrentPosition((position) => {props.setUserLat(position.coords.latitude); props.setUserLng(position.coords.longitude);})
    var marker = new kakao.maps.Marker({ //내 위치 마커
      map:map,
      image: new kakao.maps.MarkerImage("https://static-00.iconduck.com/assets.00/map-marker-icon-342x512-gd1hf1rz.png",new kakao.maps.Size(29,42)),
      position: new kakao.maps.LatLng(props.userLat, props.userLng)
    }); 
    markers.push(marker)
    if(mapCenter === "user"){map.setCenter(new kakao.maps.LatLng(props.userLat,props.userLng))}
  }

  if (map != null && chargerData.length > 500){console.log(chargerData.length);console.log("충전소가 너무 많아요");} // 충전소 개수제한
  else if (map != null) {createMarker();}

  function setPoint({ lat, lng }, pointType) { // 길찾기 마커
    props.setPointObj((prev) => {
      if (props.pointObj.polyline != null){prev.polyline.setMap(null);}
      return { ...prev, [pointType]: { lat, lng } };
    });
  }

  function distance(lat1, lon1, lat2, lon2) {
    const R = 6371; // 지구 반지름 (단위: km)
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // 두 지점 간의 거리 (단위: km)
    return distance;
  }

  function deg2rad(deg) {
    return deg * (Math.PI / 180);
  }

  async function getCarDirection() {
    let REST_API_KEY = "<>";
    let url = "https://apis-navi.kakaomobility.com/v1/directions";

    let origin = `${props.pointObj.startPoint.lng},${props.pointObj.startPoint.lat}`;
    let destination = `${props.pointObj.endPoint.lng},${props.pointObj.endPoint.lat}`;

    let headers = {
      Authorization: `KakaoAK ${REST_API_KEY}`,
      "Content-Type": "application/json",
    };

    let queryParams = new URLSearchParams({
      origin: origin,
      destination: destination,
    });

    let requestUrl = `${url}?${queryParams}`;

    try {
      let response = await fetch(requestUrl, {
        method: "GET",
        headers: headers,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      let data = await response.json();
      let linePath = [];
      let lineLatLng = [];
      let linelength = 0;
      data.routes[0].sections[0].roads.forEach((router) => {
        router.vertexes.forEach((vertex, index) => {
          if (index % 2 === 0) {
            linePath.push(
              new kakao.maps.LatLng(
                router.vertexes[index + 1],
                router.vertexes[index]
              )
            );
            lineLatLng.push(router.vertexes[index + 1], router.vertexes[index]);
            if (lineLatLng.length === 4) {
              let dist = distance(
                lineLatLng[0],
                lineLatLng[1],
                lineLatLng[2],
                lineLatLng[3]
              );
              linelength = linelength + dist;
              lineLatLng = [];
            }
          }
        });
      });
      console.log(linelength * 2 + "KM", "최종길이");
      // 거리 계산 - 나중에 넣을 수 있으면 넣을 것

      var polyline = new kakao.maps.Polyline({
        path: linePath,
        strokeWeight: 5,
        strokeColor: "red",
        strokeOpacity: 0.5,
        strokeStyle: "solid",
      });
      if (map) {
        polyline.setMap(map);
        props.setPointObj({startPoint:props.pointObj.startPoint, endPoint:props.pointObj.endPoint ,polyline});
      } else {
        console.error("Map object is not available.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  if(props.findRoute){
    if (props.pointObj.polyline != null){props.pointObj.polyline.setMap(null);}
    markers.forEach(marker=>{marker.setMap(null)})
    getCarDirection();
    props.setFindRoute(false);
  }

  useEffect(()=>{
    createMap();
  },[])

  return(
    <div>
      <div id="map" style={{width:'100vw',height:'97vh', zIndex:0}}></div>
      <button type="button" onClick={()=>{setMapCenter("user");}}>현위치</button>
    </div>
  );
}



export default KakaoMap;