const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../index')
const Blog = require('../models/blogList')
const api = supertest(app)



const initialBlogs = [
	{
		_id: "5a422a851b54a676234d17f7",
		title: "React patterns",
		author: "Michael Chan",
		url: "https://reactpatterns.com/",
		likes: 7,
		__v: 0
	},
	{
		_id: "5a422aa71b54a676234d17f8",
		title: "Go To Statement Considered Harmful",
		author: "Edsger W. Dijkstra",
		url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
		likes: 5,
		__v: 0
	},
	{
		_id: "5a422b3a1b54a676234d17f9",
		title: "Canonical string reduction",
		author: "Edsger W. Dijkstra",
		url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
		likes: 12,
		__v: 0
	},
	{
		_id: "5a422b891b54a676234d17fa",
		title: "First class tests",
		author: "Robert C. Martin",
		url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
		likes: 10,
		__v: 0
	},
	{
		_id: "5a422ba71b54a676234d17fb",
		title: "TDD harms architecture",
		author: "Robert C. Martin",
		url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
		likes: 0,
		__v: 0
	},
	{
		_id: "5a422bc61b54a676234d17fc",
		title: "Type wars",
		author: "Robert C. Martin",
		url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
		likes: 2,
		__v: 0
	}
]

beforeEach(async () => {
	await Blog.deleteMany({})
	
	let blogObject = new Blog(initialBlogs[0])
	await blogObject.save()
	
	blogObject = new Blog(initialBlogs[1])
	await blogObject.save()
})


test('blogs are returned as json', async () => {
	await api
		.get('/api/blogs')
		.expect(200)
		.expect('Content-Type', /application\/json/)
})
test('blogs have id prop',async () => {
	await api
		.get('/api/blogs')
		.expect(200)
		.expect('Content-Type', /application\/json/)
		.expect(response => {
			response.body.forEach(blog => {
				expect(blog.id).toBeDefined()
			})
		})
})


test('a valid blog can be added', async () => {
	const newBlog = {
		"title": "test a blog",
		"author": "Eloi",
		"url": "www.eloi.com/nlog",
		"likes": 114514
	}
	await api.post('/api/blogs')
		.send(newBlog)
		.expect(201)
		.expect('Content-Type', /application\/json/)
	const response = await api.get('/api/blogs')
	const contents = response.body.map(r => r.title)
	expect(response.body).toHaveLength(3)
	expect(contents).toContain('test a blog')
})




test("if request without likes, likes is 0", async () => {
	const newBlog = {
		"title": "test a blog",
		"author": "Eloi",
		"url": "www.eloi.com/nlog"
	}
	await api.post('/api/blogs')
		.send(newBlog)
		.expect(201)
		.expect('Content-Type', /application\/json/)
	const response = await api.get('/api/blogs')
	const contents = response.body.map(r => r.title)
	expect(response.body).toHaveLength(3)
	expect(contents).toContain('test a blog')
	expect(response.body[2].likes).toBe(0)
})


test("if request without title, return 400", async () => {
	const newBlog = {
		"author": "Eloi",
		"url": "www.eloi.com/nlog"
	}
	await api.post('/api/blogs')
		.send(newBlog)
		.expect(400)
})
afterAll(async () => {
	await mongoose.connection.close()
})