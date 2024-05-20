import { useState } from "react"
import toast from "react-hot-toast";
import axios from 'axios';
const useSendRequestGpt = () => {
    const [loading,setLoading] = useState(false)


    const sendMessage = async (message) => {
        setLoading(true)    
        const options = {
            method: 'POST',
            url: 'https://chatgpt-42.p.rapidapi.com/gpt4',
            headers: {
              'content-type': 'application/json',
              'X-RapidAPI-Key': '1c8b9763d9mshafd0b292952042cp16c28ejsnae580d916dc8',
              'X-RapidAPI-Host': 'chatgpt-42.p.rapidapi.com'
            },
            data: {
              messages: [
                {
                  role: 'user',
                  content: message
                }
              ],
              web_access: false
            }
          };
          
  
      try {
        const response = await axios.request(options);
        if(response.error) throw new Error(response.error) 
        const chatbotResponse = response.data;
        console.log('la reponse de gpt ',response.data, chatbotResponse);
        return chatbotResponse;
        } catch (error) {
             toast.error(error.message)
        }finally{
            setLoading(false)
        }
    }
    return {sendMessage,loading}
}

export default useSendRequestGpt