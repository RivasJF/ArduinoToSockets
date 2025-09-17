import { Server, Socket } from "socket.io";

// Interfaces para tipado (opcional, pero buena práctica)
interface ChatMessage {
  user: string;
  message: string;
}

interface Notification {
  title: string;
  content: string;
}

export function setupSocket(io: Server) {
  io.on('connection', (socket: Socket) => {
    console.log('Nuevo cliente conectado.');

    // --- Lógica para la comunicación de Chat ---
    // El cliente envía un mensaje usando el evento 'chat:sendMessage'
    socket.on('chat:sendMessage', (data: ChatMessage) => {
      console.log('Mensaje de chat recibido:', data);
      // El servidor retransmite el mensaje a todos los clientes
      io.emit('chat:receiveMessage', data);
    });

    // --- Lógica para la comunicación de Notificaciones ---
    // El cliente envía una notificación usando el evento 'notifications:send'
    socket.on('notifications:send', (data: Notification) => {
      console.log('Notificación recibida:', data);
      // El servidor retransmite la notificación
      io.emit('notifications:receive', data);
    });

    // Maneja la desconexión del cliente
    socket.on('disconnect', () => {
      console.log('Cliente desconectado.');
    });
  });
}