/**
 * Computes rolling 1-10 Escalation Index
 * Applies contextual buffering (5-second emotional memory concept)
 */
let liveIndex = 1;
const history = [];
const BUFFER_SIZE = 5;

const updateIndex = (newScore) => {
  history.push(newScore);
  if (history.length > BUFFER_SIZE) {
    history.shift();
  }
  // Average of history to simulate emotional inertia
  const sum = history.reduce((a, b) => a + b, 0);
  liveIndex = parseFloat((sum / history.length).toFixed(2));
  return liveIndex;
};

const getIndex = () => liveIndex;
const resetIndex = () => {
  liveIndex = 1;
  history.length = 0;
};

module.exports = { getIndex, updateIndex, resetIndex };
