const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const connect_url = require('../conf/proj.json').mongodb;
const db = mongoose.createConnection(connect_url);

const ArticleSchema = new Schema({
	user_id: String,
	title: String,
	author: String,
	content: String
})

const ArticleModel = db.model('Article', ArticleSchema);

module.exports = ArticleModel;
