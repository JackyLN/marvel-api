const express = require('express');
const app = express();
const cors = require('cors');
const config = require('./config')

const port = config.server.APPLICATION_PORT;

app.use(cors());

app.use(express.urlencoded({
  extended: true
}));

app.get('/', function (req, res) {
  res.send('Helloworld');
})

//App Start
app.listen(port, () => console.log(`API running on PORT ${port}!`))