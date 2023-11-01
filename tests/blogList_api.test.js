const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../index')

const api = supertest(app)

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

afterAll(async () => {
	await mongoose.connection.close()
})