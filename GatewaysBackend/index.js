const express = require('express');

const bodyParser = require('body-parser');

const PORT = process.env.PORT || 3000;

const api = require('./routes/api');

const app = express();
app.set('view engine', 'ejs');
app.use(express.static(`${__dirname}/public`));
// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Cross Origin middleware
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});
app.listen(PORT, () => {
  console.log('App listening on port:', PORT);
});

app.use('/', api);
