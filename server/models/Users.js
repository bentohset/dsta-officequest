const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    hashedPassword: {
        type: String,
        required: true
    },
    points: {
        type: Number,
        default: 0
    },
    gachaCount: {
        type: Array,
        default: [0, 0, 0, 0, 0, 0, 0, 0]
    }
})

module.exports = User = mongoose.model('users', UserSchema);