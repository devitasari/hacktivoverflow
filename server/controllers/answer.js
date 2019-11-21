const Answer = require('../models/answer')
const Question = require('../models/question')

class AnswerController {

  static findAll(req, res, next) {
    const questionId = req.params.questionId

    Question.findById(questionId).populate('answers')
      .then(question => {
        if (question) {
          res.status(200).json(question.answers)
        } else {
          next({status: 404, message: 'Data not found'})
        }
      })
  }

  static findOne(req, res, next) {
    const _id = req.params.answerId
    Answer.findById(_id).populate('user')
      .then(answer => {
        res.status(200).json(answer)
      })
      .catch(next)
  }

  static create(req, res, next) {
    const { description } = req.body
    const questionId = req.params.questionId
    const user = req.decoded._id
    let question

    Question.findById(questionId)
      .then(found => {
        if (found) {
          question = found
          return Answer.create({ description, user, question: questionId })
        } else {
          next({status: 404, message: 'Data not found'})
        }
      })
      .then(answer => {
        question.answers.push(answer._id)
        return question.save() 
      })
      .then(() => {
        res.status(201).json({
          message: 'Answer added succesfully',
        })
      })
      .catch(next)
  }

  static update(req, res, next) {
    const _id = req.params.id
    const { description } = req.body

    Answer.findById(_id)
      .then((answer) => {
        answer.description = description
        return answer.save()
      })
      .then(() => {
        res.status(200).json({
          message: 'Answer updated successfully'
        })
      })
      .catch(next)
  }

  static delete(req, res, next) {
    const _id = req.params.id

    Answer.deleteOne({ _id })
      .then(() => {
        res.status(200).json({
          message: 'Answer deleted successfully'
        })
      })
  }

  static upvote(req, res, next) {
    const user = req.decoded._id
    const _id = req.params.id

    Answer.findById(_id)
      .then(answer => {
        if (answer) {
          // cek downvotes dan upvotes
          let downvoteIndex = answer.downvotes.indexOf(user)
          let upvoteIndex = answer.upvotes.indexOf(user)

          // jika ditemukan downvote maka hapus
          if (downvoteIndex > -1) {
            answer.downvotes.splice(downvoteIndex, 1)
          }

          // jika ditemukan upvote maka hapus, jika tidak maka tambah upvote
          if (upvoteIndex > -1) {
            answer.upvotes.splice(upvoteIndex, 1)
          } else {
            answer.upvotes.push(user)
          }

          return answer.save()
        } else {
          next({status: 404, message: 'Answer ID not found'})
        }
      })
      .then((answer) => {
        res.status(200).json({ message: 'Update upvote success', answer })
      })
      .catch(next)
  }


  static downvote(req, res, next) {
    const user = req.decoded._id
    const _id = req.params.id

    Answer.findById(_id)
      .then(answer => {
        if (answer) {
          // cek downvotes dan upvotes
          let downvoteIndex = answer.downvotes.indexOf(user)
          let upvoteIndex = answer.upvotes.indexOf(user)

          // jika ditemukan upvote maka hapus
          if (upvoteIndex > -1) {
            answer.upvotes.splice(upvoteIndex, 1)
          }

          // jika ditemukan downvote maka hapus, jika tidak maka tambah downvote
          if (downvoteIndex > -1) {
            answer.downvotes.splice(downvoteIndex, 1)
          } else {
            answer.downvotes.push(user)
          }

          return answer.save()
        } else {
          next({status: 404, message: 'Answer ID not found'})
        }
      })
      .then((answer) => {
        res.status(200).json({ message: 'Update downvote success', answer })
      })
      .catch(next)
  }
}

module.exports = AnswerController
