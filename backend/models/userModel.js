const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')
const validator = require('validator')

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

//static signup method
userSchema.statics.signup = async function (email, password) {

    if (!email || !password) {
        throw Error('All field must be entered')
    }

    if (!validator.isEmail(email)) {
        throw Error('Invalid email')
    }

    if (password.length < 8 && !validator.isStrongPassword(password)) {
        throw Error('Password must be at least 8 characters or weak')
    }

    const exists = await this.findOne({ email })
    if (exists) {
        throw Error('Email already exists')
    }
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)
    const user = await this.create({ email, password: hash })
    return user

}

//static login method
userSchema.statics.login = async function (email, password) {

    if (!email || !password) {
        throw Error('All field must be entered')
    }
    const user = await this.findOne({ email })
    if (!user) {
        throw Error('Incorrect email')
    }
    const match = await bcrypt.compare(password, user.password)
    if (!match) {
        throw Error('Incorrect password')
    }
    return user
}





const User = mongoose.model('User', userSchema)

module.exports = User