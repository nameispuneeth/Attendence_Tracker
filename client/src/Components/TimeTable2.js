import { useState } from "react"
export default function TimeTable2(){
    const [TimeTable,setTimeTable]=useState(Array.from({length:6},()=>Array(8).fill("")));
    const Days=["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    const ChangeVal=(rInd,cInd,val)=>{
      setTimeTable((prev)=>
        prev.map((row,rowInd)=>
          (rInd===rowInd)?row.map((data,colInd)=>
            (cInd===colInd)?val:data
          ):row
        )
      )
      
    }
    const getSelectColor = (val) => {
    switch (val) {
      case "SE": return "bg-green-200 text-green-800 "; 
      case "OS": return "bg-blue-200 text-blue-800";  
      case "CN": return "bg-yellow-200 text-yellow-800";
      default: return "bg-white text-gray-700";
    }
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
                      <option value="">Select</option>
                      <option value="SE">SE</option>
                      <option value="OS">OS</option>
                      <option value="CN">CN</option>

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