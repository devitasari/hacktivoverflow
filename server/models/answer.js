const mongoose = require('mongoose')
const Schema = mongoose.Schema

const answerSchema = new Schema({
  description: {
    type: String,
    required: [true, 'Description field is required']
  },
  upvotes: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  ],
  downvotes: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  ],
  question: {
    type: Schema.Types.ObjectId,
    ref: 'Question'
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
}, { timestamps: true })

const answer = mongoose.model('Answer', answerSchema)

module.exports = answer
