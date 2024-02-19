const { GraphQLError } = require('graphql')
const jwt = require('jsonwebtoken')
const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()

const Book = require('./Models/book')
const Author = require('./Models/author')
const User = require('./Models/user')

const resolvers = {
  Query: {
    dummy: () => 0,
    bookCount: async () => {
      try {
        const count = await Book.countDocuments({})
        return count
      } catch (error) {
        console.error(error)
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })

      }
    },
    authorCount: async () => {
      try {
        const count = await Author.countDocuments({})
        return count
      } catch (error) {
        console.error(error)
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
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
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
    },
    allAuthors: async () => {
      try {
        let data = await Author.aggregate([
          {
            $lookup: {
              from: 'books',
              localField: '_id',
              foreignField: 'author',
              as: 'books'
            }
          },
          {
            $project: {
              name: 1,
              born: 1,
              bookCount: { $size: '$books' }
            }
          }
        ])
        return data
      } catch (error) {
        console.error(error)
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
    },
    me: (root, args, context) => {
      console.log(context)
      return context.currentUser
    }
  },
  Mutation: {
    addBook: async (root, args, context) => {
      const currentUser = context.currentUser
      if (!currentUser) {
        throw new GraphQLError('not authenticated', {
          extensions: {
            code: 'BAD_USER_INPUT'
          }
        })
      }
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
    	
    	const book = {
          title: savedBook.title,
          published: savedBook.published,
          genres: savedBook.genres,
          author: {
            name: author.name,
            born: author.born,
            bookCount: await Book.countDocuments({ author: author._id })
          }
        }
    	
    	pubsub.publish('BOOK_ADDED', { bookAdded: book })
    	
    	return book
      }catch(error){
        console.log(error)
      }
    },
    editAuthor: async (root, args, context) => {
      const currentUser = context.currentUser
      if (!currentUser) {
        throw new GraphQLError('not authenticated', {
          extensions: {
            code: 'BAD_USER_INPUT'
          }
        })
      }
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
    },
    createUser: async (root, args) => {
      const user = new User({
        username: args.username,
        favoriteGenre: args.favoriteGenre
      })
      
      return user.save()
        .catch(error => {
          throw new GraphQLError('Creating the user failed', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.name,
              error
            }
          })
        })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })
      
      if ( !user || args.password !== 'secret') {
        throw new GraphQLError('wrong credentials', {
          extensions: { code: 'BAD_USER_INPUT'}
        })
      }
      
      const userForToken = {
        username: user.username,
        id: user._id
      }
      
      return { value: jwt.sign(userForToken, process.env.JWT_SECRET)}
    }
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
    }
  }
}

module.exports = resolvers
