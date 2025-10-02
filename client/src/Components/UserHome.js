import { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom";

export default function UserHome() {
    const navigate = useNavigate()
    const [remainingClasses, setremainingClasses] = useState([]);
    const [CurrAttendence,setCurrAttendence]=useState(75.000);
    const [needToAttend, setneedtoAttend] = useState([["OverAll", 101, 404]]);
    useEffect(() => {
        let weeks = 0;
        const currattendence = JSON.parse(sessionStorage.getItem("attendence"));
        const requirements = JSON.parse(sessionStorage.getItem("requirement"));
        const timetable = JSON.parse(sessionStorage.getItem("timetable"));
        const startDate = new Date(JSON.parse(sessionStorage.getItem("date")));
        
        if(!currattendence || !requirements || !timetable || !startDate){
            navigate("/");
            return;
        }
            
        const temp = new Date() - startDate;
        const currWeeks = Math.floor(temp / (1000 * 60 * 60 * 24 * 7));
        weeks = 17 - currWeeks;
        let mp = new Map();
        timetable.forEach((row, i) => {
            row.forEach((val, j) => {
                const prevVal = mp.get(val) || 0;
                if (val != "") mp.set(val, prevVal + 1);
            })
        })
        const tempArr = []
        let totalClasses = 0;
        let totalclassesAttended = 0;
        let remainingClassesInSemester = 0;
        let CurrTemp=0;
        currattendence.forEach((row, ind) => {
            CurrTemp+=(parseInt(row[1])/parseInt(row[2]))*100;
            let classesInWeek = mp.get(row[0]) || 0;
            let totalClassesOfSub=(weeks * classesInWeek)+parseInt(row[2]);
            totalClasses += totalClassesOfSub;
            remainingClassesInSemester += (weeks * classesInWeek);
            totalclassesAttended += parseInt(row[1]);
            tempArr.push([row[0], parseInt(row[1]), totalClassesOfSub, weeks * classesInWeek]);
        })
        console.log(remainingClassesInSemester,totalclassesAttended,totalClasses);
        setCurrAttendence((CurrTemp/mp.size).toFixed(5))
        let requiredClasses = 0;
        if (requirements.overall === true) {
            requiredClasses = Math.ceil((requirements.reqAttendence / 100) * (totalClasses));
            requiredClasses -= totalclassesAttended;
            if (remainingClassesInSemester < requiredClasses) alert("Not Possible");
            setneedtoAttend([["Overall", requiredClasses, remainingClassesInSemester]]);
        } else {
            let tempNeed = [];
            tempArr.forEach((row, ind) => {
                let subject = row[0];
                let totalClassesSub = row[2];
                let AttendedClassesSub = row[1];
                console.log(row[0],totalClassesSub,AttendedClassesSub);
                let requiredClassesSub = Math.ceil((requirements.reqAttendence / 100) * (totalClassesSub));
                requiredClassesSub -= AttendedClassesSub;
                if (requiredClassesSub > totalClassesSub) alert(`${subject} Class Is Not Possible`);
                else tempNeed.push([subject, requiredClassesSub, row[3]]);
            })
            setneedtoAttend(tempNeed)
        }

    }, [])
    return (
        <div className="bg-[radial-gradient(circle_at_center,#2c2c2c,#0d0d0d)] flex flex-col justify-center items-center min-h-screen text-white p-6 overflow-hidden" >
            <div className="rounded-2xl shadow-lg p-10 w-full max-w-md bg-[rgba(0,0,0,0.4)]">
                <h2 className="text-3xl font-extrabold text-center mb-6 text-gray-300 ">
                    Attendance Summary
                </h2>
                <p className="text-base font-bold mb-5 mt-5 text-center">Your Current Attendence is : {CurrAttendence}% </p>

                <div className="space-y-4">
                    {needToAttend.map((row, ind) => (
                        <div
                            key={ind}
                            className="flex justify-between items-center cursor-pointer p-4 rounded-lg shadow-md bg-black hover:bg-[rgba(0,0,0,0.2)] transition"
                        >
                            <span className="font-semibold text-lg text-white">{row[0]}</span>
                            <span className="text-sm text-gray-300">
                                {row[1]} of {row[2]}
                            </span>
                        </div>
                    ))}
                </div>

                <button className="p-4 font-bold rounded-lg block mx-auto mt-10 mb-0 transition bg-[rgba(40,40,40,0.9)] hover:bg-[rgba(60,60,60,1)] text-white shadow-md" onClick={() => navigate("/requirement")}>
                    Change Requirement
                </button>
            </div>

        </div>

    )
}