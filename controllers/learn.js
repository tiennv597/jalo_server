
// var grammarModel = require("../models/grammar")();

function Learn() {

	return {
		addQuestions: function (params, cb) { // add questions

			var pto = {
				'msgs': [],
				'action': 'OK'
			}

			questionModel.addQuestions(params, function (err, udata) {

				if (err) {

					console.log("Insert Unsuccesfuly");
					pto.msgs.push(msgs.error("Insert Unsuccesfuly"));

				} else {

					console.log("Insert Successfuly");
					cb(pto);
				}
			});
		},

		addGrammar: function (params, cb) { // add Grammar

			var pto = {
				'msgs': [],
				'action': 'OK'
			}

			grammarModel.addGrammar(params, function (err, udata) {

				if (err) {
					console.log("Insert Unsuccesfuly");
					pto.msgs.push(msgs.error("Insert Unsuccesfuly"));
				} else {
					console.log("Insert Successfuly");
				}
				cb(pto);
			});
		},
		editGrammar: function (params, cb) { // edit Grammar

			var pto = {
				'msgs': [],
				'action': 'OK'
			}

			grammarModel.editGrammar(params, function (err, udata) {

				if (err) {
					console.log("Update Unsuccesfuly");
				} else {
					console.log("Update Successfuly");
				}
				cb(pto);
			});
		},
		deleteGrammar: function (params, cb) { // delete Grammar

			var pto = {
				'msgs': [],
				'action': 'OK'
			}

			grammarModel.deleteGrammar(params, function (err, udata) {

				if (err) {
					console.log("Update Unsuccesfuly");
				} else {
					console.log("Update Successfuly");
				}
				cb(pto);
			});
		},

		getGrammar: function ({ }, cb) { //get all grammar

			grammarModel.getGrammar(function (err, udata) {

				if (err) {
					console.log("error get grammar");
				} else {

				}
				cb(udata);
			});
		},

		getGrammarById: function (data, cb) { //get grammar by id

			grammarModel.getGrammarById(data, function (err, udata) {

				if (err) {
					console.log("error get grammar by id");
				} else {
					for (var i = 0; i < 1; i++) {
						cb(udata[i]);
					}
				}
			});
		},

		getGrammarByJapanese: function (data, cb) { //get grammar by content

			grammarModel.getGrammarByJapanese(data, function (err, udata) {

				if (err) {
					console.log("error get grammar by content");
				} else {
					cb(udata);
				}
			});
		},
		getRandomByLevelAndType: function (data, cb) { // get random questions by level and type

			questionModel.getRandomByLevelAndType(data, function (err, udata) {

				if (err) {
					console.log("error get grammar by content");
				} else {
					cb(udata);
				}
			});
		},

		getGrammarByNoJapanese: function (data, cb) { //get grammar by mean

			grammarModel.getGrammarByNoJapanese(data, function (err, udata) {

				if (err) {
					console.log("error get grammar by mean");
				} else {
					cb(udata);

				}
			});
		},

		getExample: function (data) { // get Example

			var examples = grammarModel.getExample(data);
			return examples;

		},
		addExample: function (data, cb) {
			var pto = {
				'msgs': [],
				'action': 'OK'
			}
			grammarModel.addExample(data, function (err, udata) {

				if (err) {
					console.log("add example err");
				} else {
					cb(pto);
				}
			});
		},
		getExampleByJapanese: function (data, cb) { //get example By Japanese

			grammarModel.getExampleByJapanese(data, function (err, udata) {

				if (err) {
					console.log("error get grammar by content");
				} else {
					cb(udata);
				}
			});
		},

		getExampleByNoJapanese: function (data, cb) { //get grammar by By No Japanese

			grammarModel.getExampleByNoJapanese(data, function (err, udata) {

				if (err) {
					console.log("error get example By No Japanese" + data);
				} else {
					cb(udata);

				}
			});
		},
	}
}

module.exports = Learn;


