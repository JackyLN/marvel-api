const {
  default: axios
} = require('axios');
const express = require('express');
const router = express.Router();

const config = require('../config');
const createMd5 = require('../middleware/Md5Generation');
const memCaching = require('../middleware/Caching');

//Get all characters ID
router.get('/', memCaching(20), async (req, res, next) => {
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
      offset+=100;
      if (response.length < 100) {
        keepGoing = false;
        res.status(200).send(records);
      }
    }

  } catch (e) {
    console.log(e.message)
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

//Get characters by ID
router.get('/:id', async (req, res, next) => {
  try {
    //1011334;
    //1009146

    let hex = createMd5();
    let axiosResponse = await axios.get(`${config.marvel.API_DOMAIN}/characters/${req.params.id}`, {
      params: hex
    });

    //
    const {
      results
    } = axiosResponse.data.data;
    const filtered = ['id', 'name', 'description'].reduce((r, k) => ({
      ...r,
      [k]: results[0][k]
    }), {});
    res.status(200).send(filtered);
  } catch (e) {
    console.log(e.message)
  } finally {}
});

module.exports = router;