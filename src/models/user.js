const mongoose = require("mongoose")
const validator = require("validator")
const bcrypt = require("bcryptjs")
const leoProfanity = require("leo-profanity")
//const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    validate(value) {
      if (leoProfanity.check(value)) {
        throw new Error("Please take out any profanity from your username")
      }
    }
  },
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Email is invalid")
      }
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 7,
    trim: true,
    validate(value) {
      if (value.toLowerCase().includes("password")) {
        throw new Error('Password cannot contain "password"')
      }
    },
  },
  avatar: {
    type: Buffer
  }
}, {
  timestamps: true
})

// userSchema.methods.toJSON = function () {
//     const user = this
//     const userObject = user.toObject()
  
//     delete userObject.password
//     delete userObject.tokens
//     delete userObject.avatar
  
//     return userObject
// }

// Statics are usable on the model (model methods)
userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email })

    if (!user) {
        throw new Error("Unable to login")
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
        throw new Error("Unable to login")
    }

    return user;
};

// Hash the plain text password before saving
userSchema.pre("save", async function (next) {
    const user = this

    if (user.isModified("password")) {
        user.password = await bcrypt.hash(user.password, 8)
    }

    //makes the program aware that it can end rather than thinking something is stil going on
    next()
});

const User = mongoose.model("User", userSchema)
module.exports = User