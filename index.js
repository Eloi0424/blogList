const express = require("express");
const cors = require("cors");
const blogListRouter = require("./controllers/blogList");
const usersRouter = require("./controllers/users");
const config = require("./utils/config");
const mongoose = require("mongoose");

class App{
	constructor() {
		if(!App.instance){
			const express = require('express')
			const app = express()
			const cors = require('cors')
			const mongoose = require('mongoose')
			const blogListRouter = require('./controllers/blogList')
			const config = require('./utils/config')
			const usersRouter = require("./controllers/users");
			app.use(cors())
			app.use(express.json())
			app.use('/api/blogs', blogListRouter)
			app.use('/api/users', usersRouter)
			
			
			const PORT = config.PORT
			app.listen(PORT, () => {
				console.log(`Server running on port ${PORT}`)
			})
			const mongoUrl = config.MONGODB_URI
			mongoose.connect(mongoUrl).then(() => {
				console.log('connected to MongoDB')
			})
			this.app = app
			App.instance = this
		}
	}
}
app = new App().app
module.exports = App