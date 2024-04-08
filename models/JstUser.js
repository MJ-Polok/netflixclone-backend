const mongoose = require('mongoose')

const JstUserSchema = new mongoose.Schema({
    jstUserName: { type: String, required: true },
}, { timestamps: true })

module.exports = mongoose.model("JstUser", JstUserSchema)