import { Plus, Minus } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
export default function Subjects() {
    const navigate = useNavigate();
    const [cnt, setCnt] = useState(3);
    const [subjects, setSubjects] = useState(["Maths", "Physics", "Social"]);
    return (
        <div className="flex flex-col justify-center items-center bg-gray-900 space-y-10 min-h-screen ">
            <p className="text-white font-extrabold text-2xl sm:text-3xl">Enter Number Of Subjects : </p>
            <div className='space-y-6 flex flex-col items-center bg-gray-200 p-6 rounded-2xl shadow-md'>
                <div className="flex items-center gap-5 text-3xl text-gray-800 font-semibold">
                    <Minus className='cursor-pointer' onClick={() => {
                        if (cnt >= 3) {
                            setCnt(cnt - 1);
                            setSubjects(prev => prev.slice(0, -1));
                        }

                    }} />
                    <span className="w-10 text-center select-none">{cnt}</span>
                    <Plus className='cursor-pointer' onClick={() => {
                        if (cnt < 9) {
                            setCnt(cnt + 1);
                            setSubjects(prev => [...prev, ""]);
                        }
                    }} />
                </div>
            </div>
            {[...Array(cnt)].map((_, i) => (
                <div className='text-white flex gap-5 items-center bg-gray-200 p-4 rounded shadow-xl' key={i}>
                    <p className='text-gray-800'>Enter Subject - {i + 1}  :  </p>
                    <input type='text' className='text-gray-900 text-center border-b-2 border-gray-900 bg-gray-200 font-semibold focus:outline-none' value={subjects[i]} onChange={(e) => {
                        let tempSubjects = [...subjects];
                        tempSubjects[i] = e.target.value;
                        setSubjects(tempSubjects);
                    }}></input>
                </div>
            ))}
            <button className="border border-gray-300 bg-gray-200 px-5 py-2 rounded-lg shadow-xl hover:bg-gray-300 font-medium text-gray-800" onClick={() => {
                sessionStorage.setItem("subjects", JSON.stringify(subjects));
                navigate("/timetable");
            }}> Submit </button>
        </div>
    )
}