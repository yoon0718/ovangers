import '../css/Header.css'
function Header(){
    return(
        <div className="Header">
            <div className='id_wrapper'>
                <div className='header_id'>아이디</div>
                <div className='header_point'>포인트</div>
            </div>
            <div className='header_logout'>로그인/아웃</div>
        </div>
    )
}
export default Header;