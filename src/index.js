require('dotenv').config();
require('./models/User');
require('./models/Track');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const trackRoutes = require('./routes/trackRoutes')
const requireAuth = require('./middlewares/requireAuth');


const app = express();

app.use(bodyParser.json());
app.use(authRoutes)
app.use(trackRoutes);

const mongoUri = process.env.MONDGOURI;

mongoose.connect(mongoUri);

mongoose.connection.on('connected', ()=> {
    console.log('Connected to mongo instance')
});

mongoose.connection.on('Error', (err)=> {
    console.error('Error connecting to mongo', err)
});

app.get('/', requireAuth, (req, res) => {
    res.send(`Hello ${req.user.email}`)
});

app.listen(3000, ()=> {
    console.log('listening on port 3000')
})