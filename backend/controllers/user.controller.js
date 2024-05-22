import User from "../models/user.model.js";

export const getUserForSidebar = async (req, res) => {
  try {
      const loggedInUserId = req.user._id;

      // Récupérer l'utilisateur connecté avec ses amis
      const loggedInUser = await User.findById(loggedInUserId).populate('friends', '-password');

      if (!loggedInUser) {
          return res.status(404).json({ error: "User not found" });
      }

      // Retourner la liste des amis
      res.status(200).json(loggedInUser.friends);
  } catch (error) {
      console.error("Error in getUserForSidebar", error.message);
      res.status(500).json({ error: "Internal server error" });
  }
};

export const getAllUsers = async (req, res) => {
  try {
      const loggedInUserId = req.user._id;

      // Rechercher les amis de l'utilisateur connecté
      const loggedInUser = await User.findById(loggedInUserId).select('friends');
      const friends = loggedInUser.friends;

      // Rechercher tous les utilisateurs sauf l'utilisateur connecté et ses amis, et exclure le champ mot de passe
      const users = await User.find({ _id: { $nin: [...friends, loggedInUserId] } }).select('-password');

      res.status(200).json(users);
  } catch (error) {
      console.error("Error in getAllUsers", error.message);
      res.status(500).json({ error: "Internal server error" });
  }
};
// Nouvelle fonction pour récupérer un utilisateur par son nom d'utilisateur
export const getUserByUsername = async (req, res) => {
    try {
        const { username } = req.params;

        if (!username) {
            return res.status(400).json({ error: "Username is required" });
        }

        const user = await User.findOne({ username }).select("-password");

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        res.status(200).json(user);
    } catch (error) {
        console.error("Error in getUserByUsername", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};