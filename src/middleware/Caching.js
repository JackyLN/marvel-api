const Memcached = require('memcached');
const config = require('../config');

let memcached = new Memcached(config.server.CACHING_SERVER);

const memCaching = (duration) => {
  return (req, res, next) => {

    let key = "__marvel_character__" + req.originalUrl || req.url;
    let keyCount = "__marvel_character_count__";

    console.log(key);

    //check if total characters is still remain
    memcached.get(keyCount, (err, data) => {
      console.log({
        data: data,
        req: req.charactercount
      });
      if (data) {
        if (data !== req.charactercount) {

          memcached.set(keyCount, req.charactercount, (duration * 60), function (err) {});

          //character update
          res.sendResponse = res.send;
          res.send = (body) => {
            memcached.set(key, body, (duration * 60), function (err) {});
            res.sendResponse(body);
          }
          next();
        } else {
          //get cache
          memcached.get(key, (err, data) => {
            if (data) {
              res.send(data);
              return;
            } else {
              res.sendResponse = res.send;
              res.send = (body) => {
                memcached.set(key, body, (duration * 60), function (err) {});
                res.sendResponse(body);
              }
              next();
            }
          })

        }
      } else {
        memcached.set(keyCount, req.charactercount, (duration * 60), function (err) {});
        memcached.get(key, (err, data) => {
          if (data) {
            res.send(data);
            return;
          } else {
            res.sendResponse = res.send;
            res.send = (body) => {
              memcached.set(key, body, (duration * 60), function (err) {});
              res.sendResponse(body);
            }
            next();
          }
        })
      }
    })
  }
}

module.exports = memCaching;