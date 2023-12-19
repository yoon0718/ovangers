import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function GateWay (){
    const {stchId,sessionId}=useParams();
    const [result,setResult]=useState();
    const [users,setUsers]=useState();

    const checkUser = async ()=>{
        let request = await fetch("http://10.10.21.64:8080/api/findUser?userId="+sessionId);
        let response = await request.json();
        setUsers(response);
    }

    const send = async function (){
        if (users.length > 0){
            let request = await fetch("http://10.10.21.64:8080/api/down/"+sessionId+"?stchId="+stchId, {method:"POST"});
            let response = await request.text()
            setResult(response)
            setTimeout(window.close,5000)
            setUsers(null);
        }
    }

    if (users != null){
        send()
    }
    
    useEffect(()=>{checkUser();},[])

    return (<div>{result}</div>);
}

export default GateWay;