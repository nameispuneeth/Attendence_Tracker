import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CurrAttendence() {
    const navigate = useNavigate();
    const [loading, setloading] = useState(false);
    let Spinner = () => {
        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="w-12 h-12 border-4 border-white border-t-blue-500 rounded-full animate-spin"></div>
            </div>
        );
    }
    // useEffect(() => {
    //     const functionCall = async () => {
    //         const timetable = JSON.parse(sessionStorage.getItem("timetable"));
    //         if (!timetable) {
    //             alert("Login Required");
    //             navigate("/");
    //         }
    //         setloading(true);
    //         const data = await fetch("http://localhost:8000/api/getClassesData", {
    //             method: "POST",
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             }, body:JSON.stringify( {
    //                 date: '15-07-2025',
    //                 timetable: timetable,
    //             })
    //         })
    //         const resp=await data.json();
    //         console.log(resp.data);
    //     }
    
    //     functionCall()
    //     setloading(false);

    // }, [navigate])

    return (
        <div className="relative h-screen bg-gray-900 flex flex-col justify-center items-center text-white space-y-10">
            {loading && Spinner()}
            <p className="font-extrabold text-2xl text-wrap text-center">Your Current Attendance Percentage : </p>
            <div className="flex space-x-5 items-center justify-center">
                <p className="text-2xl font-extrabold"> Sub1 - </p>
                <input type="number" className="no-spinner text-black h-12 w-20 text-center"></input>
                <p className="font-medium">Of</p>
                <input type="number" className="no-spinner text-black h-12 w-20 text-center"></input>
            </div>
        </div>
    )
}