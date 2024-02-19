import { useMutation } from '@apollo/client'
import { LOGIN } from '../queries'
import { useState, useEffect } from 'react'

const Login = ({ show, setToken }) => {

  const [ login, result ] = useMutation(LOGIN)
  const [user, setUser] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {    
    if ( result.data ) {
      const token = result.data.login.value
      setToken(token)
      localStorage.setItem('library-user-token', token)
    }  
  }, [result.data, setToken]) 

  if (!show) {
    return null
  }

  const submit = async (event) => {
    event.preventDefault()    
    try {
      await login({
        variables: {
          username: user,
          password: password
        }
      })
    } catch (error) {
      console.error(error)
    } finally {
      setUser('')
      setPassword('')
    }
  }

  return(
    <div>
      <form onSubmit={submit}>
        name<input value={user} onChange={({ target }) => setUser(target.value)}/><br />
        password<input type="password" value={password} onChange={({ target }) => setPassword(target.value)}/><br />
        <button>login</button>
      </form>
    </div>
  )
}

export default Login