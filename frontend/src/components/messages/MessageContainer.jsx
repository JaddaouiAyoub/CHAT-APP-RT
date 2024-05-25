import { useEffect, useState,useRef } from "react";
import useConversation from "../../zustand/useConversation";
import MessageInput from "./MessageInput";
import Messages from "./Messages"
import { TiMessages } from "react-icons/ti";
import MessageChatGptInput from "./MessageChatGptInput";
import MessageGpt from "./MessageGpt";
import { useAuthContext } from "../../context/AuthContext";
import { useSocketContext } from "../../context/SocketContext";
const MessageContainer = () => {
    const {selectedConversation,setSelectedConversation}=useConversation()
    const {authUser} = useSocketContext();
    useEffect(()=>{
        //cleanup function (unmounts)
        return ()=>{
            setSelectedConversation(null)
        }
    },[setSelectedConversation])


    const [messages, setMessages] = useState([]);

    const handleOnMessageSubmit = (message) => {
        setMessages((prevMessages) => [...prevMessages, message]);
    };

    
  const messageContainerRef = useRef(null); // Référence à la div contenant les messages

  // Effet pour faire défiler vers le bas lorsqu'un nouveau message est ajouté
  useEffect(() => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
    }
  }, [messages]); // Exécuter l'effet lorsque la liste des messages change
    return (
        <div className="md:min-w-[500px] flex flex-col">
            {!selectedConversation ? <NoChatSelected Name={authUser.fullName}/> : selectedConversation !== "ChatGpt" ? (
                   <>
                   {/* Header */}
                   <div className="bg-slate-500 px-4 py-2 mb-2">
                       <span className="label-text">TO</span>{" "}
                       <span className="text-gray-900 font-bold">{selectedConversation.fullName}</span>
                   </div>
       
                   <Messages />
                   <div style={{width : '98%' }}>
                     <MessageInput />
                   </div>
                   
                   </>
            ) : 
            
            <>
            <div className="md:min-w-[500px] flex flex-col">
                <div className="bg-slate-500 px-4 py-2 mb-2">
                       <span className="label-text">TO</span>{" "}
                       <span className="text-gray-900 font-bold">ChatGpt</span>
                </div>
                <div className="message-container" ref={messageContainerRef}>
                    {messages.map((message, index) => (
                    <MessageGpt key={index} message={message} />
                    ))}
                </div>
                <div style={{ position: 'fixed', bottom: 0,width : '61%' }}>
                   <MessageChatGptInput onMessageSubmit={handleOnMessageSubmit} />
                </div>
            </div>
                
                
            </> }
        </div>
    )
}

export default MessageContainer;

const NoChatSelected = ({Name}) => {
    return(
        <div className="flex items-center justify-center w-full h-full">
            <div className="px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2">
                <p>Welcome 👋 {Name} </p>
                <p>Select a chat to start messaging ❄️</p>
                <TiMessages className="text-3xl md:text-6xl text-center" />
            </div>
        </div>
    )
}
//Starter code 
// const MessageContainer = () => {
//     return (
//         <div className="md:min-w-[450px] flex flex-col">
//             <>
//             {/* Header */}
//             <div className="bg-slate-500 px-4 py-2 mb-2">
//                 <span className="label-text">TO</span>{" "}
//                 <span className="text-gray-900 font-bold">Ayoub Jad </span>
//             </div>

//             <Messages />
//             <MessageInput />
            
//             </>
//         </div>
//     )
// }

// export default MessageContainer;