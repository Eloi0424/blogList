const supertest = require('supertest')
const App = require('../index')
const app = (new App()).app
const api = supertest(app)
module.exports = api