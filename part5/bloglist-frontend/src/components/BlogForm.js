import { useState } from 'react'

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
      likes: 0
    })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <form onSubmit={addBlog}>
      title:
      <input
        type="text"
        value={title}
        data-testid='title'
        onChange={({ target }) => setTitle(target.value)}
        id='title'
      />
      <br/>
      author:
      <input
        type="text"
        value={author}
        data-testid='author'
        onChange={({ target }) => setAuthor(target.value)}
        id='author'
      />
      <br/>
      url:
      <input
        type="text"
        value={url}
        data-testid='url'
        onChange={({ target }) => setUrl(target.value)}
        id='url'
      />
      <br/>
      <button data-testid='create' id='create' type="submit">create</button>
    </form>
  )
}

export default BlogForm