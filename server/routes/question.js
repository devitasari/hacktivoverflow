const router = require('express').Router()
const QuestionController = require('../controllers/question')
const { authentication } = require('../middlewares/authentication')
const { isQuestionOwner } = require('../middlewares/authorization')

router.get('/', QuestionController.findAll)
router.get('/my', authentication, QuestionController.findMyQuestions)
router.get('/:id', QuestionController.findOne)

router.use(authentication)
router.post('/', QuestionController.create)
router.put('/:id', isQuestionOwner, QuestionController.update)
router.delete('/:id', isQuestionOwner, QuestionController.delete)

router.post('/:id/upvote', QuestionController.upvote)
router.post('/:id/downvote', QuestionController.downvote)

module.exports = router
