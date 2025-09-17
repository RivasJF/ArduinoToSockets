// src/App.tsx
import { useState, useEffect } from 'react';
import { io, Socket } from 'socket.io-client';
import config from '../config/config';

// Define las interfaces necesarias
interface SocketMessage {
  message: string;
  status: boolean;
}

interface Tick{
  tick: boolean;
}

const Home = () => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [messages, setMessages] = useState<string>();
  const [status, setStatus] = useState<boolean | null>(null); // Inicializa como null para evitar errores

  useEffect(() => {
    const newSocket: Socket = io(config.API_URL);

    // Escucha el evento de respuesta del servidor 'chat:receiveMessage'
    newSocket.on('chat:receiveMessage', (data: SocketMessage) => {
      setMessages(data.message);
      setStatus(data.status);
    });

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  const handleSendMessage = () => {
    if (socket) { // No necesitas el `inputValue` aquí si el servidor solo regresa un mensaje fijo
      const tickData: Tick = { tick: true };
      socket.emit('chat:sendMessage', tickData);
    }
  };


  return (
    <div>
      <h1>Comunication Socket.io</h1>
      <div>{messages}</div>
      <button onClick={handleSendMessage}>Enviar por Socket</button>
      <div>Estado del Servidor: {status !== null ? String(status) : 'N/A'}</div>
    </div>
  );
};

export default Home;