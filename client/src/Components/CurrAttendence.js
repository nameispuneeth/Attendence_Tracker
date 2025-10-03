import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import React from "react";
export default function CurrAttendence() {
    const navigate = useNavigate();
    const [loading, setloading] = useState(false);
    const [subClasses, setSubClasses] = useState([]);
    let HandleSubmit = () => {
        sessionStorage.setItem("attendence", JSON.stringify(subClasses));
        navigate("/requirement")
    }
    let Spinner = () => {
        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="w-12 h-12 border-4 border-white border-t-gray-700 rounded-full animate-spin"></div>
            </div>
        );
    }

    useEffect(() => {
        if (sessionStorage.getItem("timetable") && sessionStorage.getItem("date")) {
            const timetable = JSON.parse(sessionStorage.getItem("timetable"));
            const startDate = new Date(JSON.parse(sessionStorage.getItem("date")));
            const weeks = Math.ceil((new Date() - startDate) / (1000 * 60 * 60 * 24 * 7));
            const OccuredWeeks=[0,1,2,3,4,5,6,7,8,9,9,9,10,11,11,12,13,14,15,16];
            const mp = new Map();
            timetable.map((row, i) => {
                row.map((val, j) => {
                    const prevVal = mp.get(val) || 0;
                    if (val != "") mp.set(val, prevVal + 1);
                })
            })
            console.log(weeks,OccuredWeeks[weeks])
            const tempArr = [];
            mp.forEach((val, key) => {
                tempArr.push([key, val * OccuredWeeks[weeks], val * OccuredWeeks[weeks]]);
            })
            setSubClasses(tempArr)

        } else {
            alert("TimeTable Required");
            return;
        }
    }, [])
    return (
        <div className="min-h-screen bg-[radial-gradient(circle_at_center,#2c2c2c,#0d0d0d)] flex flex-col justify-center items-center">
            <div className="w-full max-w-lg bg-[rgba(0,0,0,0.4)] p-5 rounded-xl shadow-lg text-white">
                <p className="text-center mb-12 text-3xl font-extrabold">Current Attendence</p>
                <div className="grid grid-cols-5 gap-4 items-center">
                    {subClasses.map((row, rInd) => (
                        <React.Fragment key={rInd}>
                            <p className="text-lg font-extrabold">{row[0]} </p>
                            <p className="text-xl">:</p>

                            <input
                                type="number"
                                className="no-spinner text-black h-12 w-full text-center rounded"
                                value={row[1]}
                                onChange={(e) => {
                                    let val = e.target.value === "" ? 0 : e.target.value;
                                    if (val <= row[2]) {
                                        setSubClasses(
                                            subClasses.map((r, rind) =>
                                                rind === rInd ? [r[0], val, r[2]] : r
                                            )
                                        );
                                    }
                                }}
                            />

                            <p className="text-center font-medium">Of</p>

                            <input
                                type="number"
                                className="no-spinner text-black h-12 w-full text-center rounded"
                                value={row[2]}
                                 onChange={(e) => {
                                    let val = e.target.value === "" ? 0 : e.target.value;
                                    if (val >= row[1]) {
                                        setSubClasses(
                                            subClasses.map((r, rind) =>
                                                rind === rInd ? [r[0], r[1], val] : r
                                            )
                                        );
                                    }
                                }}
                            />
                        </React.Fragment>
                    ))}
                </div>

                <button
                    className="mt-8 bg-black px-6 py-4 rounded-lg shadow-xl hover:bg-[rgba(31,31,31,1)] font-medium text-gray-200 w-full"
                    onClick={HandleSubmit}
                >
                    Submit
                </button>
            </div>

        </div>
    )
}