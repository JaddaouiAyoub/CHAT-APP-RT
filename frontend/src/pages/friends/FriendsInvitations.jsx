// components/friends/FriendsInvitations.jsx
import { useState, useEffect } from 'react';
import { MdCheck, MdClose, MdNavigateNext, MdNavigateBefore } from 'react-icons/md';
import { IoReturnDownBackOutline } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import { useSocketContext } from '../../context/SocketContext';
import Invitation from '../../components/friends/Invitation';
import useGetFriendInvitations from '../../hooks/useGetFriendInvitations';
import toast from 'react-hot-toast';

const FriendsInvitations = () => {
  const {  setInvitations } = useSocketContext();
  const {loading,invitations,error} = useGetFriendInvitations();
  const [currentPage, setCurrentPage] = useState(1);
  const invitationsPerPage = 6;
  const navigate = useNavigate();

  const indexOfLastInvitation = currentPage * invitationsPerPage;
  const indexOfFirstInvitation = indexOfLastInvitation - invitationsPerPage;
  const currentInvitations = invitations.slice(indexOfFirstInvitation, indexOfLastInvitation);

  if(error) toast.error(error);
  const handleHome = () => {
    navigate('/');
  };

  const handleAccept = async (invitationId) => {
    try {
      const token = localStorage.getItem('chat-user'); // Récupérez le jeton d'authentification
      const response = await fetch(`/api/friend-invitations/accept/${invitationId}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to accept invitation');
      }

      // Mettre à jour la liste des invitations après acceptation
      //setInvitations(invitations.filter(inv => inv._id !== invitationId));
      toast.success("invitation acceptée");
       // Mettre à jour la liste des invitations après acceptation
       window.location.reload();
    } catch (error) {
      console.error('Error accepting invitation', error);
    }
  };

  const handleReject = async (invitationId) => {
    try {
      const token = localStorage.getItem('chat-user'); // Récupérez le jeton d'authentification
      const response = await fetch(`/api/friend-invitations/reject/${invitationId}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to reject invitation');
      }

      // Mettre à jour la liste des invitations après rejet
      //setInvitations(invitations.filter(inv => inv._id !== invitationId));
      toast.error("invitation refusée");
       // Mettre à jour la liste des invitations après acceptation
       window.location.reload();
    } catch (error) {
      console.error('Error rejecting invitation', error);
    }
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) return <p>Loading...</p>;

  return (
    <>
      <div className='flex min-h-[450px] min-w-[450px] rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
        <div className='flex flex-col p-4 w-full'>
          <h1 className='text-white text-center mb-4'>Invitations</h1>
          {currentInvitations.map((invitation, idx) => (
            <div key={invitation._id} className="flex justify-between items-center mb-2">
              <Invitation invitation={invitation} lastIdx={idx === currentInvitations.length - 1} />
              <div className="flex gap-2">
                <button
                  className="btn btn-success"
                  onClick={() => handleAccept(invitation._id)}
                >
                  <MdCheck />
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => handleReject(invitation._id)}
                >
                  <MdClose />
                </button>
              </div>
            </div>
          ))}
         
        </div>
         <div className='mb-0 absolute bottom-4 left-4'>
            <IoReturnDownBackOutline className="w-6 h-6 cursor-pointer text-white" onClick={handleHome} />
        </div>
      </div>

      <div className="flex justify-end mt-4">
        {currentPage > 1 && (
          <button className="btn btn-primary mr-2" onClick={() => paginate(currentPage - 1)} title="Previous">
            <MdNavigateBefore />
          </button>
        )}
        {invitations.length > indexOfLastInvitation && (
          <button className="btn btn-primary" onClick={() => paginate(currentPage + 1)} title="Next">
            <MdNavigateNext />
          </button>
        )}
      </div>
      
    </>
  );
};

export default FriendsInvitations;
