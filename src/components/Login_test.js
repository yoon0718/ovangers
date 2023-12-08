import { Component } from "react";

class Login extends Component{
    constructor(props){
        super(props);
        this.state={
            id:"",
            pw:"",
        }
    }

    save = function () {
        let idValue = document.querySelector(".login_id").value;
        let pwValue = document.querySelector(".login_pw").value;
        this.setState({"id":idValue,"pw":pwValue});
    }

    render(){
        window.sessionStorage.setItem("Id",this.state.id);
        window.sessionStorage.setItem("pw",this.state.pw);
        return(
            <div> 
                <input
                    className="login_id"
                    type="text"
                    placeholder="전화번호, 사용자 이름 또는 이메일"

                />
                <input className="login_pw"
                    type="password"
                    placeholder="비밀번호"
                />
                <button onClick={()=>{window.alert("저장완료");this.save();}}>확인</button>
            </div>
        );
    }

}
export default Login;