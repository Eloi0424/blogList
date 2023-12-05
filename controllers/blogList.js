const blogListRouter = require('express').Router()
const Blog = require('../models/blogList')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
blogListRouter.get('/', async (request, response) => {
	const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
	response.json(blogs)
})

blogListRouter.post('/', async (request, response) => {
	const decodedToken = jwt.verify(request.token,process.env.SECRET)
	if (!decodedToken.id) {
		return response.status(401).json({ error: 'token invalid' })
	}
	const user = await User.findById(decodedToken.id)
	if(!request.body.title||!request.body.url) {
		return response.status(400).end()
	}
	const blog = new Blog({
		title: request.body.title,
		author: request.body.author,
		url: request.body.url,
		likes: request.body.likes||0,
		user: user.id
	})
	const saveResult = await blog.save()
	user.blogs = user.blogs.concat(saveResult.id)
	await user.save()
	response.status(201).json(saveResult)
})




blogListRouter.delete('/:id', async (request, response) => {
	const decodedToken = jwt.verify(request.token,process.env.SECRET)
	if (!decodedToken.id) {
		return response.status(401).json({ error: 'token invalid' })
	}
	const blog = await Blog.findById(request.params.id)
	const user = await User.findById(decodedToken.id)
	if(blog.user.toString()!==user.id.toString()){
		return response.status(401).json({ error: 'token invalid user' })
	}
	await Blog.findByIdAndRemove(request.params.id)
	
	user.blogs = user.blogs.filter(blog=>blog.id.toString()!==request.params.id.toString())
	await user.save()
	response.status(204).end()
})



module.exports = blogListRouter