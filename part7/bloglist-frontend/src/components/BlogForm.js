import { useState } from 'react'
import { Form, Button, Col, Row } from 'react-bootstrap'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: title,
      author: author,
      url: url,
      likes: 0,
    })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <Row className="justify-content-md-center mt-3">
      <Col md={5}>
        <Form onSubmit={addBlog}>
          <Form.Group controlId="formTitle">
            <Form.Label>Title:</Form.Label>
            <Form.Control
              type="text"
              value={title}
              data-testid="title"
              onChange={({ target }) => setTitle(target.value)}
              id="title"
            />
          </Form.Group>

          <Form.Group controlId="formAuthor">
            <Form.Label>Author:</Form.Label>
            <Form.Control
              type="text"
              value={author}
              data-testid="author"
              onChange={({ target }) => setAuthor(target.value)}
              id="author"
            />
          </Form.Group>

          <Form.Group controlId="formUrl">
            <Form.Label>URL:</Form.Label>
            <Form.Control
              type="text"
              value={url}
              data-testid="url"
              onChange={({ target }) => setUrl(target.value)}
              id="url"
            />
          </Form.Group>

          <Button variant="primary" data-testid="create" id="create" type="submit">
            Create
          </Button>
        </Form>
      </Col>
    </Row>
  )
}

export default BlogForm