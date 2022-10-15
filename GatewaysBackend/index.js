const express = require('express')
const cors = require('cors')

const PORT = process.env.PORT || 3000 // This is just in case I want to deploy it and need to pass the port as an env variable.

const api = require('./routes/api')

const app = express()
app.set('view engine', 'ejs')
app.use(express.static(__dirname + '/public'))
app.listen(PORT, () => {
	console.log('App listening on port:', PORT)
})

app.use('/', api)

