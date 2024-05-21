import { useAuthContext } from "../../context/AuthContext";

const MessageGpt = ({message}) => {
    const fromUser = message.from === "user"
    console.log('from est ',fromUser);
    const {authUser} = useAuthContext();
    const chatClassName = fromUser ? "chat-end" : "chat-start";
    const profilePic = fromUser ? authUser.profilePic : 'chatgpt-icon.png';
    const bubbleBgColor = fromUser ? 'bg-blue-500' : "";
    
      return (
        <div className={`chat ${chatClassName} max-w-[500px]`}>
            <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                    <img src={`${profilePic}`}
                        alt="Tailwind CSS chat bubble component"
                    />
                </div>
            </div>
            <div className={`chat-bubble text-white ${bubbleBgColor} pb-2`} >{message.message}</div>
            <div className="chat-footer opacity-50 text-x5 flex gap-1 items-center">{message.time}</div>
        </div>
      )
    }
    
  

export default MessageGpt