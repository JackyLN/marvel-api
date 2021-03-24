const {
  default: axios
} = require('axios');
const express = require('express');
const router = express.Router();

const config = require('../../config');
const createMd5 = require('../middleware/Md5Generation');


//Get all characters ID
router.get('/', async (req, res, next) => {
  try {
    let hex = createMd5();
    let result = await axios.get(`${config.marvel.API_DOMAIN}/characters`, {
      params: hex
    });
    res.status(200).send(result.data.data);
  } catch (e) {
    console.log(e.message)
  } finally {}
});

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
    const { results } = axiosResponse.data.data;
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