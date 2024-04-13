const express = require('express');
const router = express.Router();
const Movie = require('../models/movie'); 

router.post('/movies', async (req, res) => {
    try {
      const movie = await Movie.create(req.body);
      res.status(201).send(movie);
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  });
  
  
  router.get('/movies', async (req, res) => {
    const { page, size } = req.query;
    const limit = size ? +size : 3;
    const offset = page ? page * limit : 0;
  
    const movies = await Movie.findAndCountAll({ limit, offset });
    res.send({ data: movies.rows, total: movies.count });
  });
  
  
  router.put('/movies/:id', async (req, res) => {
    try {
      const result = await Movie.update(req.body, {
        where: { id: req.params.id }
      });
      if (result[0] === 0) {
        return res.status(404).send({ error: 'Movie not found' });
      }
      res.send({ message: 'Movie updated successfully' });
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  });
  
  
  router.delete('/movies/:id', async (req, res) => {
    try {
      const result = await Movie.destroy({
        where: { id: req.params.id }
      });
      if (result === 0) {
        return res.status(404).send({ error: 'Movie not found' });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  });

module.exports = router;