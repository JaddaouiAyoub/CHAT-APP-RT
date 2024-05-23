// components/friends/FriendsInvitations.jsx
import React, { useState } from 'react';
import { MdCheck, MdClose, MdNavigateNext, MdNavigateBefore } from 'react-icons/md';
import useGetFriendInvitations from '../../hooks/useGetFriendInvitations';
import useNotification from '../../hooks/useNotification'; // Importez le hook
import Invitation from './Invitation';

const FriendsInvitations = ({ userId }) => {
  // const { loading, invitations: initialInvitations } = useGetFriendInvitations();
  const { invitations, setInvitations } = useNotification(userId); // Utilisez le hook
  const [currentPage, setCurrentPage] = useState(1);
  const invitationsPerPage = 6;

  const indexOfLastInvitation = currentPage * invitationsPerPage;
  const indexOfFirstInvitation = indexOfLastInvitation - invitationsPerPage;
  const currentInvitations = invitations.slice(indexOfFirstInvitation, indexOfLastInvitation);

  const handleAccept = async (invitationId) => {
    try {
      const token = localStorage.getItem('token'); // Récupérez le jeton d'authentification
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
      setInvitations((prevInvitations) => prevInvitations.filter(invitation => invitation._id !== invitationId));
    } catch (error) {
      console.error('Error accepting invitation', error);
    }
  };

  const handleReject = async (invitationId) => {
    try {
      const token = localStorage.getItem('token'); // Récupérez le jeton d'authentification
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
      setInvitations((prevInvitations) => prevInvitations.filter(invitation => invitation._id !== invitationId));
    } catch (error) {
      console.error('Error rejecting invitation', error);
    }
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // if (loading) return <p>Loading...</p>;

  return (
    <>
      <div className='flex sm:h-[450px] md:h-[550px] rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
        <div className="border-r border-slate-500 p-4 flex flex-col justify-between">
          <div>
            <h2>Invitations</h2>
            {currentInvitations.map((invitation, idx) => (
              <div key={invitation._id} className="flex justify-between items-center mb-2">
                <Invitation invitation={invitation} lastIdx={idx === currentInvitations.length - 1}/>
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
          <div className="flex justify-end">
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
        </div>
      </div>
    </>
  );
};

export default FriendsInvitations;
