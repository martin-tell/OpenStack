const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

describe('When a user is created with', () => {
    test('a name shorter than six characters, an error message and a 400 Bad Request code are going to be returned.', async () => {
        const newUser = {
            username: 'mjane',
            name: 'Mary',
            password: '123'
        }

        const response = await api.post('/api/users').send(newUser)
        expect(response.status).toBe(400)
        expect(response.body.error).toBe('User validation failed: name: Path `name` (`Mary`) is shorter than the minimum allowed length (5).')
    }, 10000)

    test('a username shorter than three characters, an error message and a 400 Bad Request code are going to be returned', async () => {
        const newUser = {
            username: 'mj',
            name: 'Mary Jane',
            password: '123'
        }

        const response = await api.post('/api/users').send(newUser)
        expect(response.status).toBe(400)
        expect(response.body.error).toBe('User validation failed: username: Path `username` (`mj`) is shorter than the minimum allowed length (3).')
    }, 10000)

    test('a password shorter than three characters, an error message and a 400 Bad Request code are going to be returned', async () => {
        const newUser = {
            username: 'mjane',
            name: 'Mary Jane',
            password: '1'
        }

        const response = await api.post('/api/users').send(newUser)
        expect(response.status).toBe(400)
        expect(response.body.error).toBe('The password has to contain at least 3 characters.')
    }, 10000)
})

afterAll(() => {
    mongoose.connection.close()
})

