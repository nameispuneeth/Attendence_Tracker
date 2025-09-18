import { useEffect, useState } from "react"
export default function TimeTable2(){
    const [TimeTable,setTimeTable]=useState(Array.from({length:6},()=>Array(8).fill("")));
    const Days=["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    const [subjects,setSubjects]=useState(Array(10).fill(""));
    const colors = [
      "bg-indigo-200 text-indigo-700",
  "bg-teal-200 text-teal-700",
  "bg-lime-200 text-lime-700",
  "bg-red-200 text-red-700",
  "bg-blue-300 text-blue-700",
  "bg-yellow-300 text-yellow-700",
  "bg-green-300 text-green-700",
  "bg-orange-300 text-orange-700",
  "bg-purple-200 text-purple-700",
  "bg-pink-200 text-pink-700",
  
];
    const ChangeVal=(rInd,cInd,val)=>{
      setTimeTable((prev)=>
        prev.map((row,rowInd)=>
          (rInd===rowInd)?row.map((data,colInd)=>
            (cInd===colInd)?val:data
          ):row
        )
      ) 
    }
    useEffect(()=>{
      if(localStorage.getItem("timetable")){
        const oldTimeTable=JSON.parse(localStorage.getItem("timetable"));
            const DaysInd=new Map();
        for(let i=0;i<6;i++){
          DaysInd.set(Days[i].toUpperCase(),i);
        }
        const newSubjects=new Set();
        let NewTimeTableState= Array.from({length:6},()=>Array(8).fill(""));
        for(let [day,dayperiods] of Object.entries(oldTimeTable)){
          const dayind=DaysInd.get(day);
          for(let [period,classname] of Object.entries(dayperiods)){
            NewTimeTableState[dayind][period]=classname;
            newSubjects.add(classname);
          }
        }
        setSubjects([...newSubjects]);
        setTimeTable(NewTimeTableState);
      }
    },[])
    const getSelectColor = (val) => {
    if(val==="") return "bg-gray-100 text-gray-700";
    const ind = subjects.indexOf(val);
    console.log(ind,val);
    return colors[ind];
  };
 

    return(
        <div className="p-5 h-screen flex flex-col space-y-10 justify-center items-center">
        <table className="border-2 border-collapse border-gray-400 rounded">
          <tr>
            <th className="border border-gray-400 w-32 h-16 bg-gray-700 text-white"> Day/Period </th>
            <th className="border border-gray-400 w-32 h-16 bg-gray-800 text-white"> Period - 1 </th>
            <th className="border border-gray-400 w-32 h-16 bg-gray-800 text-white"> Period - 2 </th>
            <th className="border border-gray-400 w-32 h-16 bg-gray-800 text-white"> Period - 3 </th>
            <th className="border border-gray-400 w-32 h-16 bg-gray-800 text-white"> Period - 4 </th>
            <th className="border border-gray-400 w-32 h-16 bg-gray-800 text-white"> Period - 5 </th>
            <th className="border border-gray-400 w-32 h-16 bg-gray-800 text-white"> Period - 6 </th>
            <th className="border border-gray-400 w-32 h-16 bg-gray-800 text-white"> Period - 7 </th>
            <th className="border border-gray-400 w-32 h-16 bg-gray-800 text-white"> Period - 8 </th>
          </tr>
            {TimeTable.map((row,rInd)=>(
              <tr key={rInd}>
                <td key={rInd} className="border border-gray-400 w-32 h-16 text-center font-medium bg-gray-800 text-white">{Days[rInd]}</td>
                {row.map((val,cInd)=>(
                  <td key={cInd} className={`border w-32 h-16 text-center font-normal ${getSelectColor(val)} border-gray-400`}>
                    <select value={val} onChange={(e)=>ChangeVal(rInd,cInd,e.target.value)} key={cInd} className={`w-full h-full text-center bg-transparent appearance-none outline-none border-0`}>
                      <option value="">Leisure</option>
                      {subjects.map((sub,ind)=>(
                        <option key={ind} value={sub}>{sub}</option>
                      ))}

                    </select>
                  </td>
                ))}
              </tr>
            ))}
        </table>
        <button className="bg-gray-800 text-white p-3 rounded text-base font-medium">Submit</button>
        </div>
    )
}