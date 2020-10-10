const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Exercise = require('../models/Exercise');
const { mongoose, isValidObjectId } = require('mongoose');

// Create a new user. return error if username invalid or alredy taken.
router.post('/new-user', async (req, res) => {
	const { username } = req.body;

	console.log(`Creating new user ${username}`);
	if (!username) return res.status(400).send({ error: 'Invalid username' });

	// Check if username alredy exists
	const user = await User.findOne({ username: username });
	if (user != undefined)
		return res.status(400).send({ error: 'Username alredy taken' });

	//Create User istance
	const new_user = new User({ username: username });
	new_user.save();

	console.log(`New user created`);
	return res.json(new_user);
});

// Get all users, if there are not users in database return an error
router.get('/users', async (req, res) => {
	const users = await User.find();

	if (!users) return res.status(400).json({ error: 'No users in database.' });

	return res.json(users);
});

// Create a new Exercise, return an error if the input are ot valid
router.post('/add', async (req, res) => {
	const { userId, description, duration, date } = req.body;

	console.log('New post request to add a new exercise');
	// Check inputs
	if (!userId || !description || !duration || !Number(duration))
		return res
			.status(400)
			.send({ error: 'Invalid request, check all the fields' });

	// Check if id is valid
	if (!isValidObjectId(userId))
		return res.status(400).send({ error: 'Invalid user id.' });

	//Search by user id
	const check_user = await User.findById(userId);
	if (!check_user) return res.status(400).send({ error: 'User not found.' });

	// Create the new istance
	const new_exercise = new Exercise({
		user: check_user._id,
		description: description,
		duration: duration,
	});

	// Check if i need to add a date
	if (date) new_exercise.date = date;

	new_exercise.date.toDateString();
	// Save in DB
	new_exercise.save();

	console.log('New exercise created!');
	return res.json({
		username: check_user.username,
		description: new_exercise.description,
		duration: new_exercise.duration,
		_id: check_user._id,
		date: new_exercise.date.toDateString(),
	});
});

// Search exercises by user_id, return the user object with added array log and count
router.get('/log', async (req, res) => {
	const id = req.query.userId;

	let { from, to, limit } = req.query;
	// Check if id is valid
	if (!isValidObjectId(id))
		return res.status(400).send({ error: 'Invalid user id.' });

	if (limit && Number(limit)) limit = Number(limit);

	let queryObj = { user: id };

	let range = from || to ? getRangeDate(from, to) : null;

	if (range) queryObj.date = range;
	// Get user istance
	const user = await User.findById(id);
	if (!user) res.status(400).send({ error: 'User not found.' });

	// Get all exercises created by user
	const logs = await Exercise.find(queryObj).limit(limit);

	return res.json({
		_id: user._id,
		username: user.username,
		count: logs.length,
		log: logs,
	});
});

function getRangeDate(from, to) {
	from = castDate(from);
	to = castDate(to);

	// Default Value
	let start = new Date(0);
	let end = new Date(86400000000000);

	if (from != 'Invalid Date') start = from;
	if (to != 'Invalid Date') end = to;
	if (start > end) {
		let temp = end;
		end = start;
		start = temp;
	}

	// Return Object for query
	return { $gte: start, $lte: end };
}

function castDate(date) {
	const cast = new Date(date);
	return cast ? cast : null;
}

module.exports = router;
