const express = require('express');
const router = express.Router();
const { getEmotionScore } = require('../services/emotionEngine');
const { updateIndex } = require('../services/escalationIndex');
const { getCalmResponse } = require('../services/calmResponder');

router.post('/analyze-emotion', (req, res) => {
  const { emotion } = req.body;
  
  if (!emotion) {
    return res.status(400).json({ error: 'Emotion type is required' });
  }

  const score = getEmotionScore(emotion);
  const updatedLiveScore = updateIndex(score);
  const responseData = getCalmResponse(updatedLiveScore);

  res.json({
    score: updatedLiveScore,
    response: responseData.text,
    tags: responseData.tags
  });
});

module.exports = router;
