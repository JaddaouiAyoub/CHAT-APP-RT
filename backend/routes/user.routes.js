import express from "express"
import protectRoute from "../middleware/protectRoute.js";
import { getUserForSidebar,getUserByUsername,getAllUsers,updateUserProfile } from "../controllers/user.controller.js";
const router = express.Router();

router.get("/" ,protectRoute, getAllUsers);
router.get("/friends" ,protectRoute, getUserForSidebar);
router.get('/:username', getUserByUsername);
router.post('/update-profile', protectRoute, updateUserProfile);

export default router ;