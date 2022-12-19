const { Schema, model } = require('mongoose')

const schema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },
  age: {
    type: Number,
    required: true,
    min: [0, 'อายุต้องมากกว่าหรือเท่ากับ 0'],
    max: [200, 'อายุต้องไม่เกิน 200']
  },
  avatar: String
}, { timestamps: true })

const refRecords = {
  ref: 'Records',
  localField: '_id',
  foreignField: 'user'
}

schema.virtual('records', refRecords)
schema.virtual('recordCount', { ...refRecords, count: true })

module.exports = model('Users', schema)
