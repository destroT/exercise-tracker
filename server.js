// Imports
const express = require('express');
const path = require('path');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();

// Connect to DB
mongoose
	.connect(process.env.DB_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
	})
	.then(console.log('Connected to db'))
	.catch(e =>
		console.log('Error trying to connect to the database: ', e.message),
	);

// Load Routes
const apiRouter = require('./routes/exercise');

// Initialize
const app = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// initialize routes
//app.use('/.netlify/functions/', indexRouter);
app.use('/api/exercise', apiRouter);

// Run server
const PORT = process.env.PORT || 8000;
app.listen(PORT, console.log(`Server listening on port: ${PORT}`));
