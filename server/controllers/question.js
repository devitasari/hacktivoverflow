const Question = require('../models/question')

class QuestionController {

  static findAll(req, res, next) {
    Question.find().populate('user')
    .then(questions => {
      res.status(200).json(questions)
    })
    .catch(next)
  }

  static findMyQuestions(req, res, next) {
    const user = req.decoded._id
    Question.find({ user }).populate('user')
    .then(questions => {
      res.status(200).json(questions)
    })
    .catch(next)
  }

  static findOne(req, res, next) {
    const _id = req.params.id

    Question.findOne({ _id })
    .populate({
      path: 'answers',
      model: 'Answer',
      populate: {
          path: 'user',
          select: 'name email createdAt'
      }
    })
    .populate('user')
    .then(question => {
      res.status(200).json(question)
    })
    .catch(next) 
  }

  static create(req, res, next) {
    const { title, description } = req.body
    const user = req.decoded._id

    Question.create({ title, description, user })
      .then(question => {
        res.status(201).json({
          message: 'Question added succesfully',
          question
        })
      })
      .catch(next)
  }

  static update(req, res, next) {
    const { title, description } = req.body
    const _id = req.params.id

    Question.findById(_id)
      .then(question => {
        question.title = title
        question.description = description
        return question.save()
      })
      .then(() => {
        res.status(200).json({
          message: 'Question updated successfully'
        })
      })
      .catch(next)
  }

  static delete(req, res, next) {
    const _id = req.params.id

    Question.deleteOne({ _id })
      .then(() => {
        res.status(200).json({
          message: 'Question deleted successfully'
        })
      })
  }

  static upvote(req, res, next) {
    const user = req.decoded._id
    const _id = req.params.id

    Question.findById(_id)
      .then(question => {
        if (question) {
          // cek downvotes dan upvotes
          let downvoteIndex = question.downvotes.indexOf(user)
          let upvoteIndex = question.upvotes.indexOf(user)

          // jika ditemukan downvote maka hapus
          if (downvoteIndex > -1) {
            question.downvotes.splice(downvoteIndex, 1)
          }

          // jika ditemukan upvote maka hapus, jika tidak maka tambah upvote
          if (upvoteIndex > -1) {
            question.upvotes.splice(upvoteIndex, 1)
          } else {
            question.upvotes.push(user)
          }

          return question.save()
        } else {
          next({status: 404, message: 'Question ID not found'})
        }
      })
      .then((question) => {
        res.status(200).json({ message: 'Update upvote success', question })
      })
      .catch(next)
  }

  static downvote(req, res, next) {
    const user = req.decoded._id
    const _id = req.params.id

    Question.findById(_id)
      .then(question => {
        if (question) {
          // cek downvotes dan upvotes
          let downvoteIndex = question.downvotes.indexOf(user)
          let upvoteIndex = question.upvotes.indexOf(user)

          // jika ditemukan upvote maka hapus
          if (upvoteIndex > -1) {
            question.upvotes.splice(upvoteIndex, 1)
          } 
          
          // ika ditemukan downvote maka hapus, jika tidak maka tambah downvote
          if (downvoteIndex > -1) {
            question.downvotes.splice(downvoteIndex, 1)
          } else {
            question.downvotes.push(user)
          }

          return question.save()
        } else {
          next({status: 404, message: 'Question ID not found'})
        }
      })
      .then((question) => {
        res.status(200).json({ message: 'Update downvote success', question })
      })
      .catch(next)
  }
}

module.exports = QuestionController
