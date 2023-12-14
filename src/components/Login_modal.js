import ReactModal from "react-modal";
import { useState } from "react";
import '../css/Login_modal.css';
import Signup_Modal from "./Signup_modal";
import Findpw_modal from "./Findpw_modal";

function Login_modal(props){
    const [signupSwitch,setSignUpSwitch] = useState();
    const [findpwSwitch,setFindPwSwitch] = useState();
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


    //로그인 세션
    const login_session = async () => {
        let userId = document.querySelector("#login_id").value
        let userPassword = document.querySelector("#login_password").value
        let url = `http://10.10.21.64:8080/api/login?userId=${userId}&userPassword=${userPassword}`;
        const ajax = await fetch(url,{method:"Post"});
        const response = await ajax.json();

        if(response.length >0){
        setSesson(response[0])
        window.sessionStorage.setItem("userId", response[0].userId);
        window.sessionStorage.setItem("userPassword", response[0].userPassword);
        window.sessionStorage.setItem("userEmail", response[0].userEmail);
        window.sessionStorage.setItem("userTelephone", response[0].userTelephone);
        window.sessionStorage.setItem("userNickname", response[0].userNickname);
        window.sessionStorage.setItem("userPoint", response[0].userPoint);
        window.sessionStorage.setItem("managerCheck", response[0].managerCheck);
            alert("로그인 완료")
        props.setLoginSwitch(false);
        } else{
            alert("일치정보없음")
        }
    }
    return(
        <ReactModal isOpen={props.loginSwitch} onRequestClose={() => props.setLoginSwitch(false)} style={modal_style} ariaHideApp={false} >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-x" viewBox="0 0 14 14" onClick={() => props.setLoginSwitch(false)}>
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
            </svg>
            <div className="wrapper">
                <div className="form-box">
                        <div className="form-value">
                        <form className="log_form">
                            <h2>Login</h2>
                            <div className="inputbox">
                                <input id="login_id" type="text" name="id" placeholder="아이디"></input>
                            </div>
                            <div className="inputbox">
                                <input id="login_password" type="password" name="password" placeholder="비밀번호"></input>
                            </div>
                            <div className="login_wrapper" onClick={()=>{login_session();}}>
                                <a className="login_button">로그인</a>
                            </div>

                            <div className="pwfind">
                                <a className="signup" onClick={()=>{setSignUpSwitch(true);}}>회원가입</a>
                                <a>/</a>
                                <a className="findpw" onClick={()=>{setFindPwSwitch(true);}}>비밀번호 찾기</a>
                            </div>
                        </form>
                        </div>
                </div>
            </div>
            <Signup_Modal signupSwitch={signupSwitch} setSignUpSwitch={setSignUpSwitch}/>
            <Findpw_modal findpwSwitch={findpwSwitch} setFindPwSwitch={setFindPwSwitch}/>
        </ReactModal>
    )
}
export default Login_modal;