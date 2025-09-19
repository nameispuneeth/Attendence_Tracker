import { useState } from "react"
import { useNavigate } from "react-router-dom";
export default function Home(){
  const navigate=useNavigate();
  const [File,setFile]=useState(null);
  const HandleSubmit=async(e)=>{
    e.preventDefault();
    if(!File) return;
    const formData = new FormData();
    formData.append("file", File);

    const response=await fetch("http://localhost:8000/api/getData",{
      method:"POST",
      body:formData
    });

    const data=await response.json();
    if(!data.response || Object.keys(data.response).length===0) alert("Enter A Valid TimeTable File");
    else{
      sessionStorage.setItem("timetable",JSON.stringify(data.response));
      navigate("/timetable")
    }

  }
  return(
     <div className="h-screen bg-gray-700 flex justify-center items-center flex-col space-y-10">
      <form
        onSubmit={HandleSubmit}
        className="flex flex-col space-y-6 bg-white p-6 rounded-2xl shadow-md"
      >
        <input
          type="file"
          accept="image/*,.pdf,.xlsx"
          onChange={(e) => setFile(e.target.files[0])}
          className="block w-full text-sm text-gray-700 
                     file:mr-4 file:py-2 file:px-4
                     file:rounded-lg file:border-0
                     file:text-sm file:font-semibold
                     file:bg-blue-600 file:text-white
                     hover:file:bg-blue-700 cursor-pointer"
        />

        <button
          type="submit"
          className="w-full py-2 px-4 bg-green-600 text-white 
                     rounded-lg font-medium shadow-md
                     hover:bg-green-700 transition duration-200"
        >
          Upload & Analyze
        </button>
      </form>
      <div className="flex justify-center align-middle gap-3">
        <div className="border-t-2 w-32 mt-3"></div>
        <p className="text-white font-semibold2">OR</p>
        <div className="border-t-2 w-32 mt-3"></div>
      </div>

      <p className="text-white font-bold text-sm p-3 border border-green-700 bg-green-700 rounded-lg shadow-2xl cursor-pointer hover:bg-green-800" onClick={()=>navigate("/manually")}>Enter Manually</p>
    </div>
  )
}