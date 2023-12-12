import "./Report.css"
import React, {useState} from "react";
function ReportDetail(){
    const [content, setContent] = useState([]);
    const [data1,setData1] = useState([]);
    const [brdata,setBrdata] = useState([]);


        const data = async () => {
            const url = "http://10.10.21.64:8080/api/request"; 
            const ajax = await fetch(url,{method:"Get"}); 
            const response = await ajax.json();
            setData1(response)
        }
        const requestClick = () => {
            
        };
        const data2 = async () => {
            const url = "http://10.10.21.64:8080/api/down";
            const ajax = await fetch(url,{method:"Get"});
            const response = await ajax.json();
            setBrdata(response)
        }
        const reportClick = ()=>{

        };
        
        const sidebarClick = (type)=>{
        if (type === "request"){
            let dataList=[];
            data1.forEach(data => {
            dataList.push(<div>
                            <hr/>
                            <td width="86" height="50">{data.postNumber}</td>
                            <td width="400">{data.stchId.stchId}</td>
                            <td width="120">{data.userId.userId}</td>
                            <td width="300">{data.postStartDate}</td>
                            <td width="300">{data.postEndDate}</td>
                            <td width="300"><button class="request_btn" onClick={()=>requestClick()}>OK</button></td>
                          </div>)
            })
            setContent(dataList);

        } else if (type === "report"){
            let datalist2=[];
            brdata.forEach(data => {
            datalist2.push(<div>
                            <hr/>
                            <td width="86" height="50">{data.postNum}</td>
                            <td width="400">{data.stchId.stchId}</td>
                            <td width="120">{data.userId.userId}</td>
                            <td width="300">{data.postStartDate}</td>
                            <td width="300">{data.postEndDate}</td>
                            <td width="300"><button class="report_btn" onClick={()=>reportClick()}>break</button></td>
                           </div>)
            })
            setContent(datalist2);

        } else if (type === "refresh"){
            const refreshData = "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!  데이터 갱신  !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!"
            setContent(refreshData);
        }
    };

    return(
    <div>
        <div className="top-right">
            <button className="lout_btn">로그아웃</button>
        </div>
        <div className="container">
            <div className="sidebar">
                <div><button className="rq" onClick={()=> {sidebarClick("request"); data();}}>방문충전신청내역</button></div>
                <br/>
                <div><button className="break" onClick={()=> {sidebarClick("report"); data2();}}>고장 신고 내역</button></div>
                <br/>
                <div><button className="charge" onClick={()=> sidebarClick("refresh")}>충전소 데이터 갱신</button></div>
            </div>
            <div className="content">
            <h2 style={{fontweight:"bold",border:"2px solid #636e72",background:"#dfe6e9",borderRadius:"10px"}}>신고내역</h2>
                <table class="table">
                    <tr>
                        <th width="86" height="50">Post_Num</th>
                        <th width="400">Stch_Id</th>
                        <th width="120">User_Id</th>
                        <th width="300">Start_Date</th>
                        <th width="300">End_Date</th>
                    </tr>
                </table>
                <span>{content}</span>
            </div>
        </div>
  </div>
    )
}
export default ReportDetail;