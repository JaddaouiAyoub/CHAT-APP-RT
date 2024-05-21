import SearchInput from "./SearchInput"
import Conversations from "./Conversations"
import LogoutButton from "./LogoutButton"
import ChatGptConversation from "./ChatGptConversation"
import { useEffect, useState } from "react"
import useGetConversations from "../../hooks/useGetConversations"

const Sidebar = () => {

  const [searchTerm, setSearchTerm] = useState('');
  const {loading,conversations} = useGetConversations(); // Appel à votre méthode pour récupérer toutes les conversations
  const allConversations = conversations;
  const [conversations1, setConversations1] = useState([]);

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
         <LogoutButton /> 
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