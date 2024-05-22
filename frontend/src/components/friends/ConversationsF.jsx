import useGetConversations from "../../hooks/useGetConversations"
import Conversation from "./Conversation"

const ConversationsF = ({ conversations,loading }) => {
    // const {loading,conversations} = useGetConversations();
    //console.log(conversations);

    return (
        <div className="py-2 flex flex-col overflow-y-auto" style={{ maxHeight: '100vh' }}>
            {loading ? <span className='loading loading-spinner mx-auto'></span> : null}
            <div>
                {conversations.map((conversation, idx) => (
                    <Conversation style={{ width: '100%' }}
                        key={conversation._id}
                        conversation={conversation}
                        lastIdx={idx === conversations.length - 1}
                    />
                ))}
            </div>
        </div>
    );
};

export default ConversationsF