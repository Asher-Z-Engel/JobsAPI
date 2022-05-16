const mongoose = require('mongoose')

const JobSchema = new mongoose.Schema({
  company: {
    type: String,
    required: [true, 'company name is required'],
    minlength: 3,
    maxlength: 50
  },
  position: {
    type: String,
    required: [true, 'Position is required'],
    minlength: 3,
    maxlength: 50
  },
  status: {
    type: String,
    enum: ['Interview', 'Pending', 'Declined', 'Offer made'],
    default: 'Pending'
  },
  createdBy: {
    type: mongoose.Types.ObjectId,
    ref: 'User'
  }
},{timestamps: true})

module.exports = mongoose.model('Job', JobSchema)