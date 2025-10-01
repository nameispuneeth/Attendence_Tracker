import { useState } from "react"
import { useNavigate } from "react-router-dom";
export default function ReqAttendence() {
    const [num, setnum] = useState(75);
    const [overall, setoverall] = useState(true);
    const navigate = useNavigate();
    return (
        <div className="h-screen bg-[radial-gradient(circle_at_center,#2c2c2c,#0d0d0d)] flex flex-col justify-center items-center">
            <div className="rounded-2xl shadow-lg p-5 w-full max-w-lg bg-[rgba(0,0,0,0.2)]">
                <div className="flex flex-col justify-center items-center space-y-8">
                    <p className="text-gray-200 break-words text-2xl text-center font-extrabold">Enter Your Required Attendence Percentage : </p>
                    <input type="number" max={100} value={num} onChange={(e) => {
                        if (e.target.value.length <= 7 && e.target.value <= 100) setnum(e.target.value);
                    }
                    }
                        onKeyDown={(e) => {
                            if (["e", "E", "+", "-"].includes(e.key)) {
                                e.preventDefault();
                            }
                        }} className="h-16 text-center bg-[rgba(0,0,0,0.5)] font-bold text-white rounded-lg text-2xl no-spinner"></input>


                    <div className="flex gap-10">
                        <div className="flex space-x-2">
                            <input type="radio" name="attendence_type" className="cursor-pointer" defaultChecked onChange={() => setoverall(true)} />
                            <p className="text-white font-medium text-lg">Overall</p>
                        </div>
                        <div className="flex justify-center space-x-2">
                            <input type="radio" name="attendence_type" className="cursor-pointer" onChange={() => setoverall(false)} />
                            <p className="text-white font-medium text-lg">Per Subject</p>
                        </div>
                    </div>
                    <button className="text-white border border-[rgba(0,0,0,1)] bg-[rgba(0,0,0,0.5)] shadow-lg px-5 py-3 text-base rounded-lg font-semibold flex justify-center" onClick={() => {
                        const requirements = {
                            reqAttendence: num,
                            overall: overall
                        }
                        sessionStorage.setItem("requirement", JSON.stringify(requirements));
                        navigate("/userhome")
                    }}>Submit</button>
                </div>

            </div>
        </div>
    )
}