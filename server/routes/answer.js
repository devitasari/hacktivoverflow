const router = require('express').Router()
const answerController = require('../controllers/answer')
const { authentication } = require('../middlewares/authentication')
const { isAnswerOwner } = require('../middlewares/authorization')

router.get('/:questionId', answerController.findAll)

router.use(authentication)
router.get('/:answerId', answerController.findOne)
router.post('/:questionId', answerController.create)

router.patch('/:id', isAnswerOwner, answerController.update)
router.delete('/:id', isAnswerOwner, answerController.delete)

router.post('/:id/upvote', answerController.upvote)
router.post('/:id/downvote', answerController.downvote)

module.exports = router
