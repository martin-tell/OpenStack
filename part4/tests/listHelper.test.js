const listHelper = require('../utils/list_helper')

const zeroBlogs = []

const listWithOneBlog = [
    {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0
    }
]

const blogs = [
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

//4.3
test('dummy returns one', () => {
    const result = listHelper.dummy(zeroBlogs)
    expect(result).toBe(1)
})

//4.4
describe('total likes', () => {
    test('of empty list is zero', () => {
        const result = listHelper.totalLikes(zeroBlogs)
        expect(result).toBe(0)
    })

    test('when list has only one blog, equals the likes of that', () => {
        const result = listHelper.totalLikes(listWithOneBlog)
        expect(result).toBe(5)
    })

    test('of a bigger list is caculated right', () => {
        const result = listHelper.totalLikes(blogs)
        expect(result).toBe(36)
    })
})

//4.5
describe('the favorite blog', () => {
    test('of a empty list is null', () => {
        const result = listHelper.maximumLikes(zeroBlogs)
        expect(result).toBeNull()
    })

    test('is in the third position', () => {
        const result = listHelper.maximumLikes(blogs)
        expect(result).toEqual(blogs[2])
    })

    test('is not in the fourth position', () => {
        const result = listHelper.maximumLikes(blogs)
        expect(result).not.toBe(blogs[4])
    })
})

//4.6
describe('the maximum quantity of publications', () => {
    test('is gotten by Robert C. Martin', () => {
        const result = listHelper.mostBlogs(blogs)
        const expected = {
            author: 'Robert C. Martin',
            blogs: 3
        }
        expect(result).toEqual(expected)
    })

    test('is 3 blogs', () => {
        const result = listHelper.mostBlogs(blogs).blogs
        expect(result).toBe(3)
    })

    test('of a empty list is null', () => {
        const result = listHelper.mostBlogs(zeroBlogs)
        expect(result).toBeNull()
    })
})

//4.7
describe('the maximum quantity of likes', () => {
    test('is gotten by Edsger W. Dijkstra', () => {
        const result = listHelper.mostLikes(blogs)
        const expected = {
            author: 'Edsger W. Dijkstra',
            likes: 17
        }
        expect(result).toEqual(expected)
    })

    test('of a empty list is null', () => {
        const result = listHelper.mostLikes(zeroBlogs)
        expect(result).toBeNull()
    })

    test('is 17', () => {
        const result = listHelper.mostLikes(blogs)
        expect(result.likes).toEqual(17)
    })
})