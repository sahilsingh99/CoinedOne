var express = require('express');
const { isLoggedIn, isAuthenticated } = require('../middleware/auth');
const { getUserById } = require('../middleware/user');
const { getAllRestrictedApps,
        getAllLimitedApps,
        getLimitedApp,
        addRestrictedApp,
        addLimitedApp,
        deleteLimitedApp } = require('../controllers/app');

var router = express.Router();

// param route
router.param('userId', getUserById);

// get route for All restricted apps
router.get('/restricted/all/:userId', isLoggedIn, isAuthenticated, getAllRestrictedApps);

// get route for All limited apps
router.get('/limited/all/:userId', isLoggedIn, isAuthenticated, getAllLimitedApps);

// get route for specific limited app
router.get('/limited/:userId', isLoggedIn, isAuthenticated, getLimitedApp);

// post route for adding restricted apps
router.post('/restricted/:userId', isLoggedIn, isAuthenticated, addRestrictedApp);

// post route for adding limited apps
router.post('/limited/:userId', isLoggedIn, isAuthenticated, addLimitedApp);

router.delete('/limited/:userId', isLoggedIn, isAuthenticated, deleteLimitedApp);

module.exports = router;