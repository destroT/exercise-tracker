const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Exercise = require('../models/Exercise');

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

router.get('/users', async (req, res) => {
	const users = await User.find();
	if (!users.users)
		return res.status(400).json({ error: 'No users in database.' });

	return res.json({ users });
});

module.exports = router;
