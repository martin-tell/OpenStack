import { useDispatch } from 'react-redux'
import { likeBlog, removeBlog } from '../reducers/blogReducer'
import PropTypes from 'prop-types'
import { useState } from 'react'
import { Button, Form } from 'react-bootstrap'

const Blog = ({ blog, user, commentBlog }) => {
  const dispatch = useDispatch()
  const [comment, setComment] = useState('')

  const like = async (id, blogObject) => {
    dispatch(likeBlog(id, blogObject))
  }

  const deleteBlog = async (id, title, author) => {
    dispatch(removeBlog(id, title, author))
  }

  const makeComment = async (event) => {
    event.preventDefault()
    commentBlog(blog.id, { content: comment })
    setComment('')
  }

  const canDelete = { display: user.username === blog.user.username ? '' : 'none' }

  return (
    <div className="blog">
      <h2>
        {blog.title} - {blog.author}
      </h2>
      <a href={blog.url}>{blog.url}</a>
      <br />
      <span>
        {blog.likes} likes{' '}
        <Button type="submit" onClick={() => like(blog.id, { ...blog, likes: blog.likes + 1 })}>
          like
        </Button>
      </span>
      <br />
      <span>
        {' '}
        added by {blog.user.name}{' '}
        <Button variant="danger" type="submit" onClick={() => deleteBlog(blog.id, blog.title, blog.author)} style={canDelete}>
          delete
        </Button>
      </span>
      <br />
      <h3>comments</h3>
      <Form onSubmit={(e) => makeComment(e)}>
        <Form.Control type="text" value={comment} onChange={({ target }) => setComment(target.value)} id="comment" />
        <Button type="submit">add comment</Button>
      </Form>
      <ul>
        {blog.comments.map((c) => (
          <li key={c.id}>{c.content}</li>
        ))}
      </ul>
    </div>
  )
}

Blog.displayName = 'Blog'

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  commentBlog: PropTypes.func.isRequired,
}

export default Blog