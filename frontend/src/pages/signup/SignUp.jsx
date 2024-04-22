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
            
            {/* Gender chekbox to be done here */}
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