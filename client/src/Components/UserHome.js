import { useEffect, useRef, useState } from "react"

export default function UserHome(){
    const [remainingClasses,setremainingClasses]=useState([]);

    const [needToAttend,setneedtoAttend]=useState([["OverAll",101,404]]);
    useEffect(()=>{
        let weeks=0;
        const currattendence=JSON.parse(sessionStorage.getItem("attendence"));
        const requirements=JSON.parse(sessionStorage.getItem("requirement"));
        const timetable=JSON.parse(sessionStorage.getItem("timetable"));
        const startDate=new Date(JSON.parse(sessionStorage.getItem("date")));
        const temp=new Date()-startDate;
        const currWeeks=Math.floor(temp/(1000*60*60*24*7));
        weeks=21-currWeeks;
        let mp=new Map();
        timetable.forEach((row,i)=>{
            row.forEach((val,j)=>{
                const prevVal=mp.get(val) || 0;
                if(val!="") mp.set(val,prevVal+1);
            })
        })
        const tempArr=[]
        let totalClasses=0;
        let totalclassesAttended=0;
        let remainingClassesInSemester=0;
        currattendence.forEach((row,ind)=>{
            let classesInWeek=mp.get(row[0])||0;
            totalClasses+=(21*classesInWeek);
            remainingClassesInSemester+=(weeks*classesInWeek);
            totalclassesAttended+=parseInt(row[1]);
            tempArr.push([row[0],parseInt(row[1]),21*classesInWeek,weeks*classesInWeek]);
        })
        let requiredClasses=0;
        if(requirements.overall===true){
            requiredClasses=Math.ceil((requirements.reqAttendence/100)*(totalClasses));
            requiredClasses-=totalclassesAttended;
            if(remainingClassesInSemester<requiredClasses) alert("Not Possible");
            setneedtoAttend([["Overall",requiredClasses,remainingClassesInSemester]]);
        }else{
            let tempNeed=[];
            tempArr.forEach((row,ind)=>{
                let subject=row[0];
                let totalClassesSub=row[2];
                let AttendedClassesSub=row[1];
                let requiredClassesSub=Math.ceil((requirements.reqAttendence/100)*(totalClassesSub));
                requiredClassesSub-=AttendedClassesSub;
                if(requiredClassesSub>totalClassesSub) alert(`${subject} Class Is Not Possible`);
                else tempNeed.push([subject,requiredClassesSub,row[3]]);
            })
            setneedtoAttend(tempNeed)
        }
        
    },[])
    return(
        <div className="bg-gray-800 flex flex-col justify-center items-center h-screen text-white space-y-10">
            {needToAttend.map((row,ind)=>(
                <p key={ind} className="text-xl font-bold">{row[0]} - {row[1]} of {row[2]}</p>
            ))}
        </div>
    )
}