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