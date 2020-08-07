const express = require('express')
const router = require('express-promise-router')()

const QuestionController = require('../controllers/question')

// { validateBody, validateParam, schemas } = require('../helpers/routerHelpers')

router.route('/')
    // .get(DeckController.index)
    .post(QuestionController.newQuestion)

// router.route('/:deckID')
//     .get(validateParam(schemas.idSchema, 'deckID'), DeckController.getDeck)
//     .put(validateParam(schemas.idSchema, 'deckID'), validateBody(schemas.newDeckSchema), DeckController.replaceDeck)
//     .patch(validateParam(schemas.idSchema, 'deckID'), validateBody(schemas.deckOptionalSchema), DeckController.updateDeck)
//     .delete(validateParam(schemas.idSchema, 'deckID'), DeckController.deleteDeck)

module.exports = router