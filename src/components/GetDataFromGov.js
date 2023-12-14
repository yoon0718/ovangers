import React from "react";;

function GetDataFromGov(){
    const getChargerMap = async () => {
        const myCode="dy0D%2B1eeKCxwp1F%2B6l9liNsKm5i6Ng3AVU8Vn77lSce4ux8booeqJaqr8wEm9Jvhgl0Ul0jnStjsEnTTFqIFYg%3D%3D";
        const numOfRows="9999";
        for (let i=28; i < 29 ; i++){
            let url = `http://apis.data.go.kr/B552584/EvCharger/getChargerInfo?serviceKey=${myCode}&numOfRows=${numOfRows}&pageNo=${i}&dataType=JSON`;
            const request = await fetch(url)
            const response = await request.json();
            const result = await response.items.item;
            const url2="http://localhost:8080/test";
            const request2 = await fetch(url2, {
                method:"Post",
                headers:{"Content-Type" : "application/json"},
                body:JSON.stringify(result)
            });
            const response2 = await request2.text();
            console.log(i+response2);
        }
    }

    return (
        <div>
            <button onClick={() => {getChargerMap()}}>전송하기</button>
        </div>
    );
}

export default GetDataFromGov