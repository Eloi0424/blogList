const blogListRouter = require('express').Router()
const Blog = require('../models/blogList')
const User = require('../models/user')



blogListRouter.get('/', async (request, response) => {
	const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
	response.json(blogs)
})

blogListRouter.post('/', async (request, response) => {
	if(!request.body.title||!request.body.url) {
		return response.status(400).end()
	}
	const blog = new Blog({
		title: request.body.title,
		author: request.body.author,
		url: request.body.url,
		likes: request.body.likes||0,
		user: request.body.user
	})
	const saveResult = await blog.save()
	
	const user = await User.findById(request.body.user)
	user.blogs = user.blogs.concat(saveResult.id)
	await user.save()
	response.status(201).json(saveResult)
})



module.exports = blogListRouter