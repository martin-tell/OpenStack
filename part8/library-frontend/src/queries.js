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
  query AllBooks{
    allBooks {
      author{
        name
      }
      title
      published
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