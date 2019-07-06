const express = require('express');
const mongoose = require('mongoose');
const con = require('./config/keys').mongoURI;
const passport = require('passport');
const cors = require('cors');
const app = express();

app.use(cors())

//Middleware
app.use(express.urlencoded({extended:false}));
app.use(express.json());


//mongoDB
mongoose
    .connect(con, {
        useNewUrlParser: true,
        useCreateIndex: true
    }) // Adding new mongo url parser
    .then(() => console.log('MongoDB Connected.'))
    .catch(err => console.log(err));

//Passport middleware
app.use(passport.initialize());

//Passport config
require('./config/passport')(passport);

//Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/watchlist', require('./routes/watch_list'));
app.use('/api/watch', require('./routes/watch'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>{
    console.log(`Server running on ${PORT}`)
});
