import { Component } from "react";

class LoginPage extends Component{
    render(){
        return(
          <section>
            <div className="form-box">
              <div className="form-value">
                <form action="">
                    <h2>Login</h2>
                    <div className="inputbox">
                        <input type="text" name="id" placeholder="아이디"/>
                    </div>
                    <div className="inputbox">
                        <input type="password" name="password" placeholder="비밀번호"/>
                    </div>
                    <button className="log_btn">로그인</button>
                    <div className="pwfind">
                      <span onClick={()=>{this.props.handle()}}>회원가입</span>
                      <span>  /  </span>
                      <a href="/password-reset">비밀번호 찾기</a>
                    </div>
                </form>
              </div>
            </div>
          </section>
          // <div class="login_div">
          //     <form class="log_form">
          //       <h3>Log-In</h3>
          //       <label>ID</label>
          //       <input type="text" name="id" placeholder="아이디"></input>
          //       <label>Password</label>
          //       <input type="password" name="password" placeholder="비밀번호"></input>
          //       <br/>
          //       <button>로그인</button>
          //       <div class="pwfind">
          //         <span onClick={()=>{this.props.handle()}}>회원가입</span>
          //         <span>/</span>
          //         <a href="/password-reset">비밀번호 찾기</a>
          //       </div>
          //     </form>
          // </div>
        )
    }
}
export default LoginPage;