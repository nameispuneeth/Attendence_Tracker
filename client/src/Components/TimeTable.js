import { useState } from "react"
export default function TimeTable(){
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
    localStorage.setItem("timetable",JSON.stringify(data.response));
    console.log(data.response);

  }
  return(
     <div className="h-screen bg-gray-700 flex justify-center items-center">
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
    </div>
  )
}