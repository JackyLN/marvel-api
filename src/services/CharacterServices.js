const { default: axios } = require('axios');
const express = require('express');
const router = express.Router();

const config = require('../../config');
const createMd5 = require('../middleware/Md5Generation');


//Get all characters ID
router.get('/', async (req, res, next) => {

  let hex = createMd5();
  let result = await axios.get(`https://gateway.marvel.com/v1/public/characters`, {
    params: {
      ts: hex.timespan,
      apikey: config.marvel.PUBLIC_KEY,
      hash: hex.hash
    }
  });
  res.status(200).send(result.data);
});

//Get characters by ID
router.get('/:id', async (req, res, next) => {
  let id = req.params.id;
  //1011334;
  let hex = createMd5();
  let result = await axios.get(`https://gateway.marvel.com/v1/public/characters/${id}`, {
    params: {
      ts: hex.timespan,
      apikey: config.marvel.PUBLIC_KEY,
      hash: hex.hash
    }
  });

  res.status(200).send(result.data);
});

module.exports = router;