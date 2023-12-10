import '../css/Findpw_modal.css';
import ReactModal from "react-modal";

function Findpw_modal(props){
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
      //바꿀거
    // const send_signup = async () => {
    //     let userId = document.querySelector("#sign_id").value
    //     let userPassword = document.querySelector("#sign_pw").value
    //     let userEmail = document.querySelector("#sign_email").value
    //     let userNickname = document.querySelector("#sign_nickname").value
    //     let userTelephone = document.querySelector("#sign_phone").value

    //     const url = `http://10.10.21.64:8080/api/account?userId=${userId}&userPassword=${userPassword}&userEmail=${userEmail}`
    //                 +`&userNickname=${userNickname}&userTelephone=${userTelephone}`; 
    //     const ajax = await fetch(url,{method:"Post"}); 
    //     const response = await ajax.text(); 
    //     alert(response);           
    // }


    return(
        <ReactModal isOpen={props.findpwSwitch} onRequestClose={() => props.setFindPwSwitch(false)} style={modal_style} ariaHideApp={false} >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16" onClick={() => props.setFindPwSwitch(false)}>
                <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
            </svg>
            <div className="find_div">
                <form className="find_form">
                    <label>ID</label>
                    <input id='find_id' type="text" name="id" placeholder="아이디"></input>
                    <label>Password</label>
                    <input id='find_pw' type="password" name="password" placeholder="비밀번호"></input>
                    <label>Email</label>
                    <input id='find_email' type="text" name="email" placeholder="aaa@aaa.com"></input>                   
                    <input type="submit" value="비밀번호찾기" onClick={(e) => {e.preventDefault();}}></input>
                </form>
                <h2>비밀번호안내:</h2>
            </div>
        </ReactModal>
    )
}

export default Findpw_modal;