import { Server, Socket } from "socket.io";

interface SocketMessage {
  texto: string;
  status: string;
}

export function setupSocket(io: Server) {
    io.on('connection', (socket: Socket) => {
    console.log('Cliente conectado por Socket.IO');

    // Escuchar el evento 'enviarMensaje'
    socket.on('enviarMensaje', (data: SocketMessage) => {
      console.log('Mensaje de Socket recibido:', data);
      io.emit('mensajeRecibido', data);
    });

    socket.on('disconnect', () => {
      console.log('Cliente desconectado de Socket.IO');
    });
  });
}