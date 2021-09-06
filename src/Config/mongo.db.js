'use strict';

const mongoose = require('mongoose');
const config  = require('./app.config');
const mongoDatabaseURI = config.MONGO_LOCAL_DB;

mongoose.set('useCreateIndex', true)
mongoose.connect(mongoDatabaseURI, { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.on('connected', function() {
	console.log('Mongoose connection opened');
});

mongoose.connection.on('error', function(err) {
	console.log('Mongoose connection error: ' + err);
});

mongoose.connection.on('disconnected', function() {
	console.log('Mongoose connection disconnected');
});
