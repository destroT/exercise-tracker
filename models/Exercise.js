const mongoose = require('mongoose');

const exerciseModel = new mongoose.Schema({
	user: mongoose.ObjectId,
	description: String,
	duration: Number,
	date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Exercise', exerciseModel);
