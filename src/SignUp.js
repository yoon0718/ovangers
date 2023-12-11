import { Component } from "react";

class SignUp extends Component{
    render(){
        return(
            <section>
                <div class="form-box">
                    <div class="sign_div">
                        <form class="sign_form">
                            <label>ID</label>
                            <input type="text" name="id" placeholder="아이디"></input>
                            <label>Password</label>
                            <input type="password" name="password" placeholder="비밀번호"></input>
                            <label>Phone Number</label>
                            <input type="text" name="phone" placeholder="010-xxxx-xxxx"></input>
                            <label>Email</label>
                            <input type="text" name="email" placeholder="aaa@aaa.com"></input>
                            <button class="sign_btn">회원가입</button>
                        </form>
                    </div>
                </div>
            </section>
        )
    }
}
export default SignUp;