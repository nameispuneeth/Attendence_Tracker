import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
export default function SemDetails() {
    const navigate = useNavigate();
    const [selected, setSelected] = useState(new Date());
    const handleSubmit = () => {
        if (!selected) {
            alert("Date Is Required");
            return;
        }
        let days = Math.floor((new Date() - selected) / (1000 * 60 * 60 * 24));
        let months = Math.floor(days / 30);

        if (months >= 6) alert(`Not Possible`);
        else {
            sessionStorage.setItem("date", JSON.stringify(selected));
            navigate("/aitimetable")
        }
    }
    return (
        <div className="min-h-screen bg-[radial-gradient(circle_at_center,#2c2c2c,#0d0d0d)] flex flex-col justify-center items-center">
            <div className="rounded-2xl shadow-lg w-full max-w-lg bg-[rgba(0,0,0,0.4)] p-10">
                <div className="flex flex-col justify-center items-center space-y-12">
                    <p className="text-white font-extrabold text-2xl text-center break-words">When Will Semester Start?</p>
                    <div className="border-2 border-white p-8 rounded-lg space-y-8">
                        <DayPicker
                            mode="single"
                            selected={selected}
                            onSelect={setSelected}
                            classNames={{
                                caption_label: "text-white",
                                head_cell: "text-white font-extrabold",
                                day: "text-white",
                                month: "text-white",
                            }}
                        />
                        <p className="text-white font-light text-md">
                            {selected ? `Selected Date is : ${selected.toLocaleDateString()}` : "No Date Selected"}
                        </p>
                    </div>
                    <button
                        className="bg-[rgba(50,50,50,1)] text-base font-semibold text-white px-10 py-4 rounded-md text-md"
                        onClick={handleSubmit}
                    >
                        Submit
                    </button>
                </div>
            </div>
        </div>

    )
}