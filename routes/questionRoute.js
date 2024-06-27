const express = require('express');
const router = express.Router()
const { postQuestion, getAllQuestion, getspecificQuestion } = require ('../controller/questionController')


router.post('/post-question', postQuestion)
router.get('/all-questions', getAllQuestion)
router.get('/get-questions/:questionid', getspecificQuestion)
module.exports = router
