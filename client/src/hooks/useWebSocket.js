import { useEffect, useRef, useCallback } from 'react';
import { useEscalationContext } from '../context/EscalationContext';

const useWebSocket = (url) => {
  const { setScore, setResponse, setTags, active } = useEscalationContext();
  const socketRef = useRef(null);

  const connect = useCallback(() => {
    if (socketRef.current?.readyState === WebSocket.OPEN) return;

    socketRef.current = new WebSocket(url);

    socketRef.current.onopen = () => {
      console.log('[WebSocket] Connected');
    };

    socketRef.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'escalation_update') {
        setScore(data.score);
        setResponse(data.response);
        setTags(data.tags);
      }
    };

    socketRef.current.onclose = () => {
      console.log('[WebSocket] Disconnected. Retrying in 3s...');
      setTimeout(connect, 3000);
    };

    socketRef.current.onerror = (err) => {
      console.error('[WebSocket] Error', err);
    };
  }, [url, setScore, setResponse, setTags]);

  useEffect(() => {
    if (active) {
      connect();
    }
    return () => {
      if (socketRef.current) {
        socketRef.current.close();
      }
    };
  }, [active, connect]);

  const sendEvent = (type, payload) => {
    if (socketRef.current?.readyState === WebSocket.OPEN) {
      socketRef.current.send(JSON.stringify({ type, payload }));
    }
  };

  return { sendEvent };
};

export default useWebSocket;
