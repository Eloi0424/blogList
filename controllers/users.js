const usersRouter = require('express').Router()
const bcrypt = require('bcrypt')
const User =  require('../models/user')


usersRouter.post('/',async(request,response,next)=>{
	const {username,name,password} = request.body
	if(username.length<3){
		return response.status(400).json({error:'username must be at least 3 characters long'})
	}
	if(password.length<3){
		return response.status(400).json({error:'password must be at least 3 characters long'})
	}
	const saltRounds = 10
	const passwordHash = await bcrypt.hash(password, saltRounds)
	
	const user = new User({
		username,
		name,
		passwordHash,
	})
	
	const savedUser = await user.save().catch(error=>next(error))
	
	response.status(201).json(savedUser)
})
usersRouter.get('/',async(request,response,next)=>{
	const users = await User.find({}).populate('blogs',{title:1,url:1,author:1})
	response.json(users)
})


module.exports = usersRouter