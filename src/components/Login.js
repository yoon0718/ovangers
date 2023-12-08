import React, { useEffect, useState } from "react";
import '../css/Login.css'

function Login() {
    const [login,setLogin] = useState();

    const receive_login = async () => {
        let userId = document.querySelector("#login_id").value
        let userPassword = document.querySelector("#login_password").value
        const url = `http://10.10.21.64:8080/api/login?userId=${userId}&userPassword=${userPassword}`;
        const ajax = await fetch(url,{method:"Post"});
        const response = await ajax.text();
        alert(response);
    }

    return(
        <div className="login_div">
            <form className="log_form">
                <h3>Log-In</h3>
                ID<input id="login_id" type="text" name="id" placeholder="아이디"></input>
                Password<input id="login_password" type="password" name="password" placeholder="비밀번호"></input>
                <br/>
                <button onClick={()=>{receive_login();}}>로그인</button>
                <div className="pwfind">
                    <a>회원가입</a>
                    <a>/</a>
                    <a>비밀번호 찾기</a>
                </div>
            </form>
        </div>
    )
}
export default Login;