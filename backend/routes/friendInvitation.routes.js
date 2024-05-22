// routes/friendInvitation.routes.js
import express from 'express';
import { sendFriendInvitation, acceptFriendInvitation, rejectFriendInvitation,getReceivedInvitations } from '../controllers/friendInvitation.controller.js';
// Assurez-vous que le middleware d'authentification est correctement configuré
import protectRoute from "../middleware/protectRoute.js";
const router = express.Router();

router.post('/send', protectRoute, sendFriendInvitation);
router.post('/accept/:invitationId', protectRoute, acceptFriendInvitation);
router.post('/reject/:invitationId', protectRoute, rejectFriendInvitation);
router.get('/', protectRoute, getReceivedInvitations);
export default router;
