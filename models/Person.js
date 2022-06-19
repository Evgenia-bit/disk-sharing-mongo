const mongoose = require('mongoose')


const personScheme = mongoose.Schema({
    nickname: String,
    password: String
});

const Person = mongoose.model("Person", personScheme);
module.exports = Person