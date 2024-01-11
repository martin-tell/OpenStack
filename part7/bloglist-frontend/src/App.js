import { useEffect, useRef } from 'react'
import Notification from './components/Notification'
import Footer from './components/Footer'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import User from './components/User'
import Blog from './components/Blog'
import MenuBar from './components/MenuBar'
import { useDispatch } from 'react-redux'
import { fetchBlogs, createBlog, commentBlog } from './reducers/blogReducer'
import { loadUser, logIn } from './reducers/userReducer'
import { useSelector } from 'react-redux'
import { getUsers } from './reducers/usersReducer'
import BlogList from './components/BlogList'
import UserList from './components/UserList'
import { Routes, Route, useMatch } from 'react-router-dom'

const App = () => {
  const users = useSelector(state => state.users)
  const match = useMatch('/users/:id')
  const userMatch = match
    ? users.find(a => a.id === match.params.id)
    : null

  const blogs = useSelector(state => state.blog)
  const match2 = useMatch('/blogs/:id')
  const blogMatch = match2
    ? blogs.find(a => a.id === match2.params.id)
    : null

  const blogFormRef = useRef()
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  useEffect(() => {
    dispatch(fetchBlogs())
    dispatch(loadUser())
    dispatch(getUsers())
  }, [dispatch])

  const handleLogin = async (username, password) => {
    dispatch(logIn(username, password))
  }

  const addBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility()
    dispatch(createBlog(blogObject))
  }

  const comment = async (id, comment) => {
    dispatch(commentBlog(id, comment))
  }

  return (
    <div>
      {user && <MenuBar options={['home', 'blogs', 'users']} user={user}></MenuBar>}
      <h2>blog app</h2>
      <Notification />
      {!user && <Togglable buttonLabel='login'>
        <LoginForm login={handleLogin} />
      </Togglable>}
      {user && <div>
        <div>
          <Routes>
            <Route path='/' element={
              <div>
                <h2>create</h2>
                <Togglable buttonLabel='new blog' ref={blogFormRef}>
                  <BlogForm createBlog={ addBlog } />
                </Togglable>
                <br />
              </div>} />
            <Route path='/blogs' element={<BlogList blogs={blogs}></BlogList>} />
            <Route path='/blogs/:id' element={<Blog blog={blogMatch} user={user} commentBlog={comment} />} />
            <Route path='/users' element={<UserList></UserList>}></Route>
            <Route path='/users/:id' element={<User user={userMatch} />} />
          </Routes>
        </div>
      </div>
      }
      <Footer/>
    </div>
  )
}

export default App