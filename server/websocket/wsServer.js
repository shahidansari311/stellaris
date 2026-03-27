const { WebSocketServer } = require('ws');
const { getIndex, updateIndex } = require('../services/escalationIndex');
const { getCalmResponse } = require('../services/calmResponder');

let wss;
const clients = new Set();

const setupWebSocket = (server) => {
  wss = new WebSocketServer({ server });

  wss.on('connection', (ws) => {
    console.log('[CalmStream] Client connected to WebSocket');
    clients.add(ws);

    // Broadcast current state to the new client
    const currentScore = getIndex();
    const responseData = getCalmResponse(currentScore);
    ws.send(JSON.stringify({ 
      type: 'escalation_update', 
      score: currentScore,
      response: responseData.text,
      tags: responseData.tags
    }));

    // Periodically broadcast updates every 2s to simulate real-time engine activity
    const interval = setInterval(() => {
      if (ws.readyState === ws.OPEN) {
        const score = getIndex();
        const data = getCalmResponse(score);
        ws.send(JSON.stringify({ 
          type: 'escalation_update', 
          score: score,
          response: data.text,
          tags: data.tags
        }));
      }
    }, 2000);

    ws.on('message', (message) => {
      try {
        const data = JSON.parse(message);
        if (data.type === 'set_emotion') {
          const { emotion } = data.payload;
          const { getEmotionScore } = require('../services/emotionEngine');
          const newScore = getEmotionScore(emotion);
          const updatedScore = updateIndex(newScore);
          
          broadcastUpdate(updatedScore);
        }
      } catch (e) {
        console.error('Error parsing WebSocket message', e);
      }
    });

    ws.on('close', () => {
      console.log('[CalmStream] Client disconnected from WebSocket');
      clients.delete(ws);
      clearInterval(interval);
    });
  });
};

const broadcastUpdate = (score) => {
  const data = getCalmResponse(score);
  const message = JSON.stringify({ 
    type: 'escalation_update', 
    score: score,
    response: data.text,
    tags: data.tags
  });
  
  clients.forEach(client => {
    if (client.readyState === 1) { // OPEN
      client.send(message);
    }
  });
};

module.exports = { setupWebSocket };
