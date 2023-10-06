const lodash = require('lodash')

const dummy = blogs => blogs ? 1 : 0

const totalLikes = blogs => blogs.reduce((sum, blog) => sum + blog.likes, 0)

const maximumLikes = blogs => blogs.reduce((max, blog) => max.likes < blog.likes ? blog : max , blogs[0] || null)

const mostBlogs = blogs => {
    if(blogs.length !== 0){
        const blogs_author = lodash.groupBy(blogs, 'author')    
        const most_blogs = lodash.maxBy(Object.keys(blogs_author), author => blogs_author[author].length)
        return {author: most_blogs, blogs: blogs_author[most_blogs].length}
    }else{
        return null
    }
}

const mostLikes = blogs => {
    if(blogs.length !== 0){
        const blogs_author = lodash.groupBy(blogs, 'author')    
        const most_likes = lodash.maxBy(Object.keys(blogs_author), author => lodash.sumBy(blogs_author[author], a => a.likes))
        return {author: most_likes, likes: lodash.sumBy(blogs_author[most_likes], a => a.likes)}
    }else{
        return null
    }
}

module.exports = {
    dummy,
    totalLikes,
    maximumLikes,
    mostBlogs,
    mostLikes
}