import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CurrAttendence() {
    const navigate = useNavigate();
    const [loading, setloading] = useState(false);
    const [subClasses,setSubClasses]=useState([]);
    let HandleSubmit=()=>{
        sessionStorage.setItem("attendence",JSON.stringify(subClasses));
        navigate("/requirement")
    }
    let Spinner = () => {
        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="w-12 h-12 border-4 border-white border-t-blue-500 rounded-full animate-spin"></div>
            </div>
        );
    }
    
    useEffect(()=>{
        if(sessionStorage.getItem("timetable") && sessionStorage.getItem("date")){
            const timetable=JSON.parse(sessionStorage.getItem("timetable"));
            console.log(timetable)
            const startDate=new Date(JSON.parse(sessionStorage.getItem("date")));
            const weeks=Math.ceil((new Date()-startDate)/(1000*60*60*24*7));
            const mp=new Map();
            timetable.map((row,i)=>{
                row.map((val,j)=>{
                    const prevVal=mp.get(val) || 0;
                    if(val!="") mp.set(val,prevVal+1);
                })
            })
            const tempArr=[];
            mp.forEach((val,key)=>{
                tempArr.push([key,val*weeks,val*weeks]);
            })
            setSubClasses(tempArr)

        }else{
            alert("TimeTable Required");
            return;
        }
    },[])
    return (
        <div className="relative min-h-screen bg-gray-900 flex flex-col justify-center items-center text-white space-y-10">
            {loading && Spinner()}
            <p className="font-extrabold text-3xl text-wrap text-center">Your Current Attendance Percentage : </p>
            {subClasses.map((row,rInd)=>(
                <div className="flex space-x-5 items-center justify-center" key={rInd}>
                <p className="text-xl font-extrabold"> {row[0]} :  </p>
                <input type="number" className="no-spinner text-black h-12 w-20 text-center" value={row[1]} onChange={(e)=>{
                    let val=e.target.value;
                    if(e.target.value=="") val=0;
                    if(e.target.value<=row[2]){
                        setSubClasses(subClasses.map((r,rind)=>(rind==rInd)?[r[0],val,r[2]]:r))
                    }
                }}></input>
                <p className="font-medium">Of</p>
                <input type="number" className="no-spinner text-black h-12 w-20 text-center" value={row[2]}></input>
            </div>
            ))}
            <button className="border border-gray-300 bg-gray-200 px-5 py-2 rounded-lg shadow-xl hover:bg-gray-300 font-medium text-gray-800 " onClick={()=>HandleSubmit()}>Submit</button>
        </div>
    )
}