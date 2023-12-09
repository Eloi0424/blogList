const express = require("express");
const cors = require("cors");
const blogListRouter = require("./controllers/blogList");
const usersRouter = require("./controllers/users");
const loginRouter = require("./controllers/login");
const config = require("./utils/config");
const mongoose = require("mongoose");
const errorHandler = require("./utils/middleware/errorHandler");
const unknownEndpoint = require("./utils/middleware/unknownEndpoint");
const tokenExtractor = require("./utils/middleware/tokenExtractor");
const userExtractor = require("./utils/middleware/userExtractor");
class App{
	static instance
	constructor() {
		if(!App.instance){
			const app = express()
			app.use(cors())
			app.use(express.json())
			app.use(tokenExtractor)
			app.use('/api/blogs', userExtractor,blogListRouter)
			app.use('/api/users', usersRouter)
			app.use('/api/login', loginRouter)
			if (process.env.NODE_ENV === 'test') {
				const testingRouter = require('./controllers/testing')
				app.use('/api/testing', testingRouter)
			}
			
			const PORT = config.PORT
			app.listen(PORT, () => {
				console.log(`Server running on port ${PORT}`)
			})
			const mongoUrl = config.MONGODB_URI
			mongoose.connect(mongoUrl).then(() => {
				console.log('connected to MongoDB')
			})
			
			app.use(errorHandler)
			app.use(unknownEndpoint)
			
			
			this.app = app
			App.instance = this
		}
		return App.instance
	}
}
app = (new App()).app
module.exports = App