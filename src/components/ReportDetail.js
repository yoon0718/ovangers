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
        const cmdata = async (postNum) => {
            const url = `http://10.10.21.64:8080/api/request/inner?postNumber=${postNum}&userId=${window.sessionStorage.userId}`; 
            const ajax = await fetch(url,{method:"Put"}); 
            const response = await ajax.text();
            alert(response)
        }
        const cmdata_del = async(postNum) => {
            const url = `http://10.10.21.64:8080/api/request?postNumber=${postNum}&userId=${window.sessionStorage.userId}`; 
            const ajax = await fetch(url,{method:"Delete"}); 
            const response = await ajax.text();
            alert(response)
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
        const rmdata = async (postNum) => {
            const url = `http://10.10.21.64:8080/api/down/inner?postNum=${postNum}&userId=${window.sessionStorage.userId}`; 
            const ajax = await fetch(url,{method:"Post"}); 
            const response = await ajax.text();
            alert(response)
        }
        const rmdata_del = async(postNum) => {
            const url = `http://10.10.21.64:8080/api/down?postNum=${postNum}&userId=${window.sessionStorage.userId}`; 
            const ajax = await fetch(url,{method:"Delete"}); 
            const response = await ajax.text();
            alert(response)
        }
        
        const reportClick = async (postNum)=>{
            const url = `http://10.10.21.64:8080/api/down?postNum=${postNum}&userId=${window.sessionStorage.userId}`;
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
            dataList.push(<tr><th width="1510px" colSpan="8"><h2 className="h2">방문 충전 신청내역</h2></th></tr>)
            dataList.push(
                            <tr>
                                <th width="100" height="50">접수번호</th>
                                <th width="100">lat</th>
                                <th width="100">lng</th>
                                <th width="100">유저ID</th>
                                <th width="100">업체명</th>
                                <th width="200">요청시간</th>
                                <th width="200">접수시간</th>
                                <th width="200">완료시간</th>
                            </tr>
                        )
            if(window.sessionStorage.managerCheck==="CM"){
                data1.forEach(data => {
                dataList.push(<tr><td colSpan="11"><hr/></td></tr>)
                dataList.push(<tr key={data.postNumber}>
                                <td width="70" height="50">{data.postNumber}</td>
                                <td width="100">{data.lat}</td>
                                <td width="100">{data.lng}</td>
                                <td width="100">{data.userId.userId}</td>
                                <td width="100">{data.bnm}</td>
                                <td width="200">{data.postStartDate}</td>
                                <td width="200">{data.postInnerDate}</td>
                                <td width="200">{data.postEndDate}</td>
                                <td width="100"><button className='request_btn' onClick={()=>{if(window.confirm("취소하시겠습니까?")){cmdata_del(data.postNumber);}}}>취소</button></td>
                                <td width="100"><button className='request_btn' onClick={()=>{cmdata(data.postNumber);}}>접수</button></td>
                                <td width="100"><button className="request_btn" onClick={()=>{requestClick(data.postNumber);}}>완료</button></td>
                                
                            </tr>)
                });
                setContent(dataList);
            } else {
                data1.forEach(data => {
                    dataList.push(<tr><td colSpan="8"><hr/></td></tr>)
                    dataList.push(<tr key={data.postNumber}>
                                    <td width="86" height="50">{data.postNumber}</td>
                                    <td width="200">{data.lat}</td>
                                    <td width="200">{data.lng}</td>
                                    <td width="120">{data.userId.userId}</td>
                                    <td width="120">{data.bnm}</td>
                                    <td width="200">{data.postStartDate}</td>
                                    <td width="200">{data.postInnerDate}</td>
                                    <td width="200">{data.postEndDate}</td>
                                </tr>)
                    });
                    setContent(dataList);
            }
        } else if (type === "report"){
            let datalist2=[];
            datalist2.push(<tr><th width="1510px" colSpan="8"><h2 className="h2">고장 신고 내역</h2></th></tr>)
            datalist2.push(
                            <tr>
                                <th width="50" height="50">접수번호</th>
                                <th width="50">Stch_Id</th>
                                <th width="80">유저ID</th>
                                <th width="100">업체명</th>
                                <th width="100">요청시간</th>
                                <th width="100">접수시간</th>
                                <th width="100">완료시간</th>
                                <th width="380">주소</th>
                            </tr>
                            )
            if(window.sessionStorage.managerCheck==="RM"){             
                brdata.forEach(data => {
                    datalist2.push(<tr><td colSpan="11"><hr/></td></tr>)
                    datalist2.push(<tr key={data.postNum}>
                                <td width="50" height="50">{data.postNum}</td>
                                <td width="80">{data.stchId.stchId}</td>
                                <td width="100">{data.userId.userId}</td>
                                <td width="100">{data.bnm}</td>
                                <td width="100">{data.postStartDate}</td>
                                <td width="100">{data.postInnerDate}</td>
                                <td width="100">{data.postEndDate}</td>
                                <td width="380" style={{"wordBreak":"break-all"}} >{data.addr}</td>
                                <td width="110"><button className='request_btn' onClick={()=>{if(window.confirm("취소하시겠습니까?")){rmdata_del(data.postNum);}}}>취소</button></td>
                                <td width="110"><button className='request_btn' onClick={()=>{rmdata(data.postNum);}}>접수</button></td>
                                <td width="110"><button className="report_btn" onClick={()=>reportClick(data.postNum,data.userId.userId)}>완료</button></td>
                            </tr>)
                })
                setContent(datalist2);
            } else {
                brdata.forEach(data => {
                    datalist2.push(<tr><td colSpan="8"><hr/></td></tr>)
                    datalist2.push(<tr key={data.postNum}>
                                    <td width="50" height="50">{data.postNum}</td>
                                    <td width="200">{data.stchId.stchId}</td>
                                    <td width="120">{data.userId.userId}</td>
                                    <td width="120">{data.bnm}</td>
                                    <td width="200">{data.postStartDate}</td>
                                    <td width="200">{data.postInnerDate}</td>
                                    <td width="200">{data.postEndDate}</td>
                                    <td width="380">{data.addr}</td>
                                </tr>)
                    })
                    setContent(datalist2);
            }
        } else if (type === "point" && !(['CM','RM'].includes(window.sessionStorage.managerCheck))){
            let datalist3 = [];
            datalist3.push(<tr><th width="1510px" colSpan="4"><h2 className="h2">포인트지급내역</h2></th></tr>)
            datalist3.push(
                    <tr className='point_div'>
                        <th width="86" height="50">번호</th>
                        <th width="120">유저ID</th>
                        <th width="300">Point</th>
                        <th width="300">날짜</th>
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

        } else{
            setContent(<h3>확인 할 수 없는 사용자입니다.</h3>)
        }
    };

    let buttons=[]
    if (["A","U"].includes(window.sessionStorage.managerCheck)){
        buttons.push(
            <div className="sidebar">
                <div><button className="rq" onClick={()=> {data(); sidebarClick("request");}}>방문충전신청내역</button></div>
                <br/>
                <div><button className="break" onClick={()=> {data2(); sidebarClick("report");}}>고장 신고 내역</button></div>
                <br/>
                <div><button className="charge" onClick={()=> {pointCheck(); sidebarClick("point")}}>포인트 내역</button></div>
                <br/>
                <div className='asddd'><img className='home_img' src={logo} alt="메인페이지" onClick={mainPage}></img></div>
            </div>
        )
    } else if ( window.sessionStorage.managerCheck === "CM" ){
        buttons.push(
            <div className="sidebar">
                <div><button className="rq" onClick={()=> {data(); sidebarClick("request");}}>방문충전신청내역</button></div>
                <br/>
                <div className='asddd'><img className='home_img' src={logo} alt="메인페이지" onClick={mainPage}></img></div>
            </div>
        )
    } else if ( window.sessionStorage.managerCheck === "RM" ){
        buttons.push(
            <div className="sidebar">
                <div><button className="break" onClick={()=> {data2(); sidebarClick("report");}}>고장 신고 내역</button></div>
                <br/>
                <div className='asddd'><img className='home_img' src={logo} alt="메인페이지" onClick={mainPage}></img></div>
            </div>
        )
    }

    useEffect(()=>{data(); data2();pointCheck();},[])

    return(
    <div>
        <div className="top-right">
            <button className="lout_btn" onClick={logout}>로그아웃</button>
        </div>
        <div className="container">
            {buttons}
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