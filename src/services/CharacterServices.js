const {
  default: axios
} = require('axios');
const express = require('express');
const router = express.Router();

const config = require('../config');
const createMd5 = require('../middleware/Md5Generation');
const memCaching = require('../middleware/Caching');
const totalCharacter = require ('../middleware/CountCharacters');

//Get all characters ID
router.get('/', [totalCharacter, memCaching(60), async (req, res, next) => {
  try {
    let records = [];
    let keepGoing = true;
    let offset = 0;
    let count = 0;

    while (keepGoing) {
      let response = await requestCharacterID(offset);
      count++;
      console.log([count, response.length]);

      await records.push.apply(records, response);
      offset += 100;
      if (response.length < 100) {
        keepGoing = false;
        res.status(200).send(records);
      }
    }

  } catch (e) {
    if(e.isAxiosError) {
      const err = e.response.data;
      res.status(err.code).json(err.status);
    }
  } finally {}
}]);

//Get characters by ID
router.get('/:id', async (req, res, next) => {
  try {
    //1011334;
    //1009146

    let hex = createMd5();
    let payload = await axios.get(`${config.marvel.API_DOMAIN}/characters/${req.params.id}`, {
      params: hex
    });

    const {
      results
    } = payload.data.data;

    //
    const filtered = ['id', 'name', 'description'].reduce((r, k) => ({
      ...r,
      [k]: results[0][k]
    }), {});
    res.status(200).json(filtered);
  } catch (e) {
    if(e.isAxiosError) {
      const err = e.response.data;
      res.status(err.code).json(err.status);
    }
  } finally {}
});

const requestCharacterID = async (offset) => {
  let hex = createMd5();
  let payload = await axios.get(`${config.marvel.API_DOMAIN}/characters`, {
    params: {
      ...hex,
      limit: 100,
      offset: offset
    }
  });

  //
  const {
    results
  } = payload.data.data;
  let filtered = results.map(a => a.id);
  return filtered;
}

module.exports = router;