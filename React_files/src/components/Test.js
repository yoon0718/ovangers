import React from "react";

function Test(){
    const sendData = async () => {
        let url = "http://localhost:8080/test";
        const request = await fetch(url, {
            method:"Post",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({data:[{test:"1"},{test2:"2"},{test3:"test3"}]})
        })
        const response = await request.text();
        alert(response);
    }
    return (
    <div>
        <button onClick={()=>{sendData()}}>test 발송</button>
    </div>
    );
}   

export default Test