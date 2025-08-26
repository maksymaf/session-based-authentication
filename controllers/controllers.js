const User = require('../models/User');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const path = require('path');

const rootHandler = (req, res) => {
    return res.redirect('/register');
}

const registerGetHandler = (req, res) => {
    res.status(200).sendFile(path.join(__dirname, '..', 'public', 'register.html'));
}

const loginGetHandler = (req, res) => {
    res.status(200).sendFile(path.join(__dirname, '..', 'public', 'login.html'));
}

const dashboardHandler = (req, res) => {
    res.status(200).sendFile(path.join(__dirname, '..', 'public', 'dashboard.html'));
}

const registerPostHandler = async (req, res) => {
    const { username, password } = req.body;
    let candidate = await User.findOne({username});
    if (candidate) {
        return res.status(400).json({message: 'User is already logged in'});
    }
    const hashedPsw = bcrypt.hashSync(password, 7);
    candidate = new User({username, password: hashedPsw});
    await candidate.save();
    res.sendStatus(200);
}

const loginPostHandler = async (req, res) => {
    const { username, password } = req.body;
    let candidate = await User.findOne({username});
    if (!candidate){
        return res.redirect('/register');
    }
    if (!bcrypt.compareSync(password, candidate.password)){
        return res.redirect('/login');
    }
    req.session.isAuth = true;
    res.redirect('/dashboard');
}

module.exports = {
    rootHandler,
    registerGetHandler,
    loginGetHandler,
    dashboardHandler,
    registerPostHandler,
    loginPostHandler
}
