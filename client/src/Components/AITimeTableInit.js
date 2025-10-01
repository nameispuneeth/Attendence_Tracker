import { useState } from "react"
import { useNavigate } from "react-router-dom";
export default function AiTimeTableInit() {
  const [loading, setloading] = useState(false);
  let Spinner = () => {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="w-12 h-12 border-4 border-white border-t-blue-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  const navigate = useNavigate();
  const [File, setFile] = useState(null);
  const HandleSubmit = async (e) => {
    e.preventDefault();
    setloading(true);
    if (!File) return;
    const formData = new FormData();
    formData.append("file", File);
    const response = await fetch("http://localhost:8000/api/getData", {
      method: "POST",
      body: formData
    });
    setloading(false);
    const data = await response.json();
        console.log(data);

    if (!data.response || Object.keys(data.response).length === 0) alert("Enter A Valid TimeTable File");
    else {
      sessionStorage.setItem("prevtimetable", JSON.stringify(data.response));
      navigate("/timetable")
    }

  }
  return (
    <div className="bg-[radial-gradient(circle_at_center,#2c2c2c,#0d0d0d)] flex flex-col justify-center items-center min-h-screen text-white p-6 overflow-hidden" >
            <div className="rounded-2xl shadow-lg p-10 w-full max-w-lg bg-[rgba(0,0,0,0.2)]">
    <div className="relative flex justify-center items-center flex-col space-y-10">
      {loading && Spinner()}
      <form
        onSubmit={HandleSubmit}
        className="flex flex-col space-y-6 bg-[rgba(0,0,0,0.3)] p-6 rounded-2xl shadow-md"
      >
        <input
          type="file"
          accept="image/*,.pdf,.xlsx"
          onChange={(e) => setFile(e.target.files[0])}
          className="block w-full text-sm text-gray-700 
                     file:mr-4 file:py-2 file:px-4
                     file:rounded-lg file:border-0
                     file:text-sm file:font-semibold
                     file:bg-gray-700 file:text-white
                     hover:file:bg-gray-600 cursor-pointer"
        />

        <button
          type="submit"
          className="w-full py-2 px-4 bg-gray-800 text-white 
                     rounded-lg font-medium shadow-md
                     hover:bg-gray-700 transition duration-200"
        >
          Upload & Analyze
        </button>
      </form>
      <div className="flex justify-center align-middle gap-3">
        <div className="border-t-2 w-32 mt-3"></div>
        <p className="text-white font-semibold2">OR</p>
        <div className="border-t-2 w-32 mt-3"></div>
      </div>

      <p className="text-white font-bold text-sm px-6 py-3 border border-gray-800 bg-gray-800 rounded-lg shadow-md cursor-pointer hover:bg-gray-700 hover:shadow-2xl" onClick={() => navigate("/manually")}>Enter Manually</p>
    </div>
    </div>
    </div>

  )
}