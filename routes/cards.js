const router = require('express').Router();
const { getCards } = require('../helpers/helpers');

router.get('/cards', getCards); // this will respond to /cards

module.exports = router;
