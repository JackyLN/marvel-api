const crypto = require('crypto');
const config = require('../../config');

const createMd5 = () => {
  const timespan = Date.now();

  const data = timespan + config.marvel.PRIVATE_KEY + config.marvel.PUBLIC_KEY;
  return {
    timespan: timespan,
    hash: crypto.createHash('md5').update(data).digest("hex")
  }
}

module.exports = createMd5;