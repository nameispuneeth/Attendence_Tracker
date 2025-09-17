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
    return(
        <div className="p-5 h-screen flex justify-center items-center">
        <table className="border-2 border-collapse border-gray-400 rounded">
          <tr>
            <th  className="border border-gray-400 w-32 h-16">  </th>
            <th  className="border border-gray-400 w-32 h-16"> Period - 1 </th>
            <th  className="border border-gray-400 w-32 h-16"> Period - 2 </th>
            <th  className="border border-gray-400 w-32 h-16"> Period - 3 </th>
            <th  className="border border-gray-400 w-32 h-16"> Period - 4 </th>
            <th  className="border border-gray-400 w-32 h-16"> Period - 5 </th>
            <th  className="border border-gray-400 w-32 h-16"> Period - 6 </th>
            <th  className="border border-gray-400 w-32 h-16"> Period - 7 </th>
            <th  className="border border-gray-400 w-32 h-16"> Period - 8 </th>
          </tr>
            {TimeTable.map((row,rInd)=>(
              <tr key={rInd}>
                <td key={rInd} className="border border-gray-400 w-32 h-16 text-center font-medium">{Days[rInd]}</td>
                {row.map((val,cInd)=>(
                  <td key={cInd} className="border border-gray-400 w-32 h-16 text-center">
                    <select value={val} onChange={(e)=>ChangeVal(rInd,cInd,e.target.value)} key={cInd} className="w-full h-full text-center">
                      <option value="">Select</option>
                      <option value="A">A</option>
                      <option value="B">B</option>
                      <option value="C">C</option>

                    </select>
                  </td>
                ))}
              </tr>
            ))}
        </table>
        </div>
    )
}