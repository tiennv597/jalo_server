const mongoose = require('mongoose')
const Schema = mongoose.Schema

const bcrypt = require('bcryptjs')
const { bool } = require('@hapi/joi')

const UserSchema = new Schema({
  firstName: {
    type: String,
    default: null
  },

  lastName: {
    type: String,
    default: null
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  decks: [{
    type: Schema.Types.ObjectId,
    ref: 'Deck'
  }],
  password: {
    type: String,
    default: null

  },
  authGoogleID: {
    type: String,
    default: null
  },
  authFacebookID: {
    type: String,
    default: null
  },
  dio: {
    type: String,
    default: null
  },
  authType: {
    type: String,
    enum: ['local', 'google', 'facebook'],
    default: 'local'
  },
  friends: [{
    type: String,
    default: null
  }],
  gender: {
    type: String,
    enum: ['Female', 'Male', 'Other'],
    default: 'Female'
  },
  birthday: {
    type: Date,
    default: null
  },
  languageSpoken: {
    type: [String]
  },
  jobType: {
    type: String,
    default: null
  },
  homeTown: {
    type: String,
    default: null
  },
  creationDate: {
    type: String,
    default: null
  },
  profileUrl: {
    type: String,
    default: null
  },
  displayName: {
    type: String,
    default: null
  },
  enable: {
    type: Boolean,
    default: null
  },
  id: {
    type: String,
    default: null
  },
  provider: {
    type: String,
    default: null
  },
})

UserSchema.pre('save', async function (next) {
  try {
    if (this.authType !== 'local') next()

    // Generate a salt
    const salt = await bcrypt.genSalt(10)
    // Generate a password hash (salt + hash)
    const passwordHashed = await bcrypt.hash(this.password, salt)
    // Re-assign password hashed
    this.password = passwordHashed

    next()
  } catch (error) {
    next(error)
  }
})


UserSchema.methods.isValidPassword = async function (newPassword) {
  try {
    return await bcrypt.compare(newPassword, this.password)
  } catch (error) {
    throw new Error(error)
  }
}

const User = mongoose.model('User', UserSchema)
module.exports = User