const express = require('express');
const cors = require('cors');
const http = require('http');
const dotenv = require('dotenv');
const { setupWebSocket } = require('./websocket/wsServer');

// Routes
const analyzeRouter = require('./routes/analyze');
const escalationRouter = require('./routes/escalation');
const responseRouter = require('./routes/response');

dotenv.config();

const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// Main Routes
app.use('/api', analyzeRouter);
app.use('/api', escalationRouter);
app.use('/api', responseRouter);

// Set up WebSockets
setupWebSocket(server);

server.listen(PORT, () => {
  console.log(`[CalmStream] Server initialized on port ${PORT}`);
});
