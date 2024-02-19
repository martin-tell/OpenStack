import { useState, useEffect } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Login from './components/Login'
import Recommend from './components/Recommend'
import { useApolloClient } from '@apollo/client'
import { useQuery, useSubscription } from '@apollo/client'
import { ME, BOOK_ADDED, ALL_BOOKS } from './queries'

export const updateCache = (cache, query, addedBook) => {
  const uniqByName = (a) => {
    let seen = new Set()
    return a.filter((item) => {
      let k = item.title
      return seen.has(k) ? false : seen.add(k)
    })
  }

  cache.updateQuery(query, ({ allBooks }) => {
    return {
      allBooks: uniqByName(allBooks.concat(addedBook)),
    }
  })
}  

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const client = useApolloClient()

  const { loading, error, data } = useQuery(ME)

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  useEffect(() => {
    if(token){
      setPage('authors')
    }else{
      setPage('login')
    }
  }, [token])

  useSubscription(BOOK_ADDED, {
    onData: ({ data }) => {
      const { title, author } = data.data.bookAdded
      window.alert(`Se ha agregado ${title} por ${author.name}`)
      updateCache(client.cache, { query: ALL_BOOKS }, data.data.bookAdded)
    }
  })

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button style={{ display: token ? 'inline' : 'none' }} onClick={() => setPage('add')}>add book</button>
        <button style={{ display: token ? 'inline' : 'none' }} onClick={() => setPage('recommend')}>recommend</button>
        <button style={{ display: !token ? 'inline' : 'none' }} onClick={() => setPage('login')}>login</button>
        <button style={{ display: token ? 'inline' : 'none' }} onClick={() => logout()}>logout</button>
      </div>

      <Authors show={page === 'authors'} token={token} />

      <Books show={page === 'books'} />

      <NewBook show={page === 'add'} user={data} />

      <Recommend show={page === 'recommend'} user={data} loadingUser={loading} errorUser={error} />
      
      <Login show={page === 'login'} setToken={setToken} />
    </div>
  )
}

export default App