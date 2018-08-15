const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const connect_url = require('../conf/proj.json').mongodb;
const db = mongoose.createConnection(connect_url);

const UserSchema = new Schema({
	username: String,
	password: String,
	power: String,
	powerCode: Number
})

const UserModel = db.model('User', UserSchema);

module.exports = UserModel;
