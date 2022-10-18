const express = require('express');

// const cors = require('cors')

const PORT = process.env.PORT || 3000;

const api = require('./routes/api');

const app = express();
app.set('view engine', 'ejs');
app.use(express.static(`${__dirname}/public`));
app.listen(PORT, () => {
  console.log('App listening on port:', PORT);
});

app.use('/', api);
