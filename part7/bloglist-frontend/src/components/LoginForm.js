import { useState } from 'react'
import { Form, Button, Container, Row, Col } from 'react-bootstrap'

const LoginForm = ({ login }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = (event) => {
    event.preventDefault()
    login(username, password)
    setUsername('')
    setPassword('')
  }

  return (
    <Container>
      <Row className="justify-content-md-center mt-3">
        <Col md={5}>
          <Form id='login_form' onSubmit={handleLogin}>
            <Form.Group controlId="formUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                value={username}
                name="Username"
                onChange={({ target }) => setUsername(target.value)}
                id='username_input'
              />
            </Form.Group>

            <Form.Group controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={password}
                name="Password"
                onChange={({ target }) => setPassword(target.value)}
                id='password_input'
              />
            </Form.Group>

            <Button variant="primary" type="submit" id='button_input'>
              login
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  )
}

export default LoginForm