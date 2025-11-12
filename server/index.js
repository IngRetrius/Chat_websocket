const express = require('express');
const {createServer} = require("node:http");
const {Server} = require("socket.io");
const port = 3000;
const app = express();
const server = createServer(app);

const io = new Server(server, {
    cors: {
        origin: "*",
    }
});

const messages = [];

io.on("connection", (socket) => {
    console.log("Usuario conectado: " + socket.id);

    socket.emit("initialMessages", messages);

    socket.on("userJoined", (username) => {
        console.log(`${username} se ha unido al chat`);
        const joinMessage = {
            username: "Sistema",
            text: `${username} se ha unido al chat`,
            timestamp: new Date().toISOString(),
            isSystem: true
        };
        messages.push(joinMessage);
        io.emit("newMessage", joinMessage);
    });

    socket.on("sendMessage", (messageData) => {
        const message = {
            username: messageData.username,
            text: messageData.text,
            timestamp: new Date().toISOString(),
            isSystem: false
        };
        messages.push(message);
        io.emit("newMessage", message);
    });

    socket.on("disconnect", () => {
        console.log("Usuario desconectado: " + socket.id);
    });
});

server.listen(port, () => {
    console.log(`Prendido en el puerto ${port}`);
});
