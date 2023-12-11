import { Component } from 'react';
import './Login.css';
import LoginPage from './LoginPage';
import SignUp from './SignUp';

class Login extends Component {
  constructor(props){
    super(props);
    this.state={
      sup:false
    };
  }
  handleSignUpClick = () => {
    this.setState({sup:true});
  }
  render(){
    if(this.state.sup){
      return <SignUp/>;
    }

    return (
      <div class="body">
        <LoginPage handle={this.handleSignUpClick}/>
      </div>
    );
  }
}
export default Login;

