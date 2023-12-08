import React, { useEffect, useState } from "react";

function Test2(){
    const [hell,setHell] = useState(); // [변수,변수의 값을 바꾸기 위한 함수] = useState();

    const hello = async () => {
        const url = "http://localhost/test";
        const ajax = await fetch(url);
        const response = await ajax.text();
        setHell(response);
    }

    useEffect(()=>{
        hello();
        },[hell]
    )

    let liste=[
        <div>
            <h4>hi</h4>
        </div>,
        <div>
            <h4>hi</h4>
        </div>,
        <div>
            <h4>hi</h4>
        </div>
    ]

    return(
        <div>
            {/* <button onClick={()=>{this.hello();}}/> */}
            <div id="hello">{hell}</div>
            {liste}
        </div>
    )
}
export default Test2;
