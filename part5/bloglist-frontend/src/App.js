import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Footer from './components/Footer'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import loginService from './services/login'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [message, setMessage] = useState(null)
  const [style, setStyle] = useState('')
  const [user, setUser] = useState(null)
  const blogFormRef = useRef()

  useEffect(() => {
    const fetchBlogs = async () => {
      const response = await blogService.getAll()
      const sortedBlogs = sortByLikes(response)
      setBlogs(sortedBlogs)
    }
    fetchBlogs()
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const sortByLikes = (array) => {
    array.sort((a, b) => {
      if (a.likes > b.likes) {
        return -1
      }
      if (a.likes < b.likes) {
        return 1
      }
      return 0
    })
    return array
  }

  const handleLogin = async (username, password) => {
    try {
      const user = await loginService.login({
        username, password
      })
      blogService.setToken(user.token)
      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(user)
      )
      setUser(user)
    } catch(exception){
      setMessage('wrong credentials')
      setStyle('error')
      setTimeout(() => {
        setMessage(null)
        setStyle('')
      }, 5000)
    }
  }

  const addBlog = async (blogObject) => {
    try{
      blogFormRef.current.toggleVisibility()
      const returnedBlog = await blogService.create(blogObject)
      setMessage(`a new blog '${blogObject.title}' by ${blogObject.author} added`)
      setStyle('success')
      setBlogs(blogs.concat(returnedBlog))
    }catch(exception){
      setMessage(exception.response.data.error)
      setStyle('error')
    }finally{
      setTimeout(() => {
        setMessage(null)
        setStyle(null)
      }, 5000)
    }
  }

  const like = async (id, blogObject) => {
    try{
      const returnedBlog = await blogService.update(id, blogObject)
      setBlogs(blogs.map(b => b.id !== returnedBlog.id ? b : returnedBlog))
    }catch(exception){
      setMessage('Error. Like can\'t be registered in this moment')
      setStyle('error')
    }finally{
      setTimeout(() => {
        setMessage(null)
        setStyle(null)
      }, 3000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogAppUser')
    location.reload()
  }

  const deleteBlog = async (id, title, author) => {
    try {
      const decision = window.confirm(`Remove blog '${title}' by ${author}`)
      if (decision) {
        blogService.remove(id)
        setMessage(`'${title}' by ${author} was deleted`)
        setStyle('success')
        setBlogs(blogs.filter(b => b.id !== id))
      }
    } catch(exception) {
      setMessage(`'${title}' by ${author} can't be deleted successfully`)
      setStyle('error')
    } finally {
      setTimeout(() => {
        setMessage(null)
        setStyle(null)
      }, 5000)
    }
  }

  return (
    <div>
      <h1>Blogs app</h1>
      <Notification message={message} style={style} />
      {!user && <Togglable buttonLabel='login'>
        <LoginForm login={handleLogin} />
      </Togglable>}
      {user && <div>
        <div>
          <h2>blogs</h2>
          <p>{user.name} logged in <button type='submit' onClick={handleLogout}>logout</button></p>
          <h2>create</h2>
          <Togglable buttonLabel='new blog' ref={blogFormRef}>
            <BlogForm createBlog={addBlog} />
          </Togglable>
          <br/>
          {blogs.map(blog => <Blog
            key={blog.id}
            blog={blog}
            likeBlog={like}
            userName={user.username}
            remove={deleteBlog}
          /> )}
        </div>
      </div>
      }
      <Footer/>
    </div>
  )
}

export default App