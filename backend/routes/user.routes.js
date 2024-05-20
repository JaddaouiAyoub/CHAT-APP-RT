import express from "express"
import protectRoute from "../middleware/protectRoute.js";
import { getUserForSidebar,getUserByUsername } from "../controllers/user.controller.js";
const router = express.Router();

router.get("/" ,protectRoute, getUserForSidebar);
router.get('/:username', getUserByUsername);
export default router ;