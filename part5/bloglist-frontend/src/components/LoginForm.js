import { useState } from 'react'

const LoginForm = ({ login }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = (event) => {
    event.preventDefault()
    login(username, password)
    setUsername('')
    setPassword('')
  }

  return(
    <form id='login_form' onSubmit={handleLogin}>
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
          id='username_input'
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
          id='password_input'
        />
      </div>
      <button type="submit" id='button_input'>login</button>
    </form>
  )
}

export default LoginForm