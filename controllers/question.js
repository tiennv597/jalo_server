/**
 * We can interact with mongoose in three diffirent ways:
 * [v] Callback
 * [v] Promises
 * [v] Async/await (Promises)
 */
const Question = require('../models/learn/Question')

const deleteQuestion = async (req, res, next) => {
	const id = req.body.id;
	console.log(id);
	await Question.findByIdAndDelete(id);
	return res.status(200).json({ status: true })
}

const getQuestion = async (req, res, next) => {
	return res.status(200).json({ deck })
}

const getByContent = async (req, res, next) => {
	const searchByType = req.body.searchByType;
	const search = req.body.search;
	console.log(search);
	const questions = await Question.aggregate(
		[{ $match: { 'question': { '$regex': search, '$options': 'i' } } }]
	);
	return res.status(200).json({ questions: questions })
}

const getById = async (req, res, next) => {
	console.log("getById");
	console.log(req.body);
	return res.status(200).json({ deck })

}
const getByType = async (req, res, next) => {
	console.log("getByType");
	return res.status(200).json({ deck })

}
const getBySubType = async (req, res, next) => {
	console.log("getBySubType");
	return res.status(200).json({ deck })

}
const getByLevel = async (req, res, next) => {
	console.log("getBySubLevel");
	return res.status(200).json({ deck })

}
const getQuestionByQuantity = async (req, res, next) => {
	console.log(req.body)
	const questions = await Question.aggregate([{ $sample: { size: 10 } }])
	console.log(JSON.stringify(questions));
	return res.status(200).json({ questions: questions })
}

// Create a new question
const newQuestion = async (req, res, next) => {
	const question = req.body.question;
	const newQuestion = new Question(question);
	var d = new Date();
	let id = question.level.name + question.type.id + question.subType.id +
		d.getFullYear() +
		d.getMonth() +
		d.getDate() +
		d.getHours() +
		d.getMinutes() +
		d.getSeconds()
	newQuestion.idQuestion = id;

	await newQuestion.save();

	return res.status(200).json({ status: true })
}
const replaceQuestion = async (req, res, next) => {
	return res.status(200).json({ success: true })
}

const updateQuestion = async (req, res, next) => {
	const question = req.body.question;
	console.log(question);
	await Question.findByIdAndUpdate(question._id, question);
	return res.status(200).json({ status: true })
}

module.exports = {
	getById,
	getByType,
	getByLevel,
	getBySubType,
	getByContent,
	deleteQuestion,
	getQuestion,
	newQuestion,
	replaceQuestion,
	updateQuestion,
	getQuestionByQuantity
}