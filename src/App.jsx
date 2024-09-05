import React, { useState, useEffect } from "react";
import Board from "./Board";


function App() {
  const [socket, setSocket] = useState(null);
  const [move, setMove] = useState(null);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:3001');
  
    ws.addEventListener('open', () => {
      console.log('WebSocket connection opened');
    });
  
    ws.addEventListener('message', event => {
      let data;
  
      if (event.data instanceof Blob) {
        const reader = new FileReader();
        
        reader.onload = () => {
          try {
            data = JSON.parse(reader.result);
            handleData(data);
          } catch (e) {
            console.error('Error parsing Blob message:', e);
          }
        };
  
        reader.readAsText(event.data);
      } else {
        try {
          data = JSON.parse(event.data);
          handleData(data);
        } catch (e) {
          console.error('Error parsing text message:', e);
        }
      }
    });
  
    ws.addEventListener('close', () => {
      console.log('WebSocket connection closed');
    });
  
    ws.addEventListener('error', (event) => {
      console.error('WebSocket error observed:', event.message);
    });
  
    setSocket(ws);
  
    return () => {
      if (ws) {
        ws.close();
      }
    };
  }, []);
  
  const handleData = (data) => {
    if (data.type === "reset") {
      window.location.reload();
    } else {
      console.log('Received data:', data);
      setMove(data);
    }
  };
  
  const sendMove = (move) => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify(move));
    }
  };

  return (
    <div>
      <Board sendMove={sendMove} move={move} socket={socket}/>
    </div>
  );
}

export default App;
