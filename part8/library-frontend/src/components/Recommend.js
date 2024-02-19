import { useQuery } from "@apollo/client"
import { ALL_BOOKS } from "../queries"

const Recommend = ({ show, user, loadingUser, errorUser }) => {

  const { loading: loadingAllBooks, error: errorAllBooks, data: dataAllBooks } = useQuery(ALL_BOOKS, {
    variables: {
      genre: user && user.me ? user.me.favoriteGenre : null }
  })

  if (!show) {
    return null
  }

  if (loadingUser) {
    return <div>loading user...</div>
  }

  if (errorUser) {
    return <div>error user not found</div>
  }

  if (loadingAllBooks) {
    return <div>loading...</div>
  }

  if (errorAllBooks) {
    return <div>{errorAllBooks.message}</div>
  }

  return(
    <div>
      <p>books in your favorite genre <strong>{user.me.favoriteGenre}</strong></p>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {dataAllBooks.allBooks.map((b) => (
            <tr key={b.title}>
              <td>{b.title}</td>
              <td>{b.author.name}</td>
              <td>{b.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Recommend