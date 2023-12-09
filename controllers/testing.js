const blogList = require("../models/blogList");
const User = require("../models/user");
const testingRouter = require('express').Router()



testingRouter.post('/reset',async(request,response)=>{
  await blogList.deleteMany({})
  await User.deleteMany({})
  response.status(204).end()
})


module.exports = testingRouter