import { useState } from 'react'
import {BsSend} from 'react-icons/bs'
import useSendRequestGpt from '../../hooks/useSendRequestGpt';
const MessageChatGptInput = ({ onMessageSubmit }) => {  
    const [message,setMessage]=useState("");
    const {loading,sendMessage}=useSendRequestGpt();
    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!message) return;
        console.log("le message envoyé est Message :" , message);
        const messageSend={
          from:'user',
          message:message,
          time:new Date().toLocaleTimeString()
        }
        onMessageSubmit(messageSend);
        setMessage("");
        console.log(messageSend);
        const chatbot = await sendMessage(message);
        const messageResp={
          from:'chat',
          message:chatbot.result,
          time:new Date().toLocaleTimeString()
        }
        onMessageSubmit(messageResp);
      }
    return (
        <form className="pcx-4 my-3" onSubmit={handleSubmit}>
            <div className="w-full relative">
                <input type="text" 
                className="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 text-white" 
                placeholder="Send a message"
                value={message}
                onChange={(e)=>setMessage(e.target.value)}
                />
                <button type='submit' className="absolute inset-y-0 end-0 flex items-center px-3">
                  {loading? <div className='loading loading-spinner'></div> : <BsSend />}
                    
                </button>
            </div>
        </form>
      )
  
}

export default MessageChatGptInput