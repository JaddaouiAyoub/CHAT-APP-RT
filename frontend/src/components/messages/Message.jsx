import  { useEffect, useState } from 'react';
import { useAuthContext } from '../../context/AuthContext';
import { extractTime } from '../../utils/extractTime';
import useConversation from '../../zustand/useConversation';
import useTranslation from '../../hooks/useTranslate';

const Message = ({ message }) => {
    const { authUser } = useAuthContext();
    const { selectedConversation } = useConversation();
    const { translateMessage } = useTranslation();
    const [translatedMessage, setTranslatedMessage] = useState(null);

    const fromMe = message.senderId === authUser._id;
    const formattedTime = extractTime(message.createdAt);
    const chatClassName = fromMe ? 'chat-end' : 'chat-start';
    const profilePic = fromMe ? authUser.profilePic : selectedConversation.profilePic;
    const bubbleBgColor = fromMe ? 'bg-blue-500' : '';
    const shakeClass = message.shouldShake ? 'shake' : '';
    const [showLanguageMenu, setShowLanguageMenu] = useState(false); // État pour afficher/masquer le menu de langue

    const [targetLanguage, setTargetLanguage] = useState(''); // Langue par défaut

     // Effet pour traduire le message lorsqu'une nouvelle langue est sélectionnée
     useEffect(() => {
      const fetchTranslation = async () => {
          if (targetLanguage) {
              const translatedText = await translateMessage(message.message, targetLanguage);
              setTranslatedMessage(translatedText);
          }
      };

      fetchTranslation();
  }, [message.message, targetLanguage, translateMessage]);

  const handleChangeLanguage = async (language) => {
      setTargetLanguage(language);
      setShowLanguageMenu(false); // Ferme le menu déroulant après avoir sélectionné une langue
  };
    return (
      <div className={`chat ${chatClassName} max-w-[500px]`} >
      <div className="chat-image avatar">
          <div className="w-10 rounded-full">
              <img src={profilePic} alt="Avatar" />
          </div>
      </div>
     
      <div className="flex items-center">
                <div className={`chat-bubble text-white ${bubbleBgColor} ${shakeClass} pb-2`}>
                    {translatedMessage || message.message}
                </div>

                {!fromMe && (
                <div className="relative ml-1">
                    <img
                        className="translate-icon w-6 h-6 mr-2 cursor-pointer opacity-50 hover:opacity-100 transition-opacity duration-300"
                        src="traductionIcon.jpg"
                        alt="Translate Icon"
                        onClick={() => setShowLanguageMenu(!showLanguageMenu)} // Affiche/masque le menu de langue lorsqu'on clique sur l'icône
                    />
                    {showLanguageMenu && (
                        <div className="absolute top-8 right-0 z-10 bg-white shadow-md rounded-md">
                            <ul>
                                <li><button className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left" onClick={() => handleChangeLanguage('fr')}>Français</button></li>
                                <li><button className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left" onClick={() => handleChangeLanguage('es')}>Espagnol</button></li>
                                <li><button className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left" onClick={() => handleChangeLanguage('it')}>Italy</button></li>
                                {/* Ajoutez d'autres langues si nécessaire */}
                            </ul>
                        </div>
                    )}
                </div>
            )}
            </div>
      <div className="chat-footer opacity-50 text-x5 flex gap-1 items-center">{formattedTime}</div>
  </div>
);
 
};

export default Message;
