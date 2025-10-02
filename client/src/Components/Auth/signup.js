import { Circle, CircleCheck } from "lucide-react"
import { useState } from "react"
export default function SignUp() {
    const [username, setusername] = useState('');
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
    const [containsDigit,setcontainsDigit]=useState(false);
    const [containsAlphabets,setContainsAlphabets]=useState(false);
    const [containsSymbol,setcontainsSymbol]=useState(false);
    const [loading,setloading]=useState(false);

      let Spinner = () => {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="w-12 h-12 border-4 border-white border-t-gray-700 rounded-full animate-spin"></div>
      </div>
    );
  }


    let handlePWDChange=(e)=>{
        let capitals=false,smalls=false;
        let symbols=false,digits=false;
        setpassword(e.target.value);
        for(let i of e.target.value){
            if(i>='A' && i<='Z') capitals=true;
            else if(i>='a' && i<='z') smalls=true;
            else if(i>='0' && i<='9') digits=true;
            else symbols=true;
        }
        setcontainsDigit(digits);
        setcontainsSymbol(symbols);
        setContainsAlphabets(capitals && smalls)
    }
    return (
        <div className="bg-[radial-gradient(circle_at_center,#2c2c2c,#0d0d0d)] flex flex-col justify-center items-center min-h-screen text-white p-6 overflow-hidden" >
                        {loading && <Spinner/>}

            <div className="rounded-2xl shadow-lg p-10 w-full max-w-md bg-[rgba(0,0,0,0.4)] space-y-10">
                <p className="text-center font-extrabold text-4xl mb-6">REGISTER</p>
                <input type="text" className="w-full h-12 rounded-lg bg-[rgba(50,50,50,1)] text-center text-lg font-light" placeholder="Enter Your Name" value={username} onChange={(e) => setusername(e.target.value)}></input>
                <input type="email" className="w-full h-12 rounded-lg bg-[rgba(50,50,50,1)] text-center text-lg font-light" placeholder="Enter Your Email" value={email} onChange={(e) => setemail(e.target.value)}></input>
                <div>
                    <input type="password" className="w-full h-12 rounded-lg bg-[rgba(50,50,50,1)] text-center text-lg font-light" placeholder="Enter Your Password" value={password} onChange={(e) =>handlePWDChange(e)}></input>
                    <div className="text-sm font-light mt-5">
                        <div className="flex items-center gap-2">
                            {password.length < 5 ? <Circle size={15} /> : <CircleCheck size={15} color={'green'} />}
                            <p>Minimum Length Of 5</p>
                        </div>
                        <div className="flex items-center gap-2">
                            {containsAlphabets ?  <CircleCheck size={15} color={'green'}/>:<Circle size={15} />}
                            <p>Contains Both UpperCase and LowerCase Letters</p>
                        </div>
                        <div className="flex items-center gap-2">
                            {containsDigit ?  <CircleCheck size={15} color={'green'}/>:<Circle size={15} />}
                            <p>Contains Atleast One Digit</p>
                        </div>
                        <div className="flex items-center gap-2">
                            {containsSymbol ?  <CircleCheck size={15} color={'green'}/>:<Circle size={15} />}
                            <p>Contains Atleast One Symbol </p>
                        </div>
                    </div>
                </div>
                <button className="w-full h-14 rounded-lg bg-[#232121] border-2 border-gray-600 text-center text-lg font-bold">Register</button>
            </div>
        </div>
    )
}