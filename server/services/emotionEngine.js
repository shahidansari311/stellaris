/**
 * Emotion scoring logic for CalmStream
 * Maps emotion types to escalation score ranges (1-10)
 */
const emotionMap = {
  angry: { min: 8, max: 10 },
  sarcastic: { min: 6, max: 8 },
  frustrated: { min: 5, max: 7 },
  neutral: { min: 1, max: 3 }
};

const getEmotionScore = (emotion) => {
  const range = emotionMap[emotion] || emotionMap.neutral;
  // Add slight randomness for realism
  const base = range.min + Math.random() * (range.max - range.min);
  return Math.min(10, Math.max(1, parseFloat(base.toFixed(2))));
};

module.exports = { getEmotionScore };
