import { Plus, Minus } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
export default function Subjects() {
    const navigate = useNavigate();
    const [cnt, setCnt] = useState(3);
    const [subjects, setSubjects] = useState(["Maths", "Physics", "Social"]);
    return (
        <div className="min-h-screen bg-[radial-gradient(circle_at_center,#2c2c2c,#0d0d0d)] flex flex-col items-center">
            <div className="w-full max-w-lg bg-[rgba(0,0,0,0.4)] p-5 rounded-xl shadow-lg text-white space-y-8 mt-6 flex flex-col justify-center items-center">
                <p className="mt-10 text-white text-center font-extrabold text-2xl sm:text-3xl">Enter Number Of Subjects : </p>
                <div className='space-y-6 flex flex-col items-center bg-gray-200 p-6 rounded-2xl shadow-md max-w-40'>
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

                <div className=''>
                    {[...Array(cnt)].map((_, i) => (
                        <div className='text-white flex gap-5 items-center bg-gray-200 p-4 rounded shadow-xl m-2 mb-6' key={i}>
                            <p className='text-gray-800 text-xs md:text-base'>Enter Subject - {i + 1}  :  </p>
                            <input type='text' className='text-gray-900 text-center border-b border-gray-900 text-sm md:text-base bg-gray-200 font-semibold focus:outline-none ' value={subjects[i]} onChange={(e) => {
                                let tempSubjects = [...subjects];
                                tempSubjects[i] = e.target.value;
                                setSubjects(tempSubjects);
                            }}></input>
                        </div>
                    ))}
                </div>
                <button className="border border-gray-300 bg-gray-200 px-6 py-3 rounded-lg shadow-xl hover:bg-gray-300 font-medium text-gray-800" onClick={() => {
                    sessionStorage.setItem("subjects", JSON.stringify(subjects));
                    navigate("/timetable");
                }}> Submit </button>
            </div>
        </div>
    )
}