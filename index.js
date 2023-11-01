const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const blogListRouter = require('./controllers/blogList')

app.use(cors())
app.use(express.json())
app.use('/api/blogs', blogListRouter)


const PORT = 3003
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
})