import '../css/Sidebar.css'
function Navbar(props) {
    //클릭 시 화살표 아이콘 바뀜, 내용 나오게 구현
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

    const third_sidebar_click = () => {
        if (document.querySelector(".sidebar_mynavi").style.height == "0px"){
            document.querySelector(".sidebar_mynavi").style.height = "auto"
            document.querySelectorAll(".sidebar_mynavi > *").forEach((element) =>{element.style.display = "flex"})
            document.getElementById("third_down_icon").innerHTML=`
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-up-square-fill" viewBox="0 0 16 16">
                    <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm4 9h8a.5.5 0 0 0 .374-.832l-4-4.5a.5.5 0 0 0-.748 0l-4 4.5A.5.5 0 0 0 4 11"/>
                </svg>`
        } else{
            document.querySelector(".sidebar_mynavi").style.height = "0px"
            document.querySelectorAll(".sidebar_mynavi > *").forEach((element) =>{element.style.display = "none"})
            document.getElementById("third_down_icon").innerHTML=`
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-down-square-fill" viewBox="0 0 16 16">
                    <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm4 4a.5.5 0 0 0-.374.832l4 4.5a.5.5 0 0 0 .748 0l4-4.5A.5.5 0 0 0 12 6z"/>
                </svg>`
        }
    }
    const my_id = window.sessionStorage.userId
    const my_point = window.sessionStorage.userPoint

    const logout = () => {
        if(window.confirm("로그아웃 하시겠습니까?")){
            window.sessionStorage.clear();
            window.location.href="/";
        }
    }

    const find_station_nologin = async() => {
        const url = `http://10.10.21.64:8080/api/search?addr=${document.querySelector("#find_addr").value}&lat=${props.userLat}&lng=${props.userLng}`
        const ajax = await fetch(url,{method:"Post"}); 
        const response = await ajax.json(); 
        console.log(response)
    }

    const find_station_login = async() => {
        const url = `http://10.10.21.64:8080/api/search/${window.sessionStorage.userId}?addr=${document.querySelector("#find_addr").value}&lat=${props.userLat}&lng=${props.userLng}`
        const ajax = await fetch(url,{method:"Post"}); 
        const response = await ajax.json(); 
        console.log(response)
    }

    //로그인 안했을때
    if (window.sessionStorage.length <1){
    return( 
    <nav className="main-menu">
        <ul>
            {/* 클릭시 로그인 창 모달형태로 나오게 구현 */}
            <li className='sidebar_account'>
                <div className='sidebar_wrapper' onClick={()=>{props.setLoginSwitch(true);}}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-person-circle" viewBox="0 -2 20 20">
                        <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
                        <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"/>
                    </svg>
                    <div className='icon_wrapper'>
                        <div className="nav-text">로그인하세요</div>
                    </div>
                </div>  
            </li>
            <li className="sidebar_search">
                <div className='sidebar_wrapper' onClick={()=>{second_sidebar_click();}}>
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" className="bi bi-ev-station" viewBox="0 -2 16 18">
                    <path d="M3.5 2a.5.5 0 0 0-.5.5v5a.5.5 0 0 0 .5.5h5a.5.5 0 0 0 .5-.5v-5a.5.5 0 0 0-.5-.5zm2.131 10.46H4.14v-.893h1.403v-.505H4.14v-.855h1.49v-.54H3.485V13h2.146zm1.316.54h.794l1.106-3.333h-.733l-.74 2.615h-.031l-.747-2.615h-.764z"/>
                    <path d="M3 0a2 2 0 0 0-2 2v13H.5a.5.5 0 0 0 0 1h11a.5.5 0 0 0 0-1H11v-4a1 1 0 0 1 1 1v.5a1.5 1.5 0 0 0 3 0V4a.5.5 0 0 0-.146-.354l-.5-.5a.5.5 0 0 0-.707 0l-.5.5A.5.5 0 0 0 13 4v3c0 .71.38 1.096.636 1.357l.007.008c.253.258.357.377.357.635v3.5a.5.5 0 1 1-1 0V12a2 2 0 0 0-2-2V2a2 2 0 0 0-2-2zm7 2v13H2V2a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1"/>
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
                        <div className='search_icon'>
                            <input id='find_addr' placeholder='주소검색'></input>
                            <div className='search_button' onClick={()=>{find_station_nologin();}}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
                                </svg>
                            </div>
                        </div>
                        결과
                    </div>    
                </div>    
            </li>
            <li className="sidebar_navi">
                <div className='sidebar_wrapper' onClick={()=>{third_sidebar_click();}}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-sign-turn-right-fill" viewBox="0 0 16 16">
                    <path d="M9.05.435c-.58-.58-1.52-.58-2.1 0L.436 6.95c-.58.58-.58 1.519 0 2.098l6.516 6.516c.58.58 1.519.58 2.098 0l6.516-6.516c.58-.58.58-1.519 0-2.098L9.05.435ZM9 8.466V7H7.5A1.5 1.5 0 0 0 6 8.5V11H5V8.5A2.5 2.5 0 0 1 7.5 6H9V4.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L9.41 8.658A.25.25 0 0 1 9 8.466"/>
                </svg>
                    <div className='icon_wrapper'>
                        <div className="nav-text">길찾기</div>
                        <div id='third_down_icon' className='down_icon'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-down-square-fill" viewBox="0 0 16 16">
                                <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm4 4a.5.5 0 0 0-.374.832l4 4.5a.5.5 0 0 0 .748 0l4-4.5A.5.5 0 0 0 12 6z"/>
                            </svg>
                        </div>
                    </div>
                </div>
                <div className='sidebar_mynavi' style={{"height":"0"}}>
                    <div className='search_result'>
                    <input placeholder='출발지'/><br/>
                    <input placeholder='도착지'/><br/>
                    <button>길찾기</button>
                    </div>    
                </div>    
            </li>
            <div className='open_icon'>
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-arrow-right-circle-fill" viewBox="0 0 16 16">
                    <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0M4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z"/>
                </svg>
            </div>
            <div className='close_icon'>
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-arrow-left-circle-fill" viewBox="0 0 16 16">
                    <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0m3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z"/>
                </svg>
            </div>
        </ul>
    </nav>
    )
    //로그인했을때
    } else{
    return(
        <nav className="main-menu">
        <ul>
            <li className='sidebar_account'>
                <div className='sidebar_wrapper' onClick={()=>{first_sidebar_click();}}>
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
                        ID : {my_id}<br/>
                        포인트 : {my_point}<br/>
                        <button type='submit' onClick={()=>{props.setAccountSwitch(true);}}>회원정보수정</button>
                    </div>    
                </div>  
            </li>
            <li className="sidebar_search">
                <div className='sidebar_wrapper' onClick={()=>{second_sidebar_click();}}>
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" class="bi bi-ev-station" viewBox="0 -2 16 18">
                    <path d="M3.5 2a.5.5 0 0 0-.5.5v5a.5.5 0 0 0 .5.5h5a.5.5 0 0 0 .5-.5v-5a.5.5 0 0 0-.5-.5zm2.131 10.46H4.14v-.893h1.403v-.505H4.14v-.855h1.49v-.54H3.485V13h2.146zm1.316.54h.794l1.106-3.333h-.733l-.74 2.615h-.031l-.747-2.615h-.764z"/>
                    <path d="M3 0a2 2 0 0 0-2 2v13H.5a.5.5 0 0 0 0 1h11a.5.5 0 0 0 0-1H11v-4a1 1 0 0 1 1 1v.5a1.5 1.5 0 0 0 3 0V4a.5.5 0 0 0-.146-.354l-.5-.5a.5.5 0 0 0-.707 0l-.5.5A.5.5 0 0 0 13 4v3c0 .71.38 1.096.636 1.357l.007.008c.253.258.357.377.357.635v3.5a.5.5 0 1 1-1 0V12a2 2 0 0 0-2-2V2a2 2 0 0 0-2-2zm7 2v13H2V2a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1"/>
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
                        <div className='search_icon'>
                            <input id='find_addr' placeholder='주소검색'></input>
                            <div className='search_button' onClick={()=>{find_station_login();}}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
                                </svg>
                            </div>
                        </div>
                        결과
                    </div>    
                </div>    
            </li>
            <li className="sidebar_navi">
                <div className='sidebar_wrapper' onClick={()=>{third_sidebar_click();}}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-sign-turn-right-fill" viewBox="0 0 16 16">
                    <path d="M9.05.435c-.58-.58-1.52-.58-2.1 0L.436 6.95c-.58.58-.58 1.519 0 2.098l6.516 6.516c.58.58 1.519.58 2.098 0l6.516-6.516c.58-.58.58-1.519 0-2.098L9.05.435ZM9 8.466V7H7.5A1.5 1.5 0 0 0 6 8.5V11H5V8.5A2.5 2.5 0 0 1 7.5 6H9V4.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L9.41 8.658A.25.25 0 0 1 9 8.466"/>
                </svg>
                    <div className='icon_wrapper'>
                        <div className="nav-text">길찾기</div>
                        <div id='third_down_icon' className='down_icon'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-down-square-fill" viewBox="0 0 16 16">
                                <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm4 4a.5.5 0 0 0-.374.832l4 4.5a.5.5 0 0 0 .748 0l4-4.5A.5.5 0 0 0 12 6z"/>
                            </svg>
                        </div>
                    </div>
                </div>
                <div className='sidebar_mynavi' style={{"height":"0"}}>
                    <div className='search_result'>
                    <input placeholder='출발지'/><br/>
                    <input placeholder='도착지'/><br/>
                    <button>길찾기</button>
                    </div>    
                </div>    
            </li>
        </ul>
        <ul className="logout">
            <li>
                <div className='sidebar_wrapper'onClick={()=>{logout();}}>
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
}
export default Navbar;