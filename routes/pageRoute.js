const express = require('express');
const { isAuth } = require('../middleware/isAuth');
const {
    rootHandler,
    registerGetHandler,
    loginGetHandler,
    dashboardHandler,
    registerPostHandler,
    loginPostHandler
} = require('../controllers/controllers');
const router = express.Router();

router.get('/', rootHandler);
router.get('/register', registerGetHandler);
router.get('/login', loginGetHandler);
router.get('/dashboard', isAuth ,dashboardHandler);

router.post('/register', registerPostHandler);
router.post('/login', loginPostHandler);

module.exports = router;