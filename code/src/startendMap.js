import React, { useEffect, useState } from "react";

const { kakao } = window;
function KakaoMaps() {
  let [state, setState] = useState({
    center: { lat: 33.452613, lng: 126.570888 },
  });

  let [map, setMap] = useState(null);
  let [pointObj, setPointObj] = useState({
    startPoint: { marker: null, lat: null, lng: null },
    endPoint: { marker: null, lat: null, lng: null },
  });

  useEffect(() => {
    let container = document.getElementById("map");
    let options = {
      center: new kakao.maps.LatLng(state.center.lat, state.center.lng),
      level: 3,
    };
    let map = new kakao.maps.Map(container, options);
    for (const point in pointObj) {
      if (pointObj[point].marker) {
        pointObj[point].marker.setMap(map);
      }
    }
  }, [pointObj]);

  function setPoint({ lat, lng }, pointType) {
    let marker = new kakao.maps.Marker({
      position: new kakao.maps.LatLng(lat, lng),
    });
    setPointObj((prev) => {
      if (pointObj[pointType].marker !== null) {
        // 주소가 변경되었을 때 기존 marker를 제거
        prev[pointType].marker.setMap(null);
      }
      return { ...prev, [pointType]: { marker, lat, lng } };
    });
  }
  return (
    <div>
      <div id="map" style={{ width: "800px", height: "800px" }}></div>
      <div style={{ display: "flex", gap: "10px" }}>
        <button
          onClick={() =>
            setPoint({ lat: 33.452613, lng: 126.570888 }, "startPoint")
          }
        >
          출발지1 지정
        </button>
        <button
          onClick={() =>
            setPoint({ lat: 33.45058, lng: 126.574942 }, "endPoint")
          }
        >
          목적지1 설정
        </button>
      </div>
    </div>
  );
}

export default KakaoMaps;
