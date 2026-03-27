const express = require('express');
const router = express.Router();
const { getCalmResponse } = require('../services/calmResponder');

router.post('/calm-response', (req, res) => {
  const { score } = req.body;
  
  if (score === undefined) {
    return res.status(400).json({ error: 'Escalation score is required' });
  }

  const responseData = getCalmResponse(score);
  res.json({ response: responseData.text, tags: responseData.tags });
});

module.exports = router;
