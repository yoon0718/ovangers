import '../css/Signup.css'
import React, { useState } from "react";
function SignUp() {
    const send_signup = async () => {
        let userId = document.querySelector("#sign_id").value
        let userPassword = document.querySelector("#sign_pw").value
        let userEmail = document.querySelector("#sign_email").value
        let userNickname = document.querySelector("#sign_nickname").value
        let userTelephone = document.querySelector("#sign_phone").value

        const url = `http://10.10.21.64:8080/api/account?userId=${userId}&userPassword=${userPassword}&userEmail=${userEmail}`
                    +`&userNickname=${userNickname}&userTelephone=${userTelephone}`;   // 주소 설정
        const ajax = await fetch(url,{method:"Post"}); // ajax에 동기적으로 작동하는 함수의 리턴값을 저장
        const response = await ajax.text(); // ajax에 있는 응답 내용을 json 형식으로 파싱(해석) 하는 메소드 실행하여 값을 response에 저장
                                            // 요청 후 지연시간동안 데이터가 오지 않으면 Promise형식으로 보여줘버린다.
                                            // 응답형식은 응답된 내용에 따라 json, text 등의 형식이 있다. 그것에 맞춰 메소드를 주어야 한다.
        alert(response);                // 해석한 내용을 setsignup을 통해 signUp에 저장한다.
    }


    return(
        <div className="sign_div">
            <form className="sign_form">
                <label>ID</label>
                <input id='sign_id' type="text" name="id" placeholder="아이디"></input>
                <label>Password</label>
                <input id='sign_pw' type="password" name="password" placeholder="비밀번호"></input>
                <label>Email</label>
                <input id='sign_email' type="text" name="email" placeholder="aaa@aaa.com"></input>
                <label>NickName</label>
                <input id='sign_nickname' type='text' name="nickname" placeholder='ex)박xx'></input>
                <label>Phone Number</label>
                <input id='sign_phone' type="text" name="phone" placeholder="010-xxxx-xxxx"></input>

                <input type="submit" value="제출" onClick={(e) => {e.preventDefault();  send_signup();}}></input>
            </form>
        </div>
    )
}
export default SignUp;