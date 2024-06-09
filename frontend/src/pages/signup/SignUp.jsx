import { Link } from "react-router-dom";
import GenderChekBox from "./GenderChekBox";
import { useState } from "react";
import userSignup from "../../hooks/userSignup";

const SignUp = () => {
const [inputs,setInputs]=useState({
    fullName: '' ,
    username: '',
    password: '',
    confirmPassword : '',
    gender: ''
})

const handleCheckboxChange = (gender) => {
    setInputs({...inputs,gender:gender})

}

const {loading,signup} = userSignup()
const handleSubmit =async (e)=> {
    e.preventDefault();
    await signup(inputs)
    // console.log(inputs);
};

return (
    <div className='flex flex-col items-center justify-center min-w-custom mx-auto'>
        <div className='w-full p-8 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0 '>
            <h1 className='text-3x1 font-semibold text-center text-gray-200 ' style={{ fontSize: '1.5rem' }}>
                Sign Up <span className='text-blue-800'>ChatWave</span>
            </h1>

            <form onSubmit={handleSubmit}>
                <div>
                    <label className='label p-2'>
                        <span className='text-base label-text'>Full Name</span>
                    </label>
                    <input type="text" placeholder="Full Name" className='w-full input input-bordered h-10 bg-gray-200' 
                        value={inputs.fullName}
                        onChange={(e) => setInputs({ ...inputs, fullName: e.target.value})}
                    />
                </div>

                <div>
                    <label className='label'>
                        <span className='text-base label-text'>Username</span>
                    </label>
                    <input type="text" placeholder="username" className="w-full input input-bordered h-10 bg-gray-200"
                        value={inputs.username}
                        onChange={(e) => setInputs({ ...inputs, username:e.target.value})}
                     />
                </div>

                <div>
                    <label className='label'>
                        <span className='text-base label-text'>Password</span>
                    </label>
                    <input type="password" placeholder="Enter password" className="w-full input input-bordered h-10 bg-gray-200"
                        value={inputs.password} 
                        onChange={(e) => setInputs({...inputs, password: e.target.value})}
                        />
                </div>

                <div>
                    <label className='label'>
                        <span className='text-base label-text'>Confirm password</span>
                    </label>
                    <input type="password" placeholder="Confirm password" className="w-full input input-bordered h-10 bg-gray-200"
                        value={inputs.confirmPassword} 
                        onChange={(e) => setInputs({...inputs, confirmPassword: e.target.value})}
                       />
                </div>

                <GenderCheckBox onCheckboxChange = {handleCheckboxChange} selectedGender={inputs.gender} />

                <Link to='/login' className="text-sm hover:underline hover:text-blue-600 mt-2 inline-block">Already have an account?</Link>
                <div>
                    <button className='btn btn-block btn-sm mt-2 bg-gray-800' disabled={loading}>
                        {loading ? <span className='loading loading-spinner'></span> : "Sign Up"}
                    </button>
                </div>
            </form>
        </div>
    </div>
);
  
}

export default SignUp;

//Starter code for signUP component 

/* 
import GenderChekBox from "./GenderChekBox";

const SignUp = () => {
  return  <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
    <div className="w-full p-6 rounded-1g shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
        <h1 className="text-3xl font-semibold text-center text-gray-300">
            Sign Up
            <span className="text-blue-500"> ChatApp</span>
         </h1>

         <form>
            <label className="label p-2">
                <span className="text-base label-text">Full name</span> 
            </label> 
            <input type="text" placeholder="EX: Ayoub Jad" className="w-full input input-bordered h-10" />
            <div>
                <label className="label p-2">
                    <span className="text-base label-text">Username</span> 
                </label> 
                <input type="text" placeholder="Ayoubjad" className="w-full input input-bordered h-10" />
            </div>
            <div>
                <label className="label p-2">
                    <span className="text-base label-text">Password</span> 
                </label> 
                <input type="password" placeholder="Enter Password" className="w-full input input-bordered h-10" />
            </div>
            <div>
                <label className="label p-2">
                    <span className="text-base label-text">Confirm Password</span> 
                </label> 
                <input type="password" placeholder="Confirm Password" className="w-full input input-bordered h-10" />
            </div> 
            <GenderChekBox />
            <a href="#" className="text-sm hover:inderline hover:text-blue-600 mt-1 inline-block" >
                Already have an account?
            </a>
            <div>
                    <button className="btn btn-block btn-sm mt-2">Sign Up</button>
            </div>

         </form>
    </div>
  </div>;
  
}

export default SignUp;
*/