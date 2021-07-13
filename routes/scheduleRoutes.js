var express = require('express');
const { isLoggedIn, isAuthenticated } = require('../middleware/auth');
const { isAuthorized,
        getScheduleById,
        getAllSchedules,
        getSchedule,
        addSchedule,
        updateSchedule,
        deleteSchedule
        } = require('../controllers/schedule'); 
const { getUserById } = require('../middleware/user');

var router = express.Router();

// param routes
router.param('userId', getUserById);
router.param('scheduleId', getScheduleById);

// get route for all schedules of user
router.get('/all/:userId', isLoggedIn, isAuthenticated, getAllSchedules);

// get round for specific schedule
router.get('/:userId/:scheduleId', isLoggedIn, isAuthenticated, isAuthorized, getSchedule);

// post route for adding schedule
router.post('/:userId', isLoggedIn, isAuthenticated, addSchedule);

// put route for updating schedule 
router.put('/update/:userId/:scheduleId', isLoggedIn, isAuthenticated, isAuthorized, updateSchedule);

// delete route for deleting schedule
router.delete('/delete/:userId/:scheduleId', isLoggedIn, isAuthenticated, isAuthorized, deleteSchedule);

module.exports = router;