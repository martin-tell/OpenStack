import { useQuery } from "@apollo/client"
import { ALL_BOOKS } from "../queries"

const Books = (props) => {

  const { loading, error, data } = useQuery(ALL_BOOKS)

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
          {books.map((b) => (
            <tr key={b.title}>
              <td>{b.title}</td>
              <td>{/*b.author ? b.author.name : 'Unknown Author'*/}</td>
              <td>{b.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Books
