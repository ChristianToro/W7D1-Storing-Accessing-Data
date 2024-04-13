const express = require('express');
const app = express();

app.use(express.json()); 


const messageRoutes = require('./routes/messageRoutes');
const movieRoutes = require('./routes/movieRoutes');


app.use('/api', messageRoutes);
app.use('/api', movieRoutes);

app.get('/', (req, res) => {
  res.send('Testing...1..2..3')
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});