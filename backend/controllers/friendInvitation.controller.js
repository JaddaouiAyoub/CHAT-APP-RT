// controllers/friendInvitation.controller.js
import FriendInvitation from '../models/friendInvitation.model.js';
import User from '../models/user.model.js';
// import { io } from '../socket/socket.js'; // Importez l'instance de Socket.io
import { getReceiverSocketId,io } from '../socket/socket.js';
export const sendFriendInvitation = async (req, res) => {
    try {
        const senderId = req.user._id;
        const { receiverId } = req.body;

        if (senderId === receiverId) {
            return res.status(400).json({ error: "You cannot send an invitation to yourself" });
        }

        // Vérifier si une invitation a déjà été envoyée
        const existingInvitation = await FriendInvitation.findOne({
            sender: senderId,
            receiver: receiverId
        });

        if (existingInvitation) {
            return res.status(400).json({ error: "You have already sent an invitation to this user" });
        }

        const invitation = new FriendInvitation({
            sender: senderId,
            receiver: receiverId
        });

        await invitation.save();
        const sender = await User.findById(senderId);
        // Envoyer l'invitation en temps réel via Socket.io
        const receiverSocketId = getReceiverSocketId(receiverId);
        if (receiverSocketId) {
            //console.log('friend Invitation', invitation);
            io.to(receiverSocketId).emit('friendInvitation', {
                invitation,
                senderName: sender.fullName
            });
        }
        console.log("Invitation sent successfully");
        res.status(200).json({ message: "Invitation sent successfully" });
    } catch (error) {
        console.error("Error in sendFriendInvitation", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const acceptFriendInvitation = async (req, res) => {
    try {
        const { invitationId } = req.params;
        const receiverId = req.user._id;

        const invitation = await FriendInvitation.findById(invitationId);

        if (!invitation || invitation.receiver.toString() !== receiverId.toString()) {
            return res.status(404).json({ error: "Invitation not found" });
        }

        // Ajouter les utilisateurs comme amis
        await User.findByIdAndUpdate(invitation.sender, {
            $addToSet: { friends: receiverId }
        });
        await User.findByIdAndUpdate(receiverId, {
            $addToSet: { friends: invitation.sender }
        });

        // Supprimer l'invitation après acceptation
        await FriendInvitation.findByIdAndDelete(invitationId);

        // Récupérer le nom du récepteur pour l'envoyer dans la notification
        const receiver = await User.findById(receiverId);

        // Notifier l'expéditeur que l'invitation a été acceptée
        const senderSocketId = getReceiverSocketId(invitation.sender.toString());
        if (senderSocketId) {
            io.to(senderSocketId).emit('invitationAccepted', {
                invitationId,
                receiverName: receiver.fullName
            });
        }

        res.status(200).json({ message: "Invitation accepted" });
    } catch (error) {
        console.error("Error in acceptFriendInvitation", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const rejectFriendInvitation = async (req, res) => {
    try {
        const { invitationId } = req.params;
        const receiverId = req.user._id;

        const invitation = await FriendInvitation.findById(invitationId);

        if (!invitation || invitation.receiver.toString() !== receiverId.toString()) {
            return res.status(404).json({ error: "Invitation not found" });
        }

        // Supprimer l'invitation après rejet
        await FriendInvitation.findByIdAndDelete(invitationId);

        // Récupérer le nom du récepteur pour l'envoyer dans la notification
        const receiver = await User.findById(receiverId);

        // Notifier l'expéditeur que l'invitation a été rejetée
        const senderSocketId = getReceiverSocketId(invitation.sender.toString());
        if (senderSocketId) {
            io.to(senderSocketId).emit('invitationRejected', {
                invitationId,
                receiverName: receiver.fullName
            });
        }

        res.status(200).json({ message: "Invitation rejected" });
    } catch (error) {
        console.error("Error in rejectFriendInvitation", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};
// Nouvelle fonction pour récupérer les invitations reçues par l'utilisateur connecté
export const getReceivedInvitations = async (req, res) => {
    try {
        const userId = req.user._id;

        const invitations = await FriendInvitation.find({ receiver: userId }).populate('sender', 'fullName profilePic');

        res.status(200).json(invitations);
    } catch (error) {
        console.error("Error in getReceivedInvitations", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};