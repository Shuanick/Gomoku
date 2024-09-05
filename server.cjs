const http = require("http");
const WebSocket = require("ws");

const server = http.createServer();
const wss = new WebSocket.Server({ server });

wss.on("connection", (ws) => {
  console.log('New client connected');
  
  ws.on("message", (message) => {
    try {
      const data = JSON.parse(message);
      if (data.type === "reset") {
        console.log('Broadcasting reset message');
        wss.clients.forEach((client) => {
          if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify({ type: "reset" }));
          }
        });
      } else {
        // 处理其他消息
        wss.clients.forEach(client => {
          if (client.readyState === WebSocket.OPEN) {
            client.send(message);
          }
        });
      }
    } catch (e) {
      console.error("Error parsing message:", e);
    }
  });

  ws.on("close", () => {
    console.log('Client disconnected');
  });

  ws.on("error", (error) => {
    console.error('WebSocket error:', error);
  });
});

const port = process.env.PORT || 3001;

server.listen(port, () => {
  console.log(`WebSocket server is listening on ws://localhost:${port}`);
});
