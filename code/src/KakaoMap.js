import React, { useEffect, useState } from "react";

const { kakao } = window;
function KakaoMap() {
  let [state, setState] = useState({
    center: { lat: 33.452613, lng: 126.570888 },
  });
  let [map, setMap] = useState(null);

  useEffect(() => {
    let container = document.getElementById("map");
    let options = {
      center: new kakao.maps.LatLng(state.center.lat, state.center.lng),
      level: 3,
    };
    let newMap = new kakao.maps.Map(container, options);
    setMap(newMap);
    let positions = [
      {
        title: "카카오",
        latlng: new kakao.maps.LatLng(33.450705, 126.570677),
      },
      {
        title: "생태연못",
        latlng: new kakao.maps.LatLng(33.450936, 126.569477),
      },
      {
        title: "텃밭",
        latlng: new kakao.maps.LatLng(33.450879, 126.56994),
      },
      {
        title: "근린공원",
        latlng: new kakao.maps.LatLng(33.451393, 126.570738),
      },
    ];
    // // 선을 구성하는 좌표 배열입니다. 이 좌표들을 이어서 선을 표시합니다
    // var linePath1 = [
    //   new kakao.maps.LatLng(33.452344169439975, 126.56878163224233),
    //   new kakao.maps.LatLng(33.452739313807456, 126.5709308145358),
    //   new kakao.maps.LatLng(33.45178067090639, 126.5726886938753),
    // ];

    // // 지도에 표시할 선을 생성합니다
    // var polyline = new kakao.maps.Polyline({
    //   path: linePath1, // 선을 구성하는 좌표배열 입니다
    //   strokeWeight: 5, // 선의 두께 입니다
    //   strokeColor: "#FFAE00", // 선의 색깔입니다
    //   strokeOpacity: 0.7, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
    //   strokeStyle: "solid", // 선의 스타일입니다
    // });

    // // 지도에 선을 표시합니다
    // polyline.setMap(map);

    for (var i = 0; i < positions.length; i++) {
      // 마커를 생성
      let marker = new kakao.maps.Marker({
        map: map, // 마커를 표시할 지도
        position: positions[i].latlng, // 마커를 표시할 위치
        title: positions[i].title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시
        clickable: true,
      });
      let iwContent =
          '<div class="wrap" style="color:red;">' +
          '    <div class="info">' +
          '        <div class="title">' +
          "            카카오 스페이스닷원" +
          '            <div class="close" onclick="closeOverlay()" title="닫기"></div>' +
          "        </div>" +
          '        <div class="body">' +
          '            <div class="desc">' +
          '                <div class="ellipsis">제주특별자치도 제주시 첨단로 242</div>' +
          '                <div class="jibun ellipsis">(우) 63309 (지번) 영평동 2181</div>' +
          "                <br>" +
          "            </div>" +
          "        </div>" +
          "    </div>" +
          "</div>",
        iwPosition = positions[i].latlng,
        iwRemoveable = true; //인포윈도우 표시 위치
      // 인포윈도우를 생성
      let infowindow = new kakao.maps.InfoWindow({
        position: iwPosition,
        content: iwContent,
        removable: iwRemoveable,
      });
      // 마커에 클릭이벤트를 등록합니다
      kakao.maps.event.addListener(marker, "click", function () {
        // 마커 위에 인포윈도우를 표시합니다
        infowindow.open(newMap, marker);
      });
      marker.setMap(newMap);
    }
  }, [state.center.lat, state.center.lng]);
  function test() {
    // 선을 구성하는 좌표 배열입니다. 이 좌표들을 이어서 선을 표시합니다
    var linePath1 = [
      new kakao.maps.LatLng(33.452344169439975, 126.56878163224233),
      new kakao.maps.LatLng(33.452739313807456, 126.5709308145358),
      new kakao.maps.LatLng(33.45178067090639, 126.5726886938753),
    ];
    // 지도에 표시할 선을 생성합니다
    var polyline = new kakao.maps.Polyline({
      path: linePath1, // 선을 구성하는 좌표배열 입니다
      strokeWeight: 5, // 선의 두께 입니다
      strokeColor: "#FFAE00", // 선의 색깔입니다
      strokeOpacity: 0.7, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
      strokeStyle: "solid", // 선의 스타일입니다
    });

    // 지도에 선을 표시합니다
    polyline.setMap(map);
  }
  return (
    <div>
      <div id="map" style={{ width: "800px", height: "800px" }}></div>
      <button onClick={() => test()}>이간 된다고..?</button>
    </div>
  );
}

export default KakaoMap;
