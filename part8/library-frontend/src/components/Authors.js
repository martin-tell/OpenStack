import { useMutation, useQuery } from "@apollo/client"
import { ALL_AUTHORS, EDIT_BIRTHYEAR } from "../queries"
import { useState } from "react"
import Select from "react-select"

const Authors = (props) => {

  const { loading, error, data } = useQuery(ALL_AUTHORS)

  const [updateBirthyear] = useMutation(EDIT_BIRTHYEAR, { 
    refetchQueries: [ { query: ALL_AUTHORS } ]
  })

  const [author, setAuthor] = useState(null)
  const [birthyear, setBirthyear] = useState(0)

  if (!props.show) {
    return null
  }

  if (loading)  {
    return <div>loading...</div>
  }

  if (error)  {
    return <div>{error}</div>
  }
  
  const authors = data.allAuthors
  const options = authors.map(a => { return { value: a.name, label: a.name } })

  const submit = async (event) => {
    event.preventDefault()    
    try {
      const result = await updateBirthyear({
        variables: {
          name: author.value,
          setBornTo: Number(birthyear)
        }
      })
      console.log(result.data.editAuthor)
    } catch (error) {
      console.error(error);
    } finally {
      setAuthor('')
      setBirthyear(0)
    }
  }  

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3>Set birthyear</h3>
      <form onSubmit={submit}>
        <Select 
          value={author}
          onChange={setAuthor}
          options={options}
        />
        born
        <input 
          type="text"
          value={birthyear}
          onChange={({ target }) => setBirthyear(target.value)}
        />
        <br />
        <button>update author</button>
      </form>
    </div>
  )
}

export default Authors
