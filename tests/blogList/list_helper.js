const lodash = require('lodash')

const mostBlogs = (blogs) => {
	const authors = lodash.countBy(blogs, 'author')
	const author = lodash.maxBy(Object.keys(authors), o => authors[o])
	return {author, blogs: authors[author]}
}
const mostLikes = (blogs) => {
	const authors = lodash.groupBy(blogs, 'author')
	const author = lodash.maxBy(Object.keys(authors), o => lodash.sumBy(authors[o], 'likes'))
	return {author, likes: lodash.sumBy(authors[author], 'likes')}
}

module.exports = {
	mostBlogs,
	mostLikes
}