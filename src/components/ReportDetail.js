import logo from '../img/logo.jpg'
import "../css/ReportDetail.css"
import React, {useEffect, useState} from "react";
function ReportDetail(){
    const [content, setContent] = useState([]);
    const [data1,setData1] = useState([]);
    const [brdata,setBrdata] = useState([]);
    const [point,setPoint] = useState([]);


        const data = async () => {
            const url = `http://10.10.21.64:8080/api/request/${window.sessionStorage.userId}`; 
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
            const url =`http://10.10.21.64:8080/api/down`;
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
        
        const pointCheck = async ()=>{
            const url = `http://10.10.21.64:8080/api/point?userId=${window.sessionStorage.userId}`;
            const ajax = await fetch(url,{method:"Get"}); 
            const response =await ajax.json();
            setPoint(response)

        };

        
        const sidebarClick = (type)=>{
        if (type === "request"){
            let dataList=[];
            dataList.push(<tr><th width="1510px" colSpan="7"><h2 className="h2">방문 충전 신청내역</h2></th></tr>)
            dataList.push(
                            <tr>
                                <th width="86" height="50">Post_Num</th>
                                <th width="200">lat</th>
                                <th width="200">lng</th>
                                <th width="120">User_Id</th>
                                <th width="300">Start_Date</th>
                                <th width="300">End_Date</th>
                            </tr>
                        )
            if(window.sessionStorage.managerCheck==="Y"){
                data1.forEach(data => {
                dataList.push(<tr><td colSpan="7"><hr/></td></tr>)
                dataList.push(<tr key={data.postNumber}>
                                <td width="86" height="50">{data.postNumber}</td>
                                <td width="200">{data.lat}</td>
                                <td width="200">{data.lng}</td>
                                <td width="120">{data.userId.userId}</td>
                                <td width="300">{data.postStartDate}</td>
                                <td width="300">{data.postEndDate}</td>
                                <td width="300"><button className="request_btn" onClick={()=>requestClick(data.postNumber)}>OK</button></td>
                            </tr>)
                });
                setContent(dataList);
            } else {
                data1.forEach(data => {
                    dataList.push(<tr><td colSpan="7"><hr/></td></tr>)
                    dataList.push(<tr key={data.postNumber}>
                                    <td width="86" height="50">{data.postNumber}</td>
                                    <td width="200">{data.lat}</td>
                                    <td width="200">{data.lng}</td>
                                    <td width="120">{data.userId.userId}</td>
                                    <td width="300">{data.postStartDate}</td>
                                    <td width="300">{data.postEndDate}</td>
                                </tr>)
                    });
                    setContent(dataList);
            }
        } else if (type === "report"){
            let datalist2=[];
            datalist2.push(<tr><th width="1510px" colSpan="7"><h2 className="h2">고장 신고 내역</h2></th></tr>)
            datalist2.push(
                            <tr>
                                <th width="86" height="50">Post_Num</th>
                                <th width="200">Stch_Id</th>
                                <th width="120">User_Id</th>
                                <th width="300">Start_Date</th>
                                <th width="300">End_Date</th>
                                <th width="400">Address</th>
                            </tr>
                            )
            if(window.sessionStorage.managerCheck==="Y"){             
                brdata.forEach(data => {
                    datalist2.push(<tr><td colSpan="7"><hr/></td></tr>)
                    datalist2.push(<tr key={data.postNum}>
                                <td width="86px" height="50">{data.postNum}</td>
                                <td width="200px">{data.stchId.stchId}</td>
                                <td width="120px">{data.userId.userId}</td>
                                <td width="300px">{data.postStartDate}</td>
                                <td width="300px">{data.postEndDate}</td>
                                <td width="400px" style={{"wordBreak":"break-all"}} >{data.addr}</td>
                                <td width="100px"><button className="report_btn" onClick={()=>reportClick(data.postNum,data.userId.userId)}>break</button></td>
                            </tr>)
                })
                setContent(datalist2);
            } else {
                brdata.forEach(data => {
                    datalist2.push(<tr><td colSpan="7"><hr/></td></tr>)
                    datalist2.push(<tr key={data.postNum}>
                                    <td width="86" height="50">{data.postNum}</td>
                                    <td width="200">{data.stchId.stchId}</td>
                                    <td width="120">{data.userId.userId}</td>
                                    <td width="300">{data.postStartDate}</td>
                                    <td width="300">{data.postEndDate}</td>
                                    <td width="400">{data.addr}</td>
                                </tr>)
                    })
                    setContent(datalist2);
            }
        } else if (type === "refresh"){
            let datalist3 = [];
            datalist3.push(<tr><th width="1510px" colSpan="4"><h2 className="h2">포인트지급내역</h2></th></tr>)
            datalist3.push(
                    <tr className='point_div'>
                        <th width="86" height="50">Seq_Num</th>
                        <th width="120">User_Id</th>
                        <th width="300">Point</th>
                        <th width="300">Date</th>
                    </tr>
                    )
            point.forEach(data => {
                datalist3.push(<tr><td colSpan="4"><hr/></td></tr>)
                datalist3.push(<tr className='point_div' key={data.seq}>
                    <td width="86" height="50">{data.seq}</td>
                    <td width="120">{data.userId.userId}</td>
                    <td width="300">{data.point}</td>
                    <td width="300">{data.postEndDate}</td>
                </tr>)
            })
            setContent(datalist3);

        }
    };

    useEffect(()=>{data(); data2();pointCheck();},[])

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
                <div><button className="charge" onClick={()=> {pointCheck(); sidebarClick("refresh")}}>포인트 내역</button></div>
                <br/>
                <div className='asddd'><img className='home_img' src={logo} alt="메인페이지" onClick={mainPage}></img></div>
            </div>
            <div className="content">
                <table className="table">
                    {content}
                </table>
            </div>
        </div>
  </div>
    )
}
export default ReportDetail;