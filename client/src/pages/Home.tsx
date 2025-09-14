// src/App.tsx (ejemplo con React y TypeScript)
import { useState, useEffect } from 'react';
import { io, Socket } from 'socket.io-client';

// Define la interfaz para los datos de los mensajes
interface SocketMessage {
  texto: string;
  status: string;
}
var estatus: string = "false";

const SERVER_URL = 'http://localhost:3000';

const Home = () => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [messages, setMessages] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState<string>('');
  const [Text, setText] = useState<string>('');

  useEffect(() => {
    const newSocket: Socket = io(SERVER_URL);

    newSocket.on('mensajeRecibido', (data: SocketMessage) => {
      setMessages(prev => [...prev, `Socket: ${data.texto}`]);
      setText(data.status)
    });

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  const handleSendMessage = () => {
    if ( Text == "false"){
      estatus = "true"
    }else{
      estatus = "false"
    }
    if (socket && inputValue) {
      socket.emit('enviarMensaje', { texto: inputValue , status: estatus} as SocketMessage);
      setInputValue('');
    }
  };

  const handleHttpTest = async () => {
    try {
      const response = await fetch(`${SERVER_URL}/saludo`);
      const data = await response.json();
      setMessages(prev => [...prev, `HTTP: ${data.mensaje}`]);
    } catch (error) {
      console.error('Error en la petición HTTP:', error);
    }
  };

  return (
    <div>
      <h1>Vite + React + TypeScript</h1>
      <div>
        {messages.map((msg, index) => <p key={index}>{msg}</p>)}
      </div>
      <input type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
      <button onClick={handleSendMessage}>Enviar por Socket</button>
      <button onClick={handleHttpTest}>Petición HTTP</button>
      <div>{Text}</div>
    </div>
  );
};

export default Home;