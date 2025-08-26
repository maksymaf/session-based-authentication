const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const path = require('path');
const MongoStore = require('connect-mongo');
const router = require('./routes/pageRoute');
require('dotenv').config();

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended: false}));
app.use(session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: process.env.MONGODB_URI,
        collectionName: 'sessions',
    }),
    cookie: {
        maxAge: 1000 * 60 * 60 * 24
    }
}));
app.use('/', router);

mongoose.connect(process.env.MONGODB_URI)
.then(() => {
    console.log('Connected to db');
    app.listen(PORT, () => {
        console.log(`Server started working successfuly. http://localhost:${PORT}`);
    });
})
.catch(() => {
    console.log('Connection failed');
});

