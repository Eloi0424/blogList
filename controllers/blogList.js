const blogListRouter = require('express').Router()
const Blog = require('../models/blogList')




blogListRouter.get('/', async (request, response) => {
	const blogs = await Blog.find({})
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
		likes: request.body.likes||0
	})
	const saveResult = await blog.save()
	response.status(201).json(saveResult)
})



module.exports = blogListRouter