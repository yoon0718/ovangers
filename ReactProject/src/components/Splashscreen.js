import logo from '../img/logo.jpg'
import '../css/Splashscreen.css'
function Splashscreen(){
    return(
        <div className='logo'>
            <img className='splash_logo' src={logo}></img>
        </div>
    )
}
export default Splashscreen;