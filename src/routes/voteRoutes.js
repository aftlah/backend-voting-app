const express = require('express');
const router = express.Router();
const {vote,getResults} = require('../controllers/voteController');

router.post('/', vote);
router.get('/results', getResults);

module.exports = router;
