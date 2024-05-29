import { useState } from "react"
import { Link } from "react-router-dom"
import useLogin from "../../hooks/useLogin"
//rface
const Login = () => {
    const [username , setUsername] = useState("");
    const [password , setPassword ] = useState("");
    
    const {loading,login} = useLogin()
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        await login(username,password)
    }
    return (
        <div className="font-sans text-lg">
            <div className='flex flex-col items-center justify-center min-w-custom mx-auto'>
            
                <div className='w-full p-8 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
                    <h1 className='text-3x1 font-bold text-center text-gray-300 ' style={{ fontSize: '1.5rem' }}>Login <span className='text-blue-800'> ChatApp</span>
                    </h1>
                    <form onSubmit= {handleSubmit}>
                        <div>
                            <label className='label p-2'>
                                <span className='text-base label-text' >Username</span>
                            </label>
                            <input type="text" placeholder="Enter username" className="w-full input input-bordered h-10 bg-gray-200"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)} />
                        </div>
                        <div>
                            <label className='label'>
                                <span className='text-base label-text'>Password</span>
                            </label>
                            <input type="password" placeholder="Enter password" className="w-full input input-bordered h-10 bg-gray-200"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)} />
                        </div>

                        <Link to='/signup' className="text-sm hover:underline hover:text-blue-600 mt-2 inline-block">Don't have an account?</Link>
                        <div>
                            <button className='btn btn-block btn-sm mt-2 bg-gray-300' disabled={loading}>
                                {loading ? <span className='loading loading-spinner'></span> : "Login"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login
//Starter code for this file 
/* 
//rface
const Login = () => {
  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
        <div className="w-full p-6 rounded-1g shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
            <h1 className="text-3xl font-semibold text-center text-gray-300">
                Login
                <span className="text-blue-500"> ChatApp</span>
            </h1>

            <form>
                <div>
                   <label className="label p-2">
                      <span className="text-base label-text">Username</span> 
                   </label> 
                   <input type="text" placeholder="Enter Username" className="w-full input input-bordered h-10" />
                </div>

                <div>
                   <label className="label p-2">
                      <span className="text-base label-text">Password</span> 
                   </label> 
                   <input type="password" placeholder="Enter Password" className="w-full input input-bordered h-10" />
                </div>

                <a href="#" className="text-sm hover:inderline hover:text-blue-600 mt-2 inline-block" >
                    {"Don't"} have account?
                </a>

                <div>
                    <button className="btn btn-block btn-sm mt-2">Login</button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default Login
*/