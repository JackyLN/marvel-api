const {
  default: axios
} = require('axios');

const config = require('../config');
const createMd5 = require('./Md5Generation');

const totalCharacter = async (req, res, next) => {
  let hex = createMd5();
  let payload = await axios.get(`${config.marvel.API_DOMAIN}/characters`, {
    params: {
      ...hex,
      limit: 1,
      //name:'Spider-Man'
    }
  });
  const {
    total
  } = payload.data.data;
  req.charactercount = total;
  next();
}

module.exports = totalCharacter;