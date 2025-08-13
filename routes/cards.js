const router = require('express').Router();
const { getCards, createCard, deleteCard, likeCard, dislikeCard   } = require('../helpers/helpers');

router.get('/cards', getCards);
router.post('/cards', createCard);
router.delete('/cards/:cardId', deleteCard);
router.put('/cards/:cardId/likes', likeCard);
router.delete('/cards/:cardId/likes', dislikeCard);

module.exports = router;
