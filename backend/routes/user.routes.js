import express from "express"
import protectRoute from "../middleware/protectRoute.js";
import { getUserForSidebar,getUserByUsername,getAllUsers } from "../controllers/user.controller.js";
const router = express.Router();

router.get("/" ,protectRoute, getAllUsers);
router.get("/friends" ,protectRoute, getUserForSidebar);
router.get('/:username', getUserByUsername);
export default router ;