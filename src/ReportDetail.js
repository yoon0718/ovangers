import "./Report.css"
import React, {useState} from "react";
function ReportDetail(){
    const [content, setContent] = useState("");

    const sidebarClick = (type)=>{
        if (type === "request"){
            const requestData = "광주광역시 광산구 인력개발원 전기충전기 고장"
            setContent(requestData);
        } else if (type === "report"){
            const reportData = "광주광역시 광산구 인력개발원"
            setContent(reportData);
        } else if (type === "refresh"){
            const refreshData = "데이터 갱신"
            setContent(refreshData);
        }
    }
    return(
    <div>
        <div className="top-right">
            <button>로그아웃</button>
        </div>
        <div className="container">
            <div className="sidebar">
                <div><button onClick={()=> sidebarClick("request")}>신청내역</button></div>
                <br/>
                <div><button onClick={()=> sidebarClick("report")}>고장 신고 내역</button></div>
                <br/>
                <div><button className="charge" onClick={()=> sidebarClick("refresh")}>충전소 데이터 갱신</button></div>
            </div>
            <div className="content">
                <h2>내용 뜨는 공간</h2>
            <p>{content}</p>
        </div>
        </div>
  </div>
    )
}
export default ReportDetail;