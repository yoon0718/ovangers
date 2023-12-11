import ReactModal from "react-modal";
import '../css/Myaccount_modal.css'
import { useEffect, useState } from "react";

function Myaccount_modal(props){
  const [my_email,set_my_email] = useState()
  const [my_telephone,set_my_telephone] = useState(window.sessionStorage.userTelephone)
  const [my_nickname,set_my_nickname] = useState(window.sessionStorage.userNickname)

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
  useEffect(()=>{
    setTimeout(() => {if(document.querySelector(".setaccount_div") != null){
      set_my_email(window.sessionStorage.userEmail);
      set_my_telephone(window.sessionStorage.userTelephone);
      set_my_nickname(window.sessionStorage.userNickname);
      document.querySelector("#userEmail").value = my_email;
      document.querySelector("#userTelephone").value = my_telephone;
      document.querySelector("#userNickname").value = my_nickname;
    }},100)
  })

  let update_account = async() => {
    const url = "http://10.10.21.64:8080/api/account/"+window.sessionStorage.userId+"?"+`userEmail=${my_email}&userTelephone=${my_telephone}&userNickname=${my_nickname}`
    const ajax = await fetch(url,{method:"Put"});
    const response = await ajax.text();
    alert(response)
  }

  return(
    <ReactModal isOpen={props.accountSwitch} style={modal_style} ariaHideApp={false}>
        <div className="setaccount_div">
            <form className="setaccount_form">
                <input id="userEmail" onChange={e=>{set_my_email(e.target.value); window.sessionStorage.setItem("userEmail",e.target.value)}}></input><br/>
                <input id="userTelephone" onChange={e=>{set_my_telephone(e.target.value); window.sessionStorage.setItem("userTelephone",e.target.value)}}></input><br/>
                <input id="userNickname" onChange={e=>{set_my_nickname(e.target.value); window.sessionStorage.setItem("userNickname",e.target.value)}}></input><br/>
                <input type="submit" onClick={(e)=>{e.preventDefault(); props.setAccountSwitch(false); update_account();}}></input>
            </form>
        </div>
    </ReactModal>
  )
}
export default Myaccount_modal;