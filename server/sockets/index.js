import { Server } from "socket.io";

let io;

export const initSocket = (httpServer, corsOptions) => {
    io = new Server(httpServer, {
        cors: corsOptions
    });

    io.on("connection", (socket) => {
        socket.on("register", (userId) => {
            if (userId) socket.join(userId);
        });

        socket.on("disconnect", () => {});
    });

    return io;
};

export const getIO = () => io;

export const emitNotification = (targetUserId, notification) => {
    if (io && targetUserId) {
        io.to(String(targetUserId)).emit("notification", notification);
    }
};
