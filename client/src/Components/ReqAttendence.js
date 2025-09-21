import { useState } from "react"
export default function ReqAttendence() {
    const [num, setnum] = useState(75);

    return (
        <div className="h-screen bg-gray-900 flex flex-col justify-center items-center space-y-12">
            <div className="flex flex-col justify-center items-center space-y-10">
                <p className="text-white text-wrap text-2xl text-center font-extrabold">Enter Your Required Attendence Percentage : </p>
                <input type="number" max={100} value={num} onChange={(e) => {
                    if (e.target.value.length <= 7 && e.target.value <= 100) setnum(e.target.value);
                }
                }
                    onKeyDown={(e) => {
                        if (["e", "E", "+", "-"].includes(e.key)) {
                            e.preventDefault();
                        }
                    }} className="h-16 text-center rounded-lg text-2xl no-spinner"></input>

            </div>
            <div className="flex space-x-10">
                <div className="flex space-x-2">
                    <input type="radio" name="attendence_type" className="cursor-pointer" defaultChecked />
                    <p className="text-white font-medium text-lg">Overall</p>
                </div>
                <div className="flex space-x-2">
                    <input type="radio" name="attendence_type" className="cursor-pointer" />
                    <p className="text-white font-medium text-lg">Per Subject</p>
                </div>
            </div>
            <button className="text-gray-900 border border-gray-300 bg-gray-300 shadow-lg px-5 py-3 text-lg rounded font-semibold">Submit</button>
        </div>
    )
}