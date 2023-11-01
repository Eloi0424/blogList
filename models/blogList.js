mongoose = require('mongoose')
const config = require('../utils/config')


const blogSchema = new mongoose.Schema({
	title: String,
	author: String,
	url: String,
	likes: Number
})
const Blog = mongoose.model('Blog', blogSchema)


blogSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString()
		delete returnedObject._id
		delete returnedObject.__v
	}
})


const mongoUrl = config.MONGODB_URI
mongoose.connect(mongoUrl).then(() => {
	console.log('connected to MongoDB')
})

module.exports = Blog