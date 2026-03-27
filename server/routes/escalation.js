const express = require('express');
const router = express.Router();
const { getIndex } = require('../services/escalationIndex');

router.get('/escalation-score', (req, res) => {
  res.json({ score: getIndex() });
});

module.exports = router;
