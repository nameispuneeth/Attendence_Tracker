import { useState } from "react";

export default function SignIn() {
    const [email,setemail]=useState("");
    const [password,setpassword]=useState("");
    const [loading,setloading]=useState(false);
      let Spinner = () => {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="w-12 h-12 border-4 border-white border-t-gray-700 rounded-full animate-spin"></div>
      </div>
    );
  }

    return (
        <div className="bg-[radial-gradient(circle_at_center,#2c2c2c,#0d0d0d)] flex flex-col justify-center items-center min-h-screen text-white p-6 overflow-hidden" >
            {loading && <Spinner/>}
            <div className="rounded-2xl shadow-lg p-10 w-full max-w-md bg-[rgba(0,0,0,0.4)] space-y-10">
                <p className="text-center font-extrabold text-4xl mb-8">LOGIN</p>
                <input type="email" className="w-full h-12 rounded-lg bg-[rgba(50,50,50,1)] text-center text-lg font-light" placeholder="Enter Your Email" value={email} onChange={(e)=>setemail(e.target.value)}></input>
                <input type="password" className="w-full h-12 rounded-lg bg-[rgba(50,50,50,1)] text-center text-lg font-light" placeholder="Enter Your Password" value={password} onChange={(e)=>setpassword(e.target.value)}></input>
                <button className="w-full h-14 rounded-lg bg-[#232121] border-2 border-gray-600 text-center text-lg font-bold">Login</button>
            </div>
        </div>
    )
}