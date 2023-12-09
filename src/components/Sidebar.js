import '../css/Sidebar.css'
function Navbar(props) {
    //클릭 시 바뀌는 함수
    const first_sidebar_click = () =>{
        if (document.querySelector(".sidebar_myaccount").style.height == "0px"){
            document.querySelector(".sidebar_myaccount").style.height = "auto"
            document.querySelectorAll(".sidebar_myaccount > *").forEach((element) =>{element.style.display = "flex"})
            document.getElementById("first_down_icon").innerHTML=`
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-up-square-fill" viewBox="0 0 16 16">
                    <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm4 9h8a.5.5 0 0 0 .374-.832l-4-4.5a.5.5 0 0 0-.748 0l-4 4.5A.5.5 0 0 0 4 11"/>
                </svg>`
        } else{
            document.querySelector(".sidebar_myaccount").style.height = "0px"
            document.querySelectorAll(".sidebar_myaccount > *").forEach((element) =>{element.style.display = "none"})
            document.getElementById("first_down_icon").innerHTML=`
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-down-square-fill" viewBox="0 0 16 16">
                    <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm4 4a.5.5 0 0 0-.374.832l4 4.5a.5.5 0 0 0 .748 0l4-4.5A.5.5 0 0 0 12 6z"/>
                </svg>`
        }
    }
    const second_sidebar_click = () => {
        if (document.querySelector(".sidebar_mysearch").style.height == "0px"){
            document.querySelector(".sidebar_mysearch").style.height = "auto"
            document.querySelectorAll(".sidebar_mysearch > *").forEach((element) =>{element.style.display = "flex"})
            document.getElementById("second_down_icon").innerHTML=`
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-up-square-fill" viewBox="0 0 16 16">
                    <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm4 9h8a.5.5 0 0 0 .374-.832l-4-4.5a.5.5 0 0 0-.748 0l-4 4.5A.5.5 0 0 0 4 11"/>
                </svg>`
        } else{
            document.querySelector(".sidebar_mysearch").style.height = "0px"
            document.querySelectorAll(".sidebar_mysearch > *").forEach((element) =>{element.style.display = "none"})
            document.getElementById("second_down_icon").innerHTML=`
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-down-square-fill" viewBox="0 0 16 16">
                    <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm4 4a.5.5 0 0 0-.374.832l4 4.5a.5.5 0 0 0 .748 0l4-4.5A.5.5 0 0 0 12 6z"/>
                </svg>`
        }
    }
    return(
    <nav className="main-menu">
        <ul>
            {/* 클릭시 로그인 창 모달형태로 나오게 구현 */}
            <li className='sidebar_account'>
                <div className='sidebar_wrapper' onClick={()=>{first_sidebar_click(); props.setLoginSwitch(true);}}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-person-circle" viewBox="0 -2 20 20">
                        <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
                        <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"/>
                    </svg>
                    <div className='icon_wrapper'>
                        <div className="nav-text">내정보</div>
                        <div id='first_down_icon' className='down_icon'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-down-square-fill" viewBox="0 0 16 16">
                                <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm4 4a.5.5 0 0 0-.374.832l4 4.5a.5.5 0 0 0 .748 0l4-4.5A.5.5 0 0 0 12 6z"/>
                            </svg>
                        </div>
                    </div>
                </div>
                <div className='sidebar_myaccount' style={{"height":"0"}}>
                    <div className='login_result'>
                        아이디<br/>
                        포인트<br/>
                    </div>    
                </div>  
            </li>
            <li className="sidebar_search">
                <div className='sidebar_wrapper' onClick={second_sidebar_click}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-search" viewBox="0 -2 20 20">
                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
                    </svg>
                    <div className='icon_wrapper'>
                        <div className="nav-text">검색</div>
                        <div id='second_down_icon' className='down_icon'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-down-square-fill" viewBox="0 0 16 16">
                                <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm4 4a.5.5 0 0 0-.374.832l4 4.5a.5.5 0 0 0 .748 0l4-4.5A.5.5 0 0 0 12 6z"/>
                            </svg>
                        </div>
                    </div>
                </div>
                <div className='sidebar_mysearch' style={{"height":"0"}}>
                    <div className='search_result'>
                    검색<input></input><br/>
                    결과
                    </div>    
                </div>    
            </li>
        </ul>
        <ul className="logout">
            <li>
                <div className='sidebar_wrapper'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-power" viewBox="0 0 16 16">
                        <path d="M7.5 1v7h1V1z"/>
                        <path d="M3 8.812a4.999 4.999 0 0 1 2.578-4.375l-.485-.874A6 6 0 1 0 11 3.616l-.501.865A5 5 0 1 1 3 8.812"/>
                    </svg>
                    <div className='icon_wrapper'>
                        <div className="nav-text">로그아웃</div>
                    </div>
                </div>
            </li>  
        </ul>
    </nav>
    )
}
export default Navbar