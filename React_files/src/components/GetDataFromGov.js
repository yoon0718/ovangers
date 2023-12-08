import React, { useEffect, useState } from "react";;

function GetDataFromGov(){
    const [chargerMap,setChargerMap] = useState();

    const getChargerMap = async () => {
        const myCode="Encoding 인증키 입력";
        const numOfRows="9999";
        let pageNo="28" //안전상 수동으로 바꿔서 하였다.
        let url = `http://apis.data.go.kr/B552584/EvCharger/getChargerInfo?serviceKey=${myCode}&numOfRows=${numOfRows}&pageNo=${pageNo}&dataType=JSON`;
        const request = await fetch(url)
        const response = await request.json();
        setChargerMap(response.items.item);
    }

    const sendDataToBack = async () => {
        const url="http://localhost:8080/test";
        const request = await fetch(url, {
            method:"Post",
            headers:{"Content-Type" : "application/json"},
            body:JSON.stringify(chargerMap)
        });
        const response = await request.text();
        alert(response)
    }

    let ready=""
    if (chargerMap != null){
        console.log(chargerMap);
        ready="준비됐습니다!"
    }

    useEffect(()=>{
        getChargerMap()
    },[])

    return (
        <div>
            <p>{ready}</p>
            <button onClick={() => {sendDataToBack()}}>전송하기</button>
        </div>
    );
}

export default GetDataFromGov