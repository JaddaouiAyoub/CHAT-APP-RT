import { useSocketContext } from '../../context/SocketContext';
import useConversation from '../../zustand/useConversation';
import AddFriendButton from '../sidebar/AddFriendButton';
const Invitation = ({invitation,lastIdx}) => {
 
  return (
    <>
        <div className={`flex gap-2 items-center hover:bg-sky-400 rounded p-2 py-1 `}>
              <div className={`avatar }`}>
                    <div className="w-12 rounded-full">
                    <img src={invitation.sender.profilePic} alt="user avatar" />
                </div>
        </div>

          <div className="flex flex-col flex-1 ">
            <div className="flex gap-3 justify-between">
              <p className="font-bold text-gray-200">{invitation.sender.fullName}</p>
            </div>
          </div>
        </div>
        {!lastIdx && <div className="divider my-0 py-0 h-1"/>}
    </>
  )
}

export default Invitation
