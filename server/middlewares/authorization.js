const Question = require('../models/question')
const Answer = require('../models/answer')

module.exports = {
  isQuestionOwner (req, res, next) {
    const user = req.decoded._id
    const _id = req.params.id //question id
    Question.findOne({ _id, user })
      .then(question => {
        if (question) {
          next()
        } else {
          next({status: 401, message: "You haven't authorized with this question"})
        }
      })
      .catch(next)
  },
  isAnswerOwner (req, res, next) {
    const user = req.decoded._id
    const _id = req.params.id // answer id
    
    Answer.findOne({ _id, user })
      .then(answer => {
        if (answer) {
          next()
        } else {
          next({status: 401, message: "Not authorized"})
        }
      })
      .catch(next)
  }
}