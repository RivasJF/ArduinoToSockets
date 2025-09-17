import { Server, Socket } from "socket.io";

interface SocketMessage {
  message: string;
  status: boolean;
}
interface Tick{
  tick: boolean;
}

var status: boolean = false;

function changeStatus(): boolean {
  status= !status;
  return status;
}

export function setupSocket(io: Server) {
    io.on('connection', (socket: Socket) => {
    console.log('Cliente conectado por Socket.IO');

    // Escuchar el evento 'enviarMensaje'
    socket.on('enviarMensaje', (data: SocketMessage) => {
      console.log('Mensaje de Socket recibido:', data);
      io.emit('mensajeRecibido', data);
    });

    socket.on('chat:sendMessage', (data: Tick) => {
      console.log('Message of user:', data.tick);
      const messageForUser:SocketMessage = {
        message: "Mensaje enviado",
        status: changeStatus(),
      }
      io.emit('chat:receiveMessage', messageForUser);
    });

    socket.on('disconnect', () => {
      console.log('Cliente desconectado de Socket.IO');
    });
  });
}