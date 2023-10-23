import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, likeBlog, userName, remove }) => {
  const blogStyle = {
    background: '#f5f5f5',
    padding: 6,
    marginBottom: 4
  }

  const [isVisible, setVisible] = useState(false)
  const showOrNot = { display: isVisible ? '' : 'none' }
  const buttonText = isVisible ? 'hide' : 'view'
  const canDelete = { display: (userName === blog.user.username) ? '' : 'none', color: 'red' }

  return(
    <div style={blogStyle} className='blog'>
      <span>{blog.title} </span>
      <span>{blog.author} </span>
      <button aria-label='view' type='submit' onClick={() => setVisible(!isVisible)}>{buttonText}</button>
      <div data-testid='details' style={showOrNot}>
        <div>{blog.url}</div>
        <div id='likes_details'>likes {blog.likes} <button aria-label='like' type='sumbit' onClick={() => likeBlog(blog.id, { ...blog, likes: blog.likes+1 })}>like</button></div>
        <button type="submit" style={canDelete} onClick={() => remove(blog.id, blog.title, blog.author)}>delete</button>
      </div>
    </div>
  )
}

//5.11
Blog.displayName = 'Blog'

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  likeBlog: PropTypes.func.isRequired,
  userName: PropTypes.string.isRequired,
  remove: PropTypes.func.isRequired
}

export default Blog