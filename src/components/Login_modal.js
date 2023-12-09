import ReactModal from "react-modal";
import { useState } from "react";
import '../css/Login_modal.css';
import Signup_Modal from "./Signup_modal";

function Login_modal(props){
    const [signupSwitch,setSignUpSwitch] = useState();
    const [session,setSesson] = useState([]);

    const modal_style = {
        overlay: {
          backgroundColor: " rgba(0, 0, 0, 0.4)",
          width: "100%",
          height: "100%",
          position: "fixed",
          top: "0",
          left: "0",          
        },
        content: {
          width: "25vw",
          height: "50vh",
          zIndex: "150",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          borderRadius: "10px",
          boxShadow: "2px 2px 2px rgba(0, 0, 0, 0.25)",
          backgroundColor: "white",
          justifyContent: "center",
          overflow: "hidden",

        },
      };
      //로그인 구현
    // const receive_login = async () => {
    //     let userId = document.querySelector("#login_id").value
    //     let userPassword = document.querySelector("#login_password").value
    //     const url = `http://10.10.21.64:8080/api/login?userId=${userId}&userPassword=${userPassword}`;
    //     const ajax = await fetch(url,{method:"Post"});
    //     const response = await ajax.json();
    //     alert(response);
    // }

    //로그인 세션
    const login_session = async () => {
        let userId = document.querySelector("#login_id").value
        let userPassword = document.querySelector("#login_password").value
        let url = `http://10.10.21.64:8080/api/login?userId=${userId}&userPassword=${userPassword}`;
        const ajax = await fetch(url,{method:"Post"});
        const response = await ajax.json();

        if(response.length >0 ){
        setSesson(response[0])
        window.sessionStorage.setItem("userId", response[0].userId);
        window.sessionStorage.setItem("userPassword", response[0].userPassword);
        window.sessionStorage.setItem("userEmail", response[0].userEmail);
        window.sessionStorage.setItem("userTelephone", response[0].userTelephone);
        window.sessionStorage.setItem("userNickname", response[0].userNickname);
        window.sessionStorage.setItem("userPoint", response[0].userPoint);
        window.sessionStorage.setItem("managerCheck", response[0].managerCheck);
        } else{
            alert("일치정보없음")
        }
    }
    return(
        <ReactModal isOpen={props.loginSwitch} onRequestClose={() => props.setLoginSwitch(false)} style={modal_style} ariaHideApp={false} >
            <div className="login_div">
                <form className="log_form">
                    <h3>Log-In</h3>
                    ID<input id="login_id" type="text" name="id" placeholder="아이디"></input>
                    Password<input id="login_password" type="password" name="password" placeholder="비밀번호"></input>
                    <br/>
                    <a className="login_button" onClick={()=>{login_session();}}>로그인</a>
                    <div className="pwfind">
                        <a className="signup" onClick={()=>{setSignUpSwitch(true);}}>회원가입</a>
                        <a>/</a>
                        <a>비밀번호 찾기</a>
                    </div>
                </form>
 
            </div>
            <Signup_Modal signupSwitch={signupSwitch} setSignUpSwitch={setSignUpSwitch}/>
        </ReactModal>
    )
}
export default Login_modal;