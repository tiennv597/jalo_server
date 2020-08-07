var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var questionSchema = new Schema({
    idQuestion: String,
    level: {
        id: String,
        name: String
    }, // String is shorthand for {type: String}
    type: {
        id: String,
        name: String
    },
    subType: {
        id: String,
        name: String
    },
    question: String,
    explain: String,
    answer: [{ _id: false, answer: String, result: Boolean }],
    date: { type: Date, default: Date.now },
    comments: [{ author: String, imageURL: String, body: String, date: Date }],
    bold: [{ type: String }],
    italic: [{ type: String }],
    underline: [{ type: String }],
});

const Question = mongoose.model('Question', questionSchema)
module.exports = Question