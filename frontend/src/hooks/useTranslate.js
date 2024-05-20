import axios from 'axios';

const useTranslation = () => {
    const translateMessage = async (message, targetLanguage) => {
        try {
            // Vérifier que la langue cible n'est pas vide
            if (!targetLanguage) {
                throw new Error('La langue cible est vide.');
            }

            const response = await axios.get(
                `https://api.mymemory.translated.net/get?q=${encodeURIComponent(
                    message
                )}&langpair=en|${targetLanguage}`
            );

            // Vérifier si la réponse de l'API est valide
            if (response.status !== 200 || !response.data || !response.data.responseData || !response.data.responseData.translatedText) {
                throw new Error('Réponse de l\'API invalide.');
            }

            const translatedText = response.data.responseData.translatedText;
            return translatedText;
        } catch (error) {
            console.error('Erreur lors de la traduction:', error);
            return message; // Retourner le message d'origine en cas d'erreur
        }
    };

    return { translateMessage };
};

export default useTranslation;
