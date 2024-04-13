const rateLimit = require('express-rate-limit');

const messageLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Too many requests from this IP, please try again after 15 minutes'
});

let messageCount = 0;
const maxMessages = 5;

const customMessageLimiter = (req, res, next) => {
    if (req.path === '/messages' && req.method === 'POST') {
        if (messageCount >= maxMessages) {
            return res.status(429).send({ error: 'Too Many Requests' });
        }
        messageCount++;
        next();
    } else {
        next();
    }
};

module.exports = {
  messageLimiter, 
  customMessageLimiter
};