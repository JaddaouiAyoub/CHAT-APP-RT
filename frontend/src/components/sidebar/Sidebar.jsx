import SearchInput from "./SearchInput"
import Conversations from "./Conversations"
import LogoutButton from "./LogoutButton"
import ChatGptConversation from "./ChatGptConversation"
import { useEffect, useState } from "react"
import useGetConversations from "../../hooks/useGetConversations"
import AddFriendButton from "./AddFriendButton"
import { IoIosPersonAdd } from 'react-icons/io';
import { FaUserFriends } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import InvitationBadge from "../friends/InvitationBadge"
const Sidebar = () => {

  const [searchTerm, setSearchTerm] = useState('');
  const {loading,conversations} = useGetConversations(); // Appel à votre méthode pour récupérer toutes les conversations
  const allConversations = conversations;
  const [conversations1, setConversations1] = useState([]);
  console.log(allConversations[1])
  const navigate = useNavigate();

  const handleAddFriend = () => {
    navigate('/users');
  };
  const handleInvitations = () => {
    navigate('/invitations');
  };

  useEffect(() => {
    setConversations1(allConversations);
  }, [allConversations]);

  const filteredConversations = conversations1.filter((conversation) =>
    conversation.fullName.toLowerCase().includes(searchTerm.toLowerCase())
  );


  return (
    <div className="border-r border-slate-500 p-4 flex flex-col">
        <SearchInput onChange={(value) => setSearchTerm(value)}/>
        <div className="divider px-3"></div>
        <ChatGptConversation />
         <Conversations conversations={searchTerm ? filteredConversations : allConversations} loading={loading}/>
         <div className="mt-auto" style={{ display: 'flex', gap: '300px' }}>
            <LogoutButton />
            <div style={{ display: 'flex', gap: '5px' }}>
            <div className="w-6 h-6 cursor-pointer " style={ { color: 'white' }} onClick={handleInvitations}>
            <InvitationBadge onClick={handleInvitations} />
            </div>
            <IoIosPersonAdd className="w-6 h-6 cursor-pointer  ml-3" style={ { color: 'white' }}   onClick={handleAddFriend}/>
            </div>
    </div>
          </div>
          
  )
}

export default Sidebar

//Starter code 

// import SearchInput from "./SearchInput"
// import Conversations from "./Conversations"
// import LogoutButton from "./LogoutButton"

// const Sidebar = () => {
//   return (
//     <div className="border-r border-slate-500 p-4 flex flex-col">
//         <SearchInput />
//         <div className="divider px-3"></div>
//          <Conversations />
//          <LogoutButton /> 
//     </div>
//   )
// }

// export default Sidebar