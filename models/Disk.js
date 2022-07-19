const mongoose = require('mongoose')

const diskScheme = mongoose.Schema({
    name: String
})

const Disk = mongoose.model("Disk", diskScheme)

module.exports = Disk