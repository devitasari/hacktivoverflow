const mongoose = require('mongoose')
const Schema = mongoose.Schema

const questionSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Title field is required']
  },
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
  answers: [{
    type: Schema.Types.ObjectId,
    ref: 'Answer'
  }],
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User field is required']
  }
}, { timestamps: true })

const question = mongoose.model('Question', questionSchema)

module.exports = question
