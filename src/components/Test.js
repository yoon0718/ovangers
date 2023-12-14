import "../css/Sidebar.css";
import { useEffect, useState } from "react";
function Navbar(props) {
  const [loginSearch, setLoginSearch] = useState([]);

  //클릭 시 화살표 아이콘 바뀜, 내용 나오게 구현
  const first_sidebar_click = () => {
    if (document.querySelector(".sidebar_myaccount").style.height == "0px") {
      document.querySelector(".sidebar_myaccount").style.height = "auto";
      document.querySelectorAll(".sidebar_myaccount > *").forEach((element) => {
        element.style.display = "flex";
      });
      document.getElementById("first_down_icon").innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-up-square-fill" viewBox="0 0 16 16">
                    <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm4 9h8a.5.5 0 0 0 .374-.832l-4-4.5a.5.5 0 0 0-.748 0l-4 4.5A.5.5 0 0 0 4 11"/>
                </svg>`;
    } else {
      document.querySelector(".sidebar_myaccount").style.height = "0px";
      document.querySelectorAll(".sidebar_myaccount > *").forEach((element) => {
        element.style.display = "none";
      });
      document.getElementById("first_down_icon").innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-down-square-fill" viewBox="0 0 16 16">
                    <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm4 4a.5.5 0 0 0-.374.832l4 4.5a.5.5 0 0 0 .748 0l4-4.5A.5.5 0 0 0 12 6z"/>
                </svg>`;
    }
  };
  const second_sidebar_click = () => {
    if (document.querySelector(".sidebar_mysearch").style.height == "0px") {
      document.querySelector(".sidebar_mysearch").style.height = "auto";
      document.querySelectorAll(".sidebar_mysearch > *").forEach((element) => {
        element.style.display = "flex";
      });
      document.getElementById("second_down_icon").innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-up-square-fill" viewBox="0 0 16 16">
                    <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm4 9h8a.5.5 0 0 0 .374-.832l-4-4.5a.5.5 0 0 0-.748 0l-4 4.5A.5.5 0 0 0 4 11"/>
                </svg>`;
    } else {
      document.querySelector(".sidebar_mysearch").style.height = "0px";
      document.querySelectorAll(".sidebar_mysearch > *").forEach((element) => {
        element.style.display = "none";
      });
      document.getElementById("second_down_icon").innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-down-square-fill" viewBox="0 0 16 16">
                    <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm4 4a.5.5 0 0 0-.374.832l4 4.5a.5.5 0 0 0 .748 0l4-4.5A.5.5 0 0 0 12 6z"/>
                </svg>`;
    }
  };

  const my_id = window.sessionStorage.userId;
  const my_point = window.sessionStorage.userPoint;

  const logout = () => {
    if (window.confirm("로그아웃 하시겠습니까?")) {
      window.sessionStorage.clear();
      window.location.href = "/";
    }
  };

  const find_station_nologin = async () => {
    const url = `http://localhost:8080/api/search?addr=${
      document.querySelector("#find_addr").value
    }&lat=${props.userLat}&lng=${props.userLng}`;
    const ajax = await fetch(url, { method: "Post" });
    const response = await ajax.json();
    console.log(response);
  };

  const find_station_login = async () => {
    const url = `http://localhost:8080/api/search/${
      window.sessionStorage.userId
    }?addr=${document.querySelector("#find_addr").value}&lat=${
      props.userLat
    }&lng=${props.userLng}`;
    const ajax = await fetch(url, { method: "Post" });
    const response = await ajax.json();
    setLoginSearch(response);
  };

  //   const search_result_click = () => {
  //     for (let i = 0; i < login_result.length; i++) {
  //       document.querySelector(`.lst_addr${i}`).style.color = "red";
  //     }
  //   };
  let i = 0;
  let login_result = [];
  loginSearch.forEach((lst) => {
    console.log(lst);
    login_result.push(
      <div
        className="lst_addr"
        // onClick={() => {
        //   search_result_click();
        // }}
        style={{ color: "white" }}
      >
        {lst.addr}
      </div>
    );
    i++;
    const tmp = document.querySelectorAll(".lst_addr");

    for (let i = 0; i < tmp.length; i++) {
      tmp[i].addEventListener("click", () => {
        console.log(tmp[i]);
        for (let j = 0; j < tmp.length; j++) {
          tmp[j].style.color = "white";
        }

        tmp[i].style.color = "red";
      });
    }
  });

  const open_sidebar = () => {
    if (document.querySelector(".close_icon").style.display === "none") {
      document.querySelector(".main-menu").style.width = "300px";
      document.querySelector(".open_icon").style.display = "none";
      document.querySelector(".close_icon").style.display = "block";
    } else {
      document.querySelector(".main-menu").style.width = "60px";
      document.querySelector(".close_icon").style.display = "none";
      document.querySelector(".open_icon").style.display = "block";
    }
  };
  const visit_charge = async () => {
    if (window.confirm("방문충전 신청하시겠습니까?")) {
      const url = `http://localhost:8080/api/request/${window.sessionStorage.userId}?lat=${props.userLat}&lng=${props.userLng}`;
      const ajax = await fetch(url, { method: "Post" });
      const response = await ajax.text();
      alert(response);
    }
  };

  //로그인 안했을때
  if (window.sessionStorage.length < 1) {
    return (
      <nav className="main-menu">
        <ul>
          {/* 클릭시 로그인 창 모달형태로 나오게 구현 */}
          <li className="sidebar_account">
            <div
              className="sidebar_wrapper"
              onClick={() => {
                props.setLoginSwitch(true);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                className="bi bi-person-circle"
                viewBox="0 -2 20 20"
              >
                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                <path
                  fillRule="evenodd"
                  d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"
                />
              </svg>
              <div className="icon_wrapper">
                <div className="nav-text">로그인하세요</div>
              </div>
            </div>
          </li>
          <li className="sidebar_search">
            <div
              className="sidebar_wrapper"
              onClick={() => {
                second_sidebar_click();
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                fill="currentColor"
                className="bi bi-ev-station"
                viewBox="0 -2 16 18"
              >
                <path d="M3.5 2a.5.5 0 0 0-.5.5v5a.5.5 0 0 0 .5.5h5a.5.5 0 0 0 .5-.5v-5a.5.5 0 0 0-.5-.5zm2.131 10.46H4.14v-.893h1.403v-.505H4.14v-.855h1.49v-.54H3.485V13h2.146zm1.316.54h.794l1.106-3.333h-.733l-.74 2.615h-.031l-.747-2.615h-.764z" />
                <path d="M3 0a2 2 0 0 0-2 2v13H.5a.5.5 0 0 0 0 1h11a.5.5 0 0 0 0-1H11v-4a1 1 0 0 1 1 1v.5a1.5 1.5 0 0 0 3 0V4a.5.5 0 0 0-.146-.354l-.5-.5a.5.5 0 0 0-.707 0l-.5.5A.5.5 0 0 0 13 4v3c0 .71.38 1.096.636 1.357l.007.008c.253.258.357.377.357.635v3.5a.5.5 0 1 1-1 0V12a2 2 0 0 0-2-2V2a2 2 0 0 0-2-2zm7 2v13H2V2a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1" />
              </svg>
              <div className="icon_wrapper">
                <div className="nav-text">검색</div>
                <div id="second_down_icon" className="down_icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-caret-down-square-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm4 4a.5.5 0 0 0-.374.832l4 4.5a.5.5 0 0 0 .748 0l4-4.5A.5.5 0 0 0 12 6z" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="sidebar_mysearch" style={{ height: "0" }}>
              <div className="search_result">
                <div className="search_icon">
                  <input id="find_addr" placeholder="주소검색"></input>
                  <div
                    className="search_button"
                    onClick={() => {
                      find_station_nologin();
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="currentColor"
                      className="bi bi-search"
                      viewBox="0 0 16 16"
                    >
                      <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                    </svg>
                  </div>
                </div>
                결과
              </div>
            </div>
          </li>
          <div className="open_icon" onClick={open_sidebar}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              fill="currentColor"
              className="bi bi-arrow-right-circle-fill"
              viewBox="0 0 16 16"
            >
              <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0M4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z" />
            </svg>
          </div>
          <div
            className="close_icon"
            style={{ display: "none" }}
            onClick={open_sidebar}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              fill="currentColor"
              className="bi bi-arrow-left-circle-fill"
              viewBox="0 0 16 16"
            >
              <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0m3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z" />
            </svg>
          </div>
        </ul>
      </nav>
    );
    //로그인했을때
  } else {
    return (
      <nav className="main-menu">
        <ul>
          <li className="sidebar_account">
            <div
              className="sidebar_wrapper"
              onClick={() => {
                first_sidebar_click();
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                className="bi bi-person-circle"
                viewBox="0 -2 20 20"
              >
                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                <path
                  fillRule="evenodd"
                  d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"
                />
              </svg>
              <div className="icon_wrapper">
                <div className="nav-text">내정보</div>
                <div id="first_down_icon" className="down_icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-caret-down-square-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm4 4a.5.5 0 0 0-.374.832l4 4.5a.5.5 0 0 0 .748 0l4-4.5A.5.5 0 0 0 12 6z" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="sidebar_myaccount" style={{ height: "0" }}>
              <div className="login_result">
                ID : {my_id}
                <br />
                포인트 : {my_point}
                <br />
                <button
                  type="submit"
                  onClick={() => {
                    props.setAccountSwitch(true);
                  }}
                >
                  회원정보수정
                </button>
              </div>
            </div>
          </li>
          <li className="sidebar_search">
            <div
              className="sidebar_wrapper"
              onClick={() => {
                second_sidebar_click();
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                fill="currentColor"
                className="bi bi-ev-station"
                viewBox="0 -2 16 18"
              >
                <path d="M3.5 2a.5.5 0 0 0-.5.5v5a.5.5 0 0 0 .5.5h5a.5.5 0 0 0 .5-.5v-5a.5.5 0 0 0-.5-.5zm2.131 10.46H4.14v-.893h1.403v-.505H4.14v-.855h1.49v-.54H3.485V13h2.146zm1.316.54h.794l1.106-3.333h-.733l-.74 2.615h-.031l-.747-2.615h-.764z" />
                <path d="M3 0a2 2 0 0 0-2 2v13H.5a.5.5 0 0 0 0 1h11a.5.5 0 0 0 0-1H11v-4a1 1 0 0 1 1 1v.5a1.5 1.5 0 0 0 3 0V4a.5.5 0 0 0-.146-.354l-.5-.5a.5.5 0 0 0-.707 0l-.5.5A.5.5 0 0 0 13 4v3c0 .71.38 1.096.636 1.357l.007.008c.253.258.357.377.357.635v3.5a.5.5 0 1 1-1 0V12a2 2 0 0 0-2-2V2a2 2 0 0 0-2-2zm7 2v13H2V2a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1" />
              </svg>
              <div className="icon_wrapper">
                <div className="nav-text">검색</div>
                <div id="second_down_icon" className="down_icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-caret-down-square-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm4 4a.5.5 0 0 0-.374.832l4 4.5a.5.5 0 0 0 .748 0l4-4.5A.5.5 0 0 0 12 6z" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="sidebar_mysearch" style={{ height: "0" }}>
              <div className="search_result">
                <div className="search_icon">
                  <input id="find_addr" placeholder="주소검색"></input>
                  <div
                    className="search_button"
                    onClick={() => {
                      find_station_login();
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="currentColor"
                      className="bi bi-search"
                      viewBox="0 0 16 16"
                    >
                      <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                    </svg>
                  </div>
                </div>
                <div className="login_searchresult">{login_result}</div>
              </div>
            </div>
          </li>
          <li className="visit_charge">
            <div
              className="sidebar_wrapper"
              onClick={() => {
                visit_charge();
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-ev-front"
                viewBox="0 0 18 16"
              >
                <path d="M9.354 4.243a.188.188 0 0 0-.085-.218.186.186 0 0 0-.23.034L6.051 7.246a.188.188 0 0 0 .136.316h1.241l-.673 2.195a.188.188 0 0 0 .085.218c.075.043.17.03.23-.034l2.88-3.187a.188.188 0 0 0-.137-.316H8.572z" />
                <path d="M4.819 2A2.5 2.5 0 0 0 2.52 3.515l-.792 1.848a.807.807 0 0 1-.38.404c-.5.25-.855.715-.965 1.262L.05 8.708a2.5 2.5 0 0 0-.049.49v.413c0 .814.39 1.543 1 1.997V13.5a.5.5 0 0 0 .5.5h2a.5.5 0 0 0 .5-.5v-1.338c1.292.048 2.745.088 4 .088s2.708-.04 4-.088V13.5a.5.5 0 0 0 .5.5h2a.5.5 0 0 0 .5-.5v-1.892c.61-.454 1-1.183 1-1.997v-.413c0-.165-.016-.329-.049-.49l-.335-1.68a1.807 1.807 0 0 0-.964-1.261.807.807 0 0 1-.381-.404l-.792-1.848A2.5 2.5 0 0 0 11.181 2H4.82ZM3.44 3.91A1.5 1.5 0 0 1 4.82 3h6.362a1.5 1.5 0 0 1 1.379.91l.792 1.847a1.8 1.8 0 0 0 .853.904c.222.112.381.32.43.564l.336 1.679c.02.097.029.195.029.294v.413a1.48 1.48 0 0 1-1.408 1.484c-1.555.07-3.786.155-5.592.155-1.806 0-4.037-.084-5.592-.155A1.479 1.479 0 0 1 1 9.611v-.413c0-.099.01-.197.03-.294l.335-1.68a.807.807 0 0 1 .43-.563c.383-.19.685-.511.853-.904l.792-1.848Z" />
              </svg>
              <div className="icon_wrapper">
                <div className="nav-text">방문충전 신청</div>
              </div>
            </div>
          </li>
          <li className="visit_board">
            <div
              className="sidebar_wrapper"
              onClick={() => {
                window.location.href = "/board";
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-clipboard-check"
                viewBox="0 0 18 16"
              >
                <path
                  fillRule="evenodd"
                  d="M10.854 7.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 9.793l2.646-2.647a.5.5 0 0 1 .708 0z"
                />
                <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1z" />
                <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0z" />
              </svg>
              <div className="icon_wrapper">
                <div className="nav-text">신고/방문충전 신청현황</div>
              </div>
            </div>
          </li>
          <div className="open_icon" onClick={open_sidebar}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              fill="currentColor"
              className="bi bi-arrow-right-circle-fill"
              viewBox="0 0 16 16"
            >
              <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0M4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z" />
            </svg>
          </div>
          <div
            className="close_icon"
            style={{ display: "none" }}
            onClick={open_sidebar}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              fill="currentColor"
              className="bi bi-arrow-left-circle-fill"
              viewBox="0 0 16 16"
            >
              <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0m3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z" />
            </svg>
          </div>
        </ul>
        <ul className="logout">
          <li>
            <div
              className="sidebar_wrapper"
              onClick={() => {
                logout();
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-power"
                viewBox="0 0 16 16"
              >
                <path d="M7.5 1v7h1V1z" />
                <path d="M3 8.812a4.999 4.999 0 0 1 2.578-4.375l-.485-.874A6 6 0 1 0 11 3.616l-.501.865A5 5 0 1 1 3 8.812" />
              </svg>
              <div className="icon_wrapper">
                <div className="nav-text">로그아웃</div>
              </div>
            </div>
          </li>
        </ul>
      </nav>
    );
  }
}
export default Navbar;