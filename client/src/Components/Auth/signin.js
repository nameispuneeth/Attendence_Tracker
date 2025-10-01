export default function SignIn() {
    return (
        <div className="bg-[radial-gradient(circle_at_center,#2c2c2c,#0d0d0d)] flex flex-col justify-center items-center min-h-screen text-white p-6 overflow-hidden" >
            <div className="rounded-2xl shadow-lg p-10 w-full max-w-md bg-[rgba(0,0,0,0.2)] space-y-10">
                <p className="text-center font-extrabold text-4xl mb-8">LOGIN</p>
                <input type="email" className="w-full h-12 rounded-lg bg-[rgba(50,50,50,1)] text-center text-lg font-light" placeholder="Enter Your Email"></input>
                <input type="password" className="w-full h-12 rounded-lg bg-[rgba(50,50,50,1)] text-center text-lg font-light" placeholder="Enter Your Password"></input>
                <button className="w-full h-14 rounded-lg bg-[rgba(20,20,20,1)] text-center text-lg font-bold">Login</button>
            </div>
        </div>
    )
}