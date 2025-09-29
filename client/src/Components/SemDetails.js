import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
export default function SemDetails() {
    const navigate=useNavigate();
    const [selected, setSelected] = useState(new Date());
    const handleSubmit=()=>{
        if(!selected){
            alert("Date Is Required");
            return;
        }
        let days=Math.floor((new Date()-selected)/(1000*60*60*24));
        let months=Math.floor(days/30);
        let leftOverDays=days%30;

        if(months>=7 || (months===6 && leftOverDays!==0)) alert(`Not Possible`);
        else{
            sessionStorage.setItem("date",JSON.stringify(selected));
            navigate("/aitimetable")
        }
    }
    return (
        <div className="h-screen flex flex-col justify-center items-center bg-gray-800 space-y-12">
            <p className="text-white font-extrabold text-3xl text-center text-wrap">When Will Semester Starts ? </p>
            <div className="border-2 border-white p-5 rounded-lg space-y-5">
                <DayPicker
                    mode="single"
                    selected={selected}
                    onSelect={setSelected}
                    classNames={{
                        caption_label: "text-white",
                        head_cell: "text-white font-extrabold",
                        day: "text-white",
                        month: "text-white ",
                    }}

                />
                <p className="text-white font-light text-md">{selected ? `Selected Date is : ${selected.toLocaleDateString()}` : "No Date Selected"}</p>
            </div>
            <button className="bg-white px-5 py-3 rounded-md text-md" onClick={()=>handleSubmit()}>Submit</button>
        </div>
    )
}