const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Exercise = require('../models/Exercise');

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

module.exports = router;
