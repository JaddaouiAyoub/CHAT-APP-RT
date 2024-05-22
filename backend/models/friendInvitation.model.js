// models/friendInvitation.model.js
import mongoose from 'mongoose';

const friendInvitationSchema = new mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    receiver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'accepted', 'rejected'],
        default: 'pending'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const FriendInvitation = mongoose.model('FriendInvitation', friendInvitationSchema);

export default FriendInvitation;
