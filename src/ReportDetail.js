import React, {useState} from "react";
function ReportDetail(){
    const [content, setContent] = useState("");

    const sidebarClick = (type)=>{
        if (type === "request"){
            const requestData = "Asd"
            setContent(requestData);
        } else if (type === "report"){
            const reportData = "qwe"
            setContent(reportData);
        } else if (type === "refresh"){
            const refreshData = "sss"
            setContent(refreshData);
        }
    }
    return(
    <div>
        <div class="top-right">
            <button>로그아웃</button>
        </div>
        <div class="container">
            <div class="sidebar">
                <div><button onClick={()=> sidebarClick("request")}>신청내역</button></div>
                <br/>
                <div><button onClick={()=> sidebarClick("report")}>고장 신고 내역</button></div>
                <br/>
                <div><button class="charge" onClick={()=> sidebarClick("refresh")}>충전소 데이터 갱신</button></div>
            </div>
            <div class="content">
                <h2>내용 뜨는 공간</h2>
            <p>{content}</p>
        </div>
        </div>
  </div>
    )
}
export default ReportDetail;