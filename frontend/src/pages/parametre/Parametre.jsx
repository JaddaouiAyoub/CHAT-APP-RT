import { IoReturnDownBackOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import { FaCheckCircle, FaCamera } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { useAuthContext } from '../../context/AuthContext';
import { useSocketContext } from '../../context/SocketContext';
import { useEffect, useState } from 'react';
import { uploadToCloud} from '../../hooks/useUploadToCloud';


const Parametre = () => {
    const { authUser, setAuthUser } = useSocketContext();
    const { socket } = useSocketContext();
    const navigate = useNavigate();
    const [fullName, setFullName] = useState(authUser.fullName);
    const [username, setUsername] = useState(authUser.username);
    const [profilePic, setProfilePic] = useState(authUser.profilePic);
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPasswordFields,setShowPasswordFields]=useState(false)
    const [file,setFile]=useState(null)
    const [change,setChange]=useState(false);
    const handleSave = async () => {
      try {
        const token = localStorage.getItem('chat-user');
        let cloudinaryUrl = profilePic;
  
        if (file) {
          console.log('file is loaded HHHH');
          cloudinaryUrl = await uploadToCloud(file);
          if (!cloudinaryUrl) {
            throw new Error("Error: Probleme de stockage de l'image");
          }
          console.log('cloudinary url', cloudinaryUrl);
          setProfilePic(cloudinaryUrl);
          setChange(false)
        } else {
          console.log('file is not loaded');
        }
  
        const requestBody = {
          fullName,
          username,
          profilePic: cloudinaryUrl,
          currentPassword,
          newPassword,
          confirmPassword,
        };
  
        const response = await fetch(`/api/users/update-profile`, {
          method: 'POST', // Change from PUT to POST
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestBody),
        });
  
        if (!response.ok) {
          throw new Error('Failed to update profile');
        }
  
        const updatedUser = await response.json();
        setAuthUser(updatedUser);
        localStorage.setItem("chat-user", JSON.stringify(updatedUser));

        
         toast.success('Profile updated successfully!');
      } catch (error) {
        toast.error(`Error updating profile: ${error.message}`);
      }
    };
  const handleHome = () => {
    navigate('/');
  };
  const handleProfilePicChange = (e) => {
    const file1 = e.target.files[0];
    setFile(file1);
    setChange(true)
  };
  return (
    <div className='flex min-h-[450px] min-w-[450px] rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
         <div className='flex flex-col p-2 w-full overflow-y-auto' style={{ maxHeight: '500px' }}>
      <div className='flex flex-col p-2 w-full'>
        <h1 className='text-white text-center mt-8'>Informations Personnelles</h1>
        <div className="profile-settings p-6 rounded-lg shadow-md max-w-md mx-auto">
          <div className="text-center text-white mb-4">
            <div className="relative inline-block">
              <img
                src={change? URL.createObjectURL(file):profilePic || 'default-profile.png'}
                alt="Profile"
                className="w-24 h-24 rounded-full mx-auto"
              />
              <label htmlFor="profilePicInput" className="absolute bottom-0 right-0 bg-blue-500 text-white p-2 rounded-full cursor-pointer">
                <FaCamera />
              </label>
              <input
                id="profilePicInput"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleProfilePicChange}
              />
            </div>
          </div>

          <div className="mb-1">
            <label className="block text-gray-100">Full Name:</label>
            <div className="flex items-center">
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="border rounded-lg p-2 flex-grow"
              />
              {fullName && <FaCheckCircle className="text-green-500 ml-2" />}
            </div>
          </div>

          <div className="mb-2">
            <label className="block text-gray-100">Username:</label>
            <div className="flex items-center">
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="border rounded-lg p-2 flex-grow"
                disabled
              />
              {username && <FaCheckCircle className="text-green-500 ml-2" />}
            </div>
          </div>

          <div className="mb-2">
            <label className="block text-gray-100">
              <input
                type="checkbox"
                checked={showPasswordFields}
                onChange={() => setShowPasswordFields(!showPasswordFields)}
                className="mr-2"
              />
              Change Password
            </label>
          </div>

          {showPasswordFields && (
            <>
              <div className="mb-2">
                <label className="block text-gray-100">Current Password:</label>
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="border rounded-lg p-2 w-full"
                />
              </div>
              <div className="mb-2">
                <label className="block text-gray-100">New Password:</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="border rounded-lg p-2 w-full"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-100">Confirm New Password:</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="border rounded-lg p-2 w-full"
                />
              </div>
            </>
          )}

          <button
            onClick={handleSave}
            className="bg-blue-500 text-white rounded-lg p-2 w-full"
          >
            Save
          </button>
        </div>
      </div>
      <div className='mb-0 absolute bottom-4 left-4'>
        <IoReturnDownBackOutline className="w-6 h-6 cursor-pointer text-white" onClick={handleHome} />
      </div>
    </div>
    </div>
  );
}

export default Parametre;
