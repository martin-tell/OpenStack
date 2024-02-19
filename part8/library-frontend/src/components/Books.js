import { useQuery } from "@apollo/client"
import { ALL_BOOKS } from "../queries"
import { useState } from "react"

const Books = (props) => {

  const { loading, error, data } = useQuery(ALL_BOOKS)
  const [ genre, setGenre ] = useState('')

  let genres = []

  if (!props.show) {
    return null
  }

  if (loading)  {
    return <div>loading...</div>
  }

  if (error)  {
    return <div>{error.message}</div>
  }

  const books = data.allBooks

  genres = Array.from(new Set(books.flatMap(b => b.genres)))

  const filteredBooks = genre === '' ? books : books.filter(b => b.genres.includes(genre))

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {filteredBooks.map((b) => (
            <tr key={b.title}>
              <td>{b.title}</td>
              <td>{b.author.name}</td>
              <td>{b.published}</td>
            </tr>
          ))}
        </tbody>        
      </table>
      {genres.map(g => (<button key={g} onClick={() => setGenre(g)}>{g}</button>))}
      <button key="Show all" onClick={() => setGenre('')}>Show all</button>
    </div>
  )
}

export default Books
