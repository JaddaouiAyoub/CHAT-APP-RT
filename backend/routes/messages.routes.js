import express from "express";
import { sendMessage,getMessages } from "../controllers/message.controller.js";
import protectRoute from "../middleware/protectRoute.js";
const router = express.Router();
router.get("/:id",protectRoute,getMessages);
router.post("/send/:id",protectRoute,sendMessage)
// if the function protectRoute passed successfully we pass to the next function 

export default router;