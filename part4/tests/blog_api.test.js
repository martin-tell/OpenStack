const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const initialBlogs = [
    {
        _id: '5a422a851b54a676234d17f7',
        title: 'React patterns',
        author: 'Michael Chan',
        url: 'https://reactpatterns.com/',
        likes: 7,
        __v: 0
    },
    {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0
    },
    {
        _id: '5a422b3a1b54a676234d17f9',
        title: 'Canonical string reduction',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
        likes: 12,
        __v: 0
    },
    {
        _id: '5a422b891b54a676234d17fa',
        title: 'First class tests',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
        likes: 10,
        __v: 0
    },
    {
        _id: '5a422ba71b54a676234d17fb',
        title: 'TDD harms architecture',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
        likes: 0,
        __v: 0
    },
    {
        _id: '5a422bc61b54a676234d17fc',
        title: 'Type wars',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
        likes: 2,
        __v: 0
    }  
]

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im1sdXVra2FpIiwiaWQiOiI2NTFkZDMwYTQzNzA0NmMwMGNlYWU0NzciLCJpYXQiOjE2OTY1Mzk4ODZ9.15BcAK2VHhc9wUPGSXxrtKTBm6uGKw9k2umVacXanHg'

beforeEach(async () => {
    await Blog.deleteMany({})
    
    const blogObjects = initialBlogs
        .map(blog => new Blog(blog))
    const promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)
}, 20000)

describe('When a request to the initial blogs is done', () => {
    test('the blogs are returned as json', async () => {
        await api.get('/api/blogs')
            .set('Authorization', '')
            .expect('Content-Type', /application\/json/)
    }, 10000)

    test('there are six blogs in the response', async () => {
        const response = await api.get('/api/blogs').set('Authorization', `bearer ${token}`)
        expect(response.body).toHaveLength(initialBlogs.length)
    }, 10000)
})

describe('When the blogs are requested', () => {
    test('they contain an id attribute', async () => {
        const response = await api.get('/api/blogs').set('Authorization', `bearer ${token}`)
        expect(response.body[0].id).toBeDefined()
    }, 10000)
})

describe('When a new blog is sent with POST', () => {
    const newBlog = {
        title: 'Prueba de blog',
        author: 'Autor de prueba',
        url: 'www.url.com',
        likes: 0
    }

    test('the publication is created successfully', async () => {
        const response = await api.post('/api/blogs').set('Authorization', `bearer ${token}`).send(newBlog)
        expect(response.statusCode).toBe(200)
    }, 10000)

    test('the publications number is incremented in one', async () => {
        await api.post('/api/blogs').set('Authorization', `bearer ${token}`).send(newBlog)
        const response = await api.get('/api/blogs').set('Authorization', `bearer ${token}`)
        expect(response.body).toHaveLength(initialBlogs.length+1)
    }, 10000)
    
    test('\'Prueba de blog\' is the title of the new publication', async () => {
        await api.post('/api/blogs').set('Authorization', `bearer ${token}`).send(newBlog)
        const response = await api.get('/api/blogs').set('Authorization', `bearer ${token}`)
        expect(response.body[initialBlogs.length].title).toBe('Prueba de blog')
    }, 10000)   
})

describe('An error is gotten when the attribute', () => {
    test('likes is missing', async () => {
        const newBlog = {
            title: 'Prueba de blog',
            author: 'Autor de prueba',
            url: 'www.url.com'
        }
        
        const response = await api.post('/api/blogs').set('Authorization', `bearer ${token}`).send(newBlog)
        expect(response.text).toBe('{"error":"Blog validation failed: likes: Path `likes` is required."}')
    }, 10000)

    test('title and author are missing', async () => {
        const newBlog = {
            author: 'Autor de prueba',
            likes: 0
        }

        const response = await api.post('/api/blogs').set('Authorization', `bearer ${token}`).send(newBlog)
        expect(response.text).toBe('{"error":"Blog validation failed: title: Path `title` is required., url: Path `url` is required."}')
        expect(response.status).toBe(400)
    }, 10000)
})

describe('When the token is missing', () => {
    test('a 401 token is going to be returnd', async () => {
        const newBlog = {
            author: 'Autor de prueba',
            likes: 0
        }

        const response = await api.post('/api/blogs').send(newBlog)
        expect(response.statusCode).toBe(401)
    }, 10000)
})

afterAll(() => {
    mongoose.connection.close()
})