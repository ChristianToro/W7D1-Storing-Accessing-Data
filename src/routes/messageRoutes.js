const express = require('express');
const router = express.Router();
const messageLimiter = require('../middleware/rateLimit');  // Import the rate limiting middleware

router.post('/message', messageLimiter, (req, res) => {  // Apply rate limiting middleware
  const { message } = req.body;
  if (!message) {
    return res.status(400).send({ error: 'Message is required' });
  }
  res.send({ message: `Received: ${message}` });
});

module.exports = router;