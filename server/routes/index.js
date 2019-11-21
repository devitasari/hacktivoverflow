const router = require('express').Router()
const userRouter = require('./user')
const questionRotuer = require('./question')
const answerRouter = require('./answer')

router.get('/',(req, res, next) => {
  res.status(200).json({
    message: 'Test'
  })
})
router.use('/users', userRouter)
router.use('/questions', questionRotuer)
router.use('/answers', answerRouter)

module.exports = router
