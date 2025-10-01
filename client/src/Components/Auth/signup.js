import { Circle, CircleCheck } from "lucide-react"
import { useState } from "react"
export default function SignUp() {
    const [username, setusername] = useState('');
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
    let ContainsAlphabets=()=>{
        let uppercase=false,lowercase=false;
        for(let i of password){
            if(i>='a' && i<='z') lowercase=true;
            else if(i>='A' && i<='Z') uppercase=true;
        }
        return lowercase==true && uppercase==true;
    }
    return (
        <div className="bg-[radial-gradient(circle_at_center,#2c2c2c,#0d0d0d)] flex flex-col justify-center items-center min-h-screen text-white p-6 overflow-hidden" >
            <div className="rounded-2xl shadow-lg p-10 w-full max-w-md bg-[rgba(0,0,0,0.2)] space-y-10">
                <p className="text-center font-extrabold text-4xl mb-8">REGISTER</p>
                <input type="text" className="w-full h-12 rounded-lg bg-[rgba(50,50,50,1)] text-center text-lg font-light" placeholder="Enter Your Name" value={username} onChange={(e) => setusername(e.target.value)}></input>
                <input type="email" className="w-full h-12 rounded-lg bg-[rgba(50,50,50,1)] text-center text-lg font-light" placeholder="Enter Your Email" value={email} onChange={(e) => setemail(e.target.value)}></input>
                <div>
                    <input type="password" className="w-full h-12 rounded-lg bg-[rgba(50,50,50,1)] text-center text-lg font-light" placeholder="Enter Your Password" value={password} onChange={(e) => setpassword(e.target.value)}></input>
                    <div className="text-sm font-light mt-5">
                        <div className="flex items-center gap-2">
                            {password.length < 5 ? <Circle size={15} /> : <CircleCheck size={15} color={'green'} />}
                            <p>Minimum Length Of 5</p>
                        </div>
                        <div className="flex items-center gap-2">
                            {!ContainsAlphabets() ? <Circle size={15} /> : <CircleCheck size={15} color={'green'} />}
                            <p>Contains Both UpperCase and LowerCase Letters</p>
                        </div>
                        <div className="flex items-center gap-2">
                            {password.length < 5 ? <Circle size={15} /> : <CircleCheck size={15} color={'green'} />}
                            <p>Contains Atleast One Digit</p>
                        </div>
                        <div className="flex items-center gap-2">
                            {password.length < 5 ? <Circle size={15} /> : <CircleCheck size={15} color={'green'} />}
                            <p>Contains Atleast One Symbol </p>
                        </div>
                    </div>
                </div>
                <button className="w-full h-14 rounded-lg bg-[rgba(20,20,20,1)] text-center text-lg font-bold">Register</button>
            </div>
        </div>
    )
}