import useConversation from "../../zustand/useConversation";

const ChatGptConversation = () => {
    const {selectedConversation,setSelectedConversation}=useConversation()

    const isSelected = selectedConversation==="ChatGpt";
    const imgUrl = 'chatgpt-icon.png';
    return (
      <>
          <div className={`flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer 
          ${isSelected ? 'bg-sky-500' : '' } `}
          onClick={()=>{
            setSelectedConversation("ChatGpt")
        }}
          >
                <div className="avatar online">
                  <div className="w-12 rounded-full">
                      <img src={imgUrl} alt="CHI" />
                  </div>
               </div>
  
            <div className="flex flex-col flex-1 ">
              <div className="flex gap-3 justify-between">
                <p className="font-bold text-gray-200">ChatBot</p>
                <span className="text-xl">⭐</span>
              </div>
            </div>
          </div>
          <div className="divider my-0 py-0 h-1"/>
      </>
    )
  }
  

export default ChatGptConversation