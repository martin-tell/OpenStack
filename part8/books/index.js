const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const { v1: uuid } = require('uuid')
const Book = require('./Models/book')
const Author = require('./Models/author')
const config = require('./utils/config')
const mongoose = require('mongoose')

const typeDefs = `
  type Query {
    dummy: Int
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
  }
  type Book {
    title: String!
    author: Author!
    published: Int!
    genres: [String!]!
  }
  type Author {
    name: String!
    born: String
    bookCount: Int!
  }
  type Mutation {
    addBook(
      title: String!
      published: Int!
      author: String!
      genres: [String!]!
    ): Book
    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author
  }
`

const resolvers = {
  Query: {
    dummy: () => 0,
    bookCount: async () => {
      try {
        const count = await Book.countDocuments({})
        return count
      } catch (error) {
        console.error(error)
        throw new Error('Error al obtener el recuento de libros');
      }
    },
    authorCount: async () => {
      try {
        const count = await Author.countDocuments({})
        return count
      } catch (error) {
        console.error(error)
        throw new Error('Error al obtener el recuento de author')
      }
    },
    allBooks: async (root, args) => {
      try {
      	let query = {}

        if (args.author) {
          const author = await Author.findOne({ name: args.author })
          if (author) {
            query.author = author._id
          } else {
            return []
          }
        }

        if (args.genre) {
          query.genres = args.genre
        }
        console.log(query)
        let data = await Book.find(query).populate({
          path: 'author',
          select: 'name'
        })
        
        console.log(data)

        data = await Promise.all(data.map(async (book) => {
          const author = book.author.toObject()
          
          const bookCount = await Book.countDocuments({ author: author._id })

          return {
            ...book.toObject(),
            author: { ...author, bookCount }
          }
        }))

        return data
      } catch (error) {
        console.error(error);
        throw new Error('Error al obtener todos los libros');
      }
    },
    allAuthors: async () => {
      try {
        let data = await Author.find({})

        data = await Promise.all(data.map(async (a) => {
          const author = a.toObject()
          const bookCount = await Book.countDocuments({ author: author._id })
          return { ...author, bookCount }
        }))

        return data
      } catch (error) {
        console.error(error)
        throw new Error('Error al obtener todos los autores')
      }
    }
  },
  Mutation: {
    addBook: async (root, args) => {
      if (args.title.trim() === '' || args.published === 0 || args.author.trim() === '' || args.genres.length === 0) {
    	throw new GraphQLError('book information missing', {
          extension: {
            code: 'BAD_USER_INPUT'
          }
    	})
      }
      try{
    	let author    	
    	const existingAuthor = await Author.findOne({ name: args.author })
        if (!existingAuthor) {
          const newAuthor = new Author({ name: args.author })
          author = await newAuthor.save()
        } else {
          author = existingAuthor
        }

    	const newBook = new Book({ ...args, author: author._id })
    	const savedBook = await newBook.save()
    	return {
          title: savedBook.title,
          published: savedBook.published,
          genres: savedBook.genres,
          author: {
            name: author.name,
            born: author.born,
            bookCount: await Book.countDocuments({ author: author._id })
          }
        }
      }catch(error){
        console.log(error)
      }
    },
    editAuthor: async (root, args) => {
      if(args.name.trim() === '' || args.setBornTo === 0) {
      	throw new GraphQLError('author information missing', {
          extension: {
            code: 'BAD_USER_INPUT'
          }
    	})
      }
      try {
        const author = await Author.findOne({ name: args.name })
        if(author) {
          const result = await Author.updateOne(
            { _id: author._id},
            { $set: {born: args.setBornTo} }
          )
          
          if (result.nModified > 0) {
            return {
              name: author.name,
              born: args.setBornTo
            }
          } else {
            return null
          }
        }
      } catch(error) {
        console.log(error)
      }
    }
  }
}

console.log(config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI)
    .then(() => {
        console.log('connected to MongoDB:')
    })
    .catch((error) => {
        console.log('error connecting to MongoDB:', error.message)
    })

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

startStandaloneServer(server, {
  listen: { port: 4000 },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
