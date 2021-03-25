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
  }
});

const port = config.server.APPLICATION_PORT;

app.use(cors());

app.use(express.urlencoded({
  extended: true
}));
app.use(express.json());

app.get('/', function (req, res) {
  res.send('Marvel API');
})

//Swagger API Docs
const swaggerOptions = {
  customSiteTitle: "Marvel API",
}

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, swaggerOptions));

//API router
//Characters
const CharacterServices = require('./services/CharacterServices');
app.use('/characters', CharacterServices);


//App Start
const server = app.listen(port, () => console.log(`API running on PORT ${port}!`))

module.exports = server;