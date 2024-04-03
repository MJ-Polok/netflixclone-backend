const mongoose = require('mongoose')

const AuthSchema = new mongoose.Schema({
    token: { type: String, required: true, unique: true }
}, { timestamps: true })

module.exports = mongoose.model("Auth", AuthSchema)