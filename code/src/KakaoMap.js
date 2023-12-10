import React, { useEffect, useState } from "react";

const { kakao } = window;
function KakaoMap() {
  let [state, setState] = useState({
    center: { lat: 33.452613, lng: 126.570888 },
  });

  useEffect(() => {
    let container = document.getElementById("map");
    let options = {
      center: new kakao.maps.LatLng(state.center.lat, state.center.lng),
      level: 3,
    };
    let map = new kakao.maps.Map(container, options);

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
        infowindow.open(map, marker);
      });
      marker.setMap(map);
    }
  }, [state.center.lat, state.center.lng]);

  return (
    <div>
      <div id="map" style={{ width: "800px", height: "800px" }}></div>
    </div>
  );
}

export default KakaoMap;
