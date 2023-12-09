import '../css/Signup_modal.css';
import ReactModal from 'react-modal';
function Signup_Modal(props) {
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
    const send_signup = async () => {
        let userId = document.querySelector("#sign_id").value
        let userPassword = document.querySelector("#sign_pw").value
        let userEmail = document.querySelector("#sign_email").value
        let userNickname = document.querySelector("#sign_nickname").value
        let userTelephone = document.querySelector("#sign_phone").value

        const url = `http://10.10.21.64:8080/api/account?userId=${userId}&userPassword=${userPassword}&userEmail=${userEmail}`
                    +`&userNickname=${userNickname}&userTelephone=${userTelephone}`; 
        const ajax = await fetch(url,{method:"Post"}); 
        const response = await ajax.text(); 
        alert(response);           
    }


    return(
        <ReactModal isOpen={props.signupSwitch} onRequestClose={() => props.setSignUpSwitch(false)} style={modal_style} ariaHideApp={false} >
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
        </ReactModal>
    )
}
export default Signup_Modal;