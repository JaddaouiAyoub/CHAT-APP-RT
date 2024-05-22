import express from "express"
import dotenv from "dotenv"
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes.js";
import messagesRoutes from "./routes/messages.routes.js";
import userRoutes from "./routes/user.routes.js";

import connectToMongoDB from "./db/connectToMongoDB.js";
import { app,server } from "./socket/socket.js"
import friendInvitationRoutes from "./routes/friendInvitation.routes.js"; // Nouveau

const PORT = process.env.PORT || 5000;


dotenv.config();
app.use(express.json()); //to parse the incoming requests with json payloads (from req.body)
app.use(cookieParser()); //to be able to access to cookies 

app.use("/api/auth",authRoutes);
app.use("/api/messages",messagesRoutes);
app.use("/api/users",userRoutes);
app.use("/api/friend-invitations", friendInvitationRoutes); // Nouveau

server.listen(PORT,()=>{
    connectToMongoDB();

    console.log(`server running on port ${PORT}`)
});
