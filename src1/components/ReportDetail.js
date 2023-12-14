import logo from '../img/logo.jpg'
import "../css/ReportDetail.css"
import React, {useEffect, useState} from "react";
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
        const requestClick = async (postNumber) => {
            const url = `http://10.10.21.64:8080/api/request?postNumber=${postNumber}&userId=${window.sessionStorage.userId}`;
            const ajax = await fetch(url,{method:"Put"}); 
            const response =await ajax.text();
            sidebarClick("request");
            alert(response)
        };


        const data2 = async () => {
            const url = "http://10.10.21.64:8080/api/down";
            const ajax = await fetch(url,{method:"Get"});
            const response = await ajax.json();
            setBrdata(response)
        }
        const reportClick = async (postNum,userId)=>{
            const url = `http://10.10.21.64:8080/api/down?postNum=${postNum}&userId=${userId}`;
            const ajax = await fetch(url,{method:"Put"}); 
            const response =await ajax.text();
            sidebarClick("report");
            alert(response)
        };

        
        const logout = () => {
            window.sessionStorage.clear();
            window.location.href = "/";
        }

        const mainPage = () => {
            window.location.href= "/";
        }
        
        
        const sidebarClick = (type)=>{
        if (type === "request"){
            let dataList=[];
            dataList.push(
                        <div>
                            <h2 className="h2">방문 충전 신청내역</h2>
                            <table className="table">
                                <tr>
                                    <th width="86" height="50">Post_Num</th>
                                    <th width="200">lat</th>
                                    <th width="200">lng</th>
                                    <th width="120">User_Id</th>
                                    <th width="300">Start_Date</th>
                                    <th width="300">End_Date</th>
                                </tr>
                            </table>
                           </div>)
            if(window.sessionStorage.managerCheck==="Y"){
                data1.forEach(data => {
                dataList.push(<div key={data.postNumber}>
                                <hr/>
                                <td width="86" height="50">{data.postNumber}</td>
                                <td width="200">{data.lat}</td>
                                <td width="200">{data.lng}</td>
                                <td width="120">{data.userId.userId}</td>
                                <td width="300">{data.postStartDate}</td>
                                <td width="300">{data.postEndDate}</td>
                                <td width="300"><button className="request_btn" onClick={()=>requestClick(data.postNumber)}>OK</button></td>
                            </div>)
                });
                setContent(dataList);
            } else {
                data1.forEach(data => {
                    dataList.push(<div key={data.postNumber}>
                                    <hr/>
                                    <td width="86" height="50">{data.postNumber}</td>
                                    <td width="200">{data.lat}</td>
                                    <td width="200">{data.lng}</td>
                                    <td width="120">{data.userId.userId}</td>
                                    <td width="300">{data.postStartDate}</td>
                                    <td width="300">{data.postEndDate}</td>
                                </div>)
                    });
                    setContent(dataList);
            }
        } else if (type === "report"){
            let datalist2=[];
            datalist2.push(
                            <div>
                                <h2 className="h2">고장 신고 내역</h2>
                                <table className="table">
                                    <tr>
                                        <th width="86" height="50">Post_Num</th>
                                        <th width="400">Stch_Id</th>
                                        <th width="120">User_Id</th>
                                        <th width="300">Start_Date</th>
                                        <th width="300">End_Date</th>
                                    </tr>
                                </table>
                            </div>)
            if(window.sessionStorage.managerCheck==="Y"){             
                brdata.forEach(data => {
                datalist2.push(<div key={data.postNum}>
                                <hr/>
                                <td width="86" height="50">{data.postNum}</td>
                                <td width="400">{data.stchId.stchId}</td>
                                <td width="120">{data.userId.userId}</td>
                                <td width="300">{data.postStartDate}</td>
                                <td width="300">{data.postEndDate}</td>
                                <td width="300"><button className="report_btn" onClick={()=>reportClick(data.postNum,data.userId.userId)}>break</button></td>
                            </div>)
                })
                setContent(datalist2);
            } else {
                brdata.forEach(data => {
                    datalist2.push(<div key={data.postNum}>
                                    <hr/>
                                    <td width="86" height="50">{data.postNum}</td>
                                    <td width="400">{data.stchId.stchId}</td>
                                    <td width="120">{data.userId.userId}</td>
                                    <td width="300">{data.postStartDate}</td>
                                    <td width="300">{data.postEndDate}</td>
                                </div>)
                    })
                    setContent(datalist2);
            }
        } else if (type === "refresh"){
            const refreshData = "데이터갱신"
            setContent(refreshData);
        }
    };

    useEffect(()=>{data(); data2();},[])

    return(
    <div>
        <div className="top-right">
            <button className="lout_btn" onClick={logout}>로그아웃</button>
        </div>
        <div className="container">
            <div className="sidebar">
                <div><button className="rq" onClick={()=> {data(); sidebarClick("request");}}>방문충전신청내역</button></div>
                <br/>
                <div><button className="break" onClick={()=> {data2(); sidebarClick("report");}}>고장 신고 내역</button></div>
                <br/>
                <div><button className="charge" onClick={()=> sidebarClick("refresh")}>충전소 데이터 갱신</button></div>
                <br/>
                <div><img className='home_img' src={logo} alt="메인페이지" onClick={mainPage}></img></div>
            </div>
            <div className="content">
                <span>{content}</span>
            </div>
        </div>
  </div>
    )
}
export default ReportDetail;