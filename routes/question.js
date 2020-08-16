const express = require('express')
const router = require('express-promise-router')()

const QuestionController = require('../controllers/question')

router.route('/')
    .post(QuestionController.newQuestion);
router.route('/update')
    .post(QuestionController.updateQuestion);
router.route('/delete')
    .post(QuestionController.deleteQuestion);
router.route('/getbyquantity')
    .post(QuestionController.getQuestionByQuantity);

router.route('/getByContent')
    .post(QuestionController.getByContent);

router.route('/getById')
    .post(QuestionController.getById);

router.route('/getByType')
    .post(QuestionController.getByType);

router.route('/getBySubType')
    .post(QuestionController.getBySubType);

router.route('/getByLevel')
    .post(QuestionController.getByLevel);


module.exports = router