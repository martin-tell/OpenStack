import { gql } from "@apollo/client"

export const ALL_AUTHORS = gql`
  query AllAuthors {
    allAuthors {
      born
      name
      bookCount
    }
  }
`

export const ALL_BOOKS = gql`
  query AllBooks($genre: String) {
    allBooks(genre: $genre) {
      title
      published
      author {
        name
      }
      genres
    }
  }
`

export const ADD_BOOK = gql`
  mutation Mutation($title: String!, $published: Int!, $author: String!, $genres: [String!]!) {
    addBook(title: $title, published: $published, author: $author, genres: $genres) {
      author{
        name
      }
      genres
      published
      title
    }
  }
`

export const EDIT_BIRTHYEAR = gql`
  mutation Mutation($name: String!, $setBornTo: Int!) {
    editAuthor(name: $name, setBornTo: $setBornTo) {
      name
      born
    }
  }
`

export const LOGIN = gql`
  mutation Mutation($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`

export const ME = gql`
  query Me {
    me {
      favoriteGenre
      id
      username
    }
  }
`

export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      title
      author{
        name
      }
    }
  }
`