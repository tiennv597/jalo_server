const express = require('express')
const router = require('express-promise-router')()

const QuestionController = require('../controllers/question')

// { validateBody, validateParam, schemas } = require('../helpers/routerHelpers')

router.route('/')
    // .get(DeckController.index)
    .post(QuestionController.newQuestion)

router.route('/getbyquantity')
    .get(QuestionController.getQuestionByQuantity)

module.exports = router