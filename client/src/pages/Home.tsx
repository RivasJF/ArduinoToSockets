// src/App.tsx
import { useState, useEffect } from 'react';
import { io, Socket } from 'socket.io-client';

// Define las interfaces para cada tipo de dato de socket
interface ChatMessage {
  user: string;
  message: string;
}

interface Notification {
  title: string;
  content: string;
}

const SERVER_URL = 'http://localhost:3000';

const Home = () => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState<string>('');

  useEffect(() => {
    // Se establece una única conexión con el servidor
    const newSocket: Socket = io(SERVER_URL);

    // Escucha eventos del chat
    newSocket.on('chat:receiveMessage', (data: ChatMessage) => {
      setChatMessages(prev => [...prev, data]);
    });

    // Escucha eventos de notificaciones
    newSocket.on('notifications:receive', (data: Notification) => {
      alert(`Nueva Notificación: ${data.title} - ${data.content}`);
    });

    setSocket(newSocket);

    // Función de limpieza para desconectar el socket al desmontar el componente
    return () => {
      newSocket.disconnect();
    };
  }, []); // El array vacío asegura que se ejecute solo una vez al montar

  const handleSendChat = () => {
    if (socket && inputValue) {
      const messageData: ChatMessage = {
        user: 'TuUsuario', // Puedes hacer que el usuario sea dinámico
        message: inputValue
      };
      // Emite el evento de chat
      socket.emit('chat:sendMessage', messageData);
      setInputValue('');
    }
  };

  const handleSendNotification = () => {
    if (socket) {
      const notificationData: Notification = {
        title: 'Alerta Importante',
        content: `Notificación enviada a las ${new Date().toLocaleTimeString()}`
      };
      // Emite el evento de notificación
      socket.emit('notifications:send', notificationData);
    }
  };

  return (
    <div>
      <h2>Chat en Tiempo Real</h2>
      <div style={{ border: '1px solid #ccc', padding: '10px', height: '200px', overflowY: 'scroll' }}>
        {chatMessages.map((msg, index) => (
          <p key={index}><strong>{msg.user}:</strong> {msg.message}</p>
        ))}
      </div>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Escribe un mensaje..."
      />
      <button onClick={handleSendChat}>Enviar Mensaje</button>

      <h2>Enviar Notificación</h2>
      <button onClick={handleSendNotification}>Enviar Notificación a Todos</button>
    </div>
  );
};

export default Home;