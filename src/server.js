const knex = require('knex');
const https = require('https');
const http = require('http');
const cors = require('cors');
const unirest = require('unirest');
const events = require('events');
const app = require('./app');
const {
	PORT,
	DB_URL
} = require('./config');


app.use(cors())

const db = knex({
	client: 'pg',
	connection: DB_URL
})

app.set('db', db);



app.listen(PORT, () => {
	console.log(`Server listening at http://localhost:${PORT}`)
});

