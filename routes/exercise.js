const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Exercise = require('../models/Exercise');
const { mongoose, isValidObjectId } = require('mongoose');

// Create a new user. return error if username invalid or alredy taken.
router.post('/new-user', async (req, res) => {
	const { username } = req.body;

	if (!username) return res.status(400).json({ error: 'Invalid username' });

	// Check if username alredy exists
	const user = await User.findOne({ username: username });
	if (user != undefined)
		return res.status(400).json({ error: 'Username alredy taken' });

	//Create User istance
	const new_user = new User({ username: username });
	new_user.save();
	return res.json(new_user);
});

// Get all users, if there are not users in database return an error
router.get('/users', async (req, res) => {
	const users = await User.find();
	if (!users.users)
		return res.status(400).json({ error: 'No users in database.' });

	return res.json({ users });
});

// Create a new Exercise, return an error if the input are ot valid
router.post('/add', async (req, res) => {
	const { user, description, duration, date } = req.body;

	// Check inputs
	if (!user || !description || !duration || !Number(duration))
		return res
			.status(400)
			.json({ error: 'Invalid request, check all the fields' });

	// Check if id is valid
	if (!isValidObjectId(user))
		return res.status(400).json({ error: 'Invalid user id.' });

	//Search by user id
	const check_user = await User.findById(user);
	if (!check_user) return res.status(400).json({ error: 'User not found.' });

	// Create the new istance
	const new_exercise = new Exercise({
		user: check_user._id,
		description: description,
		duration: duration,
	});

	// Check if i need to add a date
	if (date) new_exercise.date = date;

	// Save in DB
	new_exercise.save();

	return res.json(new_exercise);
});

module.exports = router;
