// import { Route, Routes } from 'react-router-dom';
import '../css/App.css'
import Login from './Login';
import Sidebar from './Sidebar';
import SignUp from './SignUp';
function App(){
    return(
        <div>
            <Sidebar/>
            <div className='test'>
                <Login/>
                <SignUp/>
            </div>
        </div>
    )
}

export default App;