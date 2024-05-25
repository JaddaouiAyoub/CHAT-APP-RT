import { Navigate, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/home/Home';
import { Route } from 'react-router-dom';
import Login from '../src/pages/login/Login';
import SignUp from '../src/pages/signup/SignUp';
import { Toaster } from 'react-hot-toast';
import { useAuthContext } from './context/AuthContext';
import Friends from './pages/friends/Friends';
import FriendsInvitations from './pages/friends/FriendsInvitations';
import Parametre from './pages/parametre/Parametre';
function App() {

 const {authUser} = useAuthContext()
  return (
   <div className='p-4 h-screen flex items-center justify-center'>
      <Routes>
        <Route path='/' element={authUser ? <Home /> : <Navigate to="/login" />} />
        <Route path='/login' element={authUser ? <Navigate to="/" /> : <Login />} />
        <Route path='/signup' element={authUser ? <Navigate to="/" /> : <SignUp />} />
        <Route path='/users' element={authUser? <Friends /> : <Home />} />
        <Route path='invitations' element={authUser? <FriendsInvitations /> : <Home />} />
        <Route path='/parametre' element={authUser? <Parametre /> : <Home />} />
      </Routes>
      <Toaster />
    </div>
    );
  
}

export default App
