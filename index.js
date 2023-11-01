const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const blogListRouter = require('./controllers/blogList')
const config = require('./utils/config')


app.use(cors())
app.use(express.json())
app.use('/api/blogs', blogListRouter)


const PORT = config.PORT
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
})
module.exports = app