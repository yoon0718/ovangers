import { useState } from 'react';
import '../css/Findpw_modal.css';
import ReactModal from "react-modal";
import Login_modal from './Login_modal';

function Findpw_modal(props){

    //비밀번호 변경 시 모드 변경
    const [mode, setMode] = useState(["check",""]);

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
          width: "40vw",
          height: "70vh",
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


    let checker = async () => {
        let userIdBlock = document.querySelector("#find_id")
        let userTelephoneBlock = document.querySelector("#find_phone")
        let userEmailBlock = document.querySelector("#find_email")
        let userId = userIdBlock.value
        let userTelephone = userTelephoneBlock.value
        let userEmail = userEmailBlock.value
        const url = `http://10.10.21.64:8080/api/findPw?userId=${userId}&userTelephone=${userTelephone}&userEmail=${userEmail}`;
        const ajax = await fetch(url,{method:"Post"});
        const response = await ajax.text();
        if (response === "true"){
            setMode (["update",userId])
        } else{
            alert('다시입력하세요');
        }
        userIdBlock.value=""
        userTelephoneBlock.value=""
        userEmailBlock.value=""
    }
    let update = async() => {
        let userPw = document.querySelector("#new_pw").value
        let checkPw = document.querySelector("#check_pw").value
        if(userPw === checkPw){
            const url = `http://10.10.21.64:8080/api/findPw?userId=${mode[1]}&userPassword=${userPw}`;
            const ajax = await fetch(url,{method:"Put"});
            const response = await ajax.text();
            alert(response)
            props.setFindPwSwitch(false)
        } else{
            alert('다시입력하세요');
        }
    }


    let update_pw;
    if (mode[0] === "check"){
        update_pw = 
            <div className='form-box2'>
                <div className="find_div">
                    <form className="find_form">
                        <label>ID</label>
                        <input id='find_id' type="text" name="id" placeholder="아이디"/>
                        <label>Phone</label>
                        <input id='find_phone' type="text" name="phone" placeholder="전화번호"/>
                        <label>Email</label>
                        <input id='find_email' type="text" name="email" placeholder="aaa@aaa.com"/>                   
                        <button className="find_btn" type="submit" value="비밀번호찾기" onClick={(e) => {e.preventDefault();checker();}}>비밀번호찾기</button>
                    </form>
                </div>
            </div>;
    } else if(mode[0] === "update"){
        update_pw = 
            <div className='form-box2'>
                <div className="change_div">
                    <form className="change_form">        
                        <label>새 비밀번호입력</label>
                        <input id='new_pw' type="password"></input>
                        <label>비밀번호 확인</label>
                        <input id='check_pw' type="password"></input>
                        <button className='change_btn' type="submit" onClick={(e) => {e.preventDefault();update();}}>비밀번호 수정완료</button>
                    </form>
                </div>
            </div>;
        
    } else{
        update_pw = 
        <div className='form-box2'>
            <div className="find_div">
                <form className="find_form">
                    <label>ID</label>
                    <input id='find_id' type="text" name="id" placeholder="아이디"></input>
                    <label>Phone</label>
                    <input id='find_phone' type="text" name="phone" placeholder="전화번호"></input>
                    <label>Email</label>
                    <input id='find_email' type="text" name="email" placeholder="aaa@aaa.com"></input>                   
                    <button className="find_btn" type="submit" value="비밀번호찾기" onClick={(e) => {e.preventDefault();checker();}}>비밀번호찾기</button>
                </form>
            </div>
        </div>;
    }

    return(
        <ReactModal isOpen={props.findpwSwitch} onRequestClose={() => props.setFindPwSwitch(false)} style={modal_style} ariaHideApp={false} >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16" onClick={() => props.setFindPwSwitch(false)}>
                <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
            </svg>
            {update_pw}
        </ReactModal>
    )
}

export default Findpw_modal;