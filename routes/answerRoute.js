const express = require('express');
const router = express.Router()
const { postAllanswers, getAllAnswer } = require ('../controller/answerController')


router.post('/post-answer/:questionid', postAllanswers)
router.get('/get-answer/:questionid', getAllAnswer)
module.exports = router