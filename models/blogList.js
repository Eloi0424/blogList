mongoose = require('mongoose')



const blogSchema = new mongoose.Schema({
	title: String,
	author: String,
	url: String,
	likes: Number
})
const Blog = mongoose.model('Blog', blogSchema)

const mongoUrl = 'mongodb+srv://eloi0424:K4eO2KnWrOKLrJOz@nidimension.qmzibah.mongodb.net/blogList?retryWrites=true&w=majority'
mongoose.connect(mongoUrl).then(() => {
	console.log('connected to MongoDB')
})

module.exports = Blog