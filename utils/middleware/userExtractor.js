
jwt = require('jsonwebtoken')
User = require('../../models/user')

const userExtractor = async (request, response, next) => {
  if(!request.token){
    request.user = null
    next()
  }
  else{
    const decodedToken = jwt.verify(request.token,process.env.SECRET)
    request.user = await User.findById(decodedToken.id)
    next()
  }
}


module.exports = userExtractor