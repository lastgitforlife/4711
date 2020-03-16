const express = require('express');
const artistController = require('../controllers/artist');
const router = express.Router();

router.get('/artist', artistController.getAllPeople);

router.post('/newArtist', artistController.postAddArtist);

router.post('/artist/search', artistController.getFilteredArtists);

router.post('/artist/delete', artistController.postDeleteArtist);

module.exports = router;
