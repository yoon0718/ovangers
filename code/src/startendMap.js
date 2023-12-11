import React, { useEffect, useState } from "react";

const { kakao } = window;
function KakaoMaps() {
  let [state, setState] = useState({
    center: { lat: 33.45259497247464, lng: 126.5703883539088 },
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
    let newMap = new kakao.maps.Map(container, options);
    setMap(newMap);
    for (const point in pointObj) {
      if (pointObj[point].marker) {
        pointObj[point].marker.setMap(newMap);
      }
    }
  }, [pointObj]);

  function setPoint({ lat, lng }, pointType) {
    let marker = new kakao.maps.Marker({
      position: new kakao.maps.LatLng(lat, lng),
    });
    setPointObj((prev) => {
      if (pointObj[pointType].marker !== null) {
        prev[pointType].marker.setMap(null);
      }
      return { ...prev, [pointType]: { marker, lat, lng } };
    });
  }
  // function distance(lat1, lon1, lat2, lon2) {
  //   const R = 6371; // 지구 반지름 (단위: km)
  //   const dLat = deg2rad(lat2 - lat1);
  //   const dLon = deg2rad(lon2 - lon1);
  //   const a =
  //     Math.sin(dLat / 2) * Math.sin(dLat / 2) +
  //     Math.cos(deg2rad(lat1)) *
  //       Math.cos(deg2rad(lat2)) *
  //       Math.sin(dLon / 2) *
  //       Math.sin(dLon / 2);
  //   const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  //   const distance = R * c; // 두 지점 간의 거리 (단위: km)
  //   return distance;
  // }
  // function deg2rad(deg) {
  //   return deg * (Math.PI / 180);
  // }
  async function getCarDirection() {
    let REST_API_KEY = "본인꺼";
    let url = "https://apis-navi.kakaomobility.com/v1/directions";

    let origin = `${pointObj.startPoint.lng},${pointObj.startPoint.lat}`;
    let destination = `${pointObj.endPoint.lng},${pointObj.endPoint.lat}`;

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
      console.log(data);
      let linePath = [];
      data.routes[0].sections[0].roads.forEach((router) => {
        router.vertexes.forEach((vertex, index) => {
          if (index % 2 === 0) {
            linePath.push(
              new kakao.maps.LatLng(
                router.vertexes[index + 1],
                router.vertexes[index]
              )
            );
            console.log("1", router.vertexes[index + 1]);
            console.log("2", router.vertexes[index]);
          }
        });
      });

      console.log(linePath);
      var polyline = new kakao.maps.Polyline({
        path: linePath,
        strokeWeight: 5,
        strokeColor: "red",
        strokeOpacity: 0.5,
        strokeStyle: "solid",
      });
      if (map) {
        polyline.setMap(map);
        console.log(polyline);
      } else {
        console.error("Map object is not available.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }
  return (
    <div>
      <div id="map" style={{ width: "800px", height: "800px" }}></div>
      <div style={{ display: "flex", gap: "10px" }}>
        <button
          onClick={() =>
            setPoint({ lat: 36.18420278, lng: 127.1009111 }, "startPoint")
          }
        >
          출발지 지정
        </button>
        <button
          onClick={() =>
            setPoint({ lat: 35.13995836, lng: 126.793668 }, "endPoint")
          }
        >
          목적지 설정
        </button>
        <button onClick={() => getCarDirection()}>위치찾기</button>
      </div>
    </div>
  );
}

export default KakaoMaps;
