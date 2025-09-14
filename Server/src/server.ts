import express, { Express } from "express";
import { PORT } from "./config.js";
import routes from "./Routes/index.routes.js";
import { Server as ServerSocketIO } from "socket.io";
import http from "http";
import { setupSocket } from "./socket.js";
import cors from "cors";

const app: Express = express(); // Renombré 'server' a 'app' por convención
const server: http.Server = http.createServer(app); // Este es el servidor principal que usarás

const io: ServerSocketIO = new ServerSocketIO(server, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST']
  }
});
app.use(cors({ origin: 'http://localhost:5173' }));

app.use(routes); // Express maneja las rutas HTTP
setupSocket(io); // Socket.IO maneja la comunicación en tiempo real

// Solo necesitas una llamada a listen, y debe ser en el servidor HTTP
server.listen(PORT, () => {
  console.log(`Server in Port: ${PORT}`);
});