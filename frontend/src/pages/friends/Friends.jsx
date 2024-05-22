import { useEffect, useState } from "react";
import SearchInput from "../../components/sidebar/SearchInput";
import Conversations from "../../components/sidebar/Conversations";
import useGetConversations from "../../hooks/useGetConversations";
import ConversationsF from "../../components/friends/ConversationsF";
import { MdNavigateNext, MdNavigateBefore } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { IoReturnDownBackOutline } from "react-icons/io5";
import useGetUsers from "../../hooks/useGetUsers";

const Friends = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const { loading, conversations } = useGetUsers(); // Appel à votre méthode pour récupérer toutes les conversations
    const allConversations = conversations;
    const [conversations1, setConversations1] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [conversationsPerPage, setConversationsPerPage] = useState(6);
    const navigate = useNavigate();
    const handleHome = () => {
        navigate('/');
      };

    useEffect(() => {
        setConversations1(allConversations);
    }, [allConversations]);

    const filteredConversations = conversations1.filter((conversation) =>
        conversation.fullName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Gestion de la pagination
    const indexOfLastConversation = currentPage * conversationsPerPage;
    const indexOfFirstConversation = indexOfLastConversation - conversationsPerPage;
    const currentConversations = filteredConversations.slice(indexOfFirstConversation, indexOfLastConversation);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className='flex sm:h-[450px] md:h-[550px] rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
            <div className="border-r border-slate-500 p-4 flex flex-col justify-between">
                <div>
                    <SearchInput onChange={(value) => setSearchTerm(value)} />
                    <div className="divider px-3"></div>
                    <ConversationsF conversations={currentConversations} loading={loading} />
                </div>
                <div className="flex justify-end">
                    {currentPage > 1 && (
                        <button className="btn btn-primary mr-2" onClick={() => paginate(currentPage - 1)} title="Previous">
                            <MdNavigateBefore />
                        </button>
                    )}
                    {filteredConversations.length > indexOfLastConversation && (
                        <button className="btn btn-primary" onClick={() => paginate(currentPage + 1)} title="Next">
                            <MdNavigateNext />
                        </button>
                    )}
                </div>
            </div>
            <div className='mb-0 absolute bottom-4 left-4'>
            <IoReturnDownBackOutline className="w-6 h-6 cursor-pointer text-white" onClick={handleHome} />
        </div>
        </div>
        
    );
};

export default Friends;