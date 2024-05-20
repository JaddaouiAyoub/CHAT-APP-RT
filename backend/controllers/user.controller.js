import User from "../models/user.model.js";

export const getUserForSidebar = async (req,res) => {
    try {

        const loggedInUserId = req.user._id;

        const filtredUsers = await User.find({_id:{$ne:loggedInUserId}}).select("-password");

        res.status(200).json(filtredUsers);
    } catch (error) {
        console.error("Error in getUsersForSidebar", error.message)
        res.status(500).json({error : "Internal server error "});
    }
}

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