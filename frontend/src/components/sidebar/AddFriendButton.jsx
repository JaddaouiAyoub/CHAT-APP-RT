// components/sidebar/AddFriendButton.js
import { useState } from 'react';
import { IoIosPersonAdd } from 'react-icons/io';
import useSendFriendInvitation from '../../hooks/useSendFriendInvitation';
import toast from 'react-hot-toast';

const AddFriendButton = ({ receiverId }) => {
  const { sendFriendInvitation, loading } = useSendFriendInvitation();
  const [invitationSent, setInvitationSent] = useState(false);

  const handleClick = async () => {
    const response = await sendFriendInvitation(receiverId);
    if (response) {
      toast.success("Invitation envoyée avec success");
      setInvitationSent(true);
    }
  };

  return (
    <div className="mt-auto">
        <IoIosPersonAdd className="w-6 h-6" onClick={handleClick} style={ { color: 'white',cursor:"pointer" }}
        disabled={loading || invitationSent} title={invitationSent ? 'Invitation Sent' : 'Add Friend'}/>
    </div>
  );
};

export default AddFriendButton;
