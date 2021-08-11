require('./models/User');
require('./models/Track');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const trackRoutes = require('./routes/trackRoutes');
const requireAuth = require('./middlewares/requireAuth');

const app = express();

// To automatically handle incoming json information
// This line of code needs to be run before using authRoutes because we want the program to parse all the json information before we run the request handler 
app.use(bodyParser.json());

app.use(authRoutes);
app.use(trackRoutes);

const mongoUri = 'mongodb+srv://admin:passwordpassword@cluster0.t5wjr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});
mongoose.connection.on('connected', () => {
    console.log('Connected to mongo instance');
});
mongoose.connection.on('error', (err) => {
    console.error('Error connecting to mongo', err);
});

// Only allow the user to access this route if the user has a valid token 
app.get('/', requireAuth, (req, res) => {
    res.send(`Your email: ${req.user.email}`);
});

app.listen(3000, () => {
    console.log('Listening on Port 3000');
});