const express = require('express');
const app = express();
const cors = require('cors');
const config = require('./config');
const fs = require('fs');

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

//Check if .env file exist
fs.access('./.env', fs.F_OK, (err) => {
  if (err) {
    console.error("Required to setup .env file!")
    process.exit();
  } else {    

    const port = config.server.APPLICATION_PORT;

    app.use(cors());
    
    app.use(express.urlencoded({
      extended: true
    }));
    app.use(express.json());
    
    app.get('/', function (req, res) {
      res.send('Helloworld');
    })

    //Swagger API Docs
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
    
    //API router
    //Characters
    const CharacterServices = require('./services/CharacterServices');
    app.use('/characters', CharacterServices);
    
    
    //App Start
    app.listen(port, () => console.log(`API running on PORT ${port}!`))
  }
})


