const router = require('express').Router();
const userRoutes = require('./user-Routes');
const thoughtRoutes = require('./thought-Routes');

router.use('/users', userRoutes);
router.use('/thoughts', thoughtRoutes);

module.exports = router;