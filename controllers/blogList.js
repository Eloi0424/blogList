const blogListRouter = require('express').Router()
const Blog = require('../models/blogList')




blogListRouter.get('/', async (request, response) => {
	const blogs = await Blog.find({})
	response.json(blogs)
})

blogListRouter.post('/', async (request, response) => {
	const blog = new Blog(request.body)
	const saveResult = await blog.save()
	response.status(201).json(saveResult)
})



module.exports = blogListRouter