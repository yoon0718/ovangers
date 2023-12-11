import ReactModal from "react-modal";
import '../css/Myaccount_modal.css'
const my_email = window.sessionStorage.userEmail;
const my_telephone = window.sessionStorage.userTelephone;
const my_nickname = window.sessionStorage.userNickname;

function Myaccount_modal(props){
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
    return(
        <ReactModal isOpen={props.accountSwitch} onRequestClose={() => props.setAccountSwitch(false)} style={modal_style} ariaHideApp={false}>
            <div className="setaccount_div">
                <form className="setaccount_form">
                    <input value={my_email}></input><br/>
                    <input value={my_telephone}></input><br/>
                    <input value={my_nickname}></input>
                </form>
            </div>
        </ReactModal>
    )
}
export default Myaccount_modal;