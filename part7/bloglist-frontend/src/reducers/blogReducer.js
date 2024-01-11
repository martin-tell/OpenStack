import { createSlice } from '@reduxjs/toolkit'
import blogs from '../services/blogs'
import { displayNotification } from './notificationReducer'

const blogSlice = createSlice({
  name: 'blog',
  initialState: [],
  reducers: {
    setBlogs(state, action){
      state = []
      return state.concat(action.payload)
    },
    sortBlogs(state, action) {
      const sortByLikes = (array) => {
        return [...array].sort((a, b) => {
          if (a.likes > b.likes) {
            return -1
          }
          if (a.likes < b.likes) {
            return 1
          }
          return 0
        })
      }
      return sortByLikes(action.payload)
    },
    addNewBlog(state, action){
      return state.concat(action.payload)
    },
    replaceLikedBlog(state, action) {
      return state.map(b => b.id !== action.payload.id ? b : action.payload)
    },
    filterDeletedBlog(state, action) {
      return state.filter(b => b.id !== action.payload)
    },
    updateComments(state, action) {
      const { blogId, comments } = action.payload
      const blogIndex = state.findIndex(blog => blog.id === blogId)
      if (blogIndex !== -1) {
        const updatedBlog = {
          ...state[blogIndex],
          comments: state[blogIndex].comments.concat(comments)
        }
        console.log(updatedBlog)
        return [
          ...state.slice(0, blogIndex),
          updatedBlog,
          ...state.slice(blogIndex + 1),
        ]
      }
      return state
    }
  }
})

export const fetchBlogs = () => {
  return async (dispatch) => {
    const response = await blogs.getAll()
    dispatch(setBlogs(response))
    dispatch(sortBlogs(response))
  }
}

export const createBlog = (blog) => {
  return async (dispatch) => {
    try{
      const returnedBlog = await blogs.create(blog)
      await dispatch(addNewBlog(returnedBlog))
      dispatch(displayNotification(`a new blog '${blog.title}' by ${blog.author} added`, 'success', 5000))
    }catch(exception){
      dispatch(displayNotification(exception.response.data.error, 'error', 5000))
    }
  }
}

export const likeBlog = (id, blog) => {
  return async (dispatch) => {
    try{
      const returnedBlog = await blogs.update(id, blog)
      dispatch(replaceLikedBlog(returnedBlog))
    }catch(exception){
      dispatch(displayNotification('Error. Like can\'t be registered in this moment', 'error', 5000))
    }
  }
}

export const removeBlog = (id, title, author) => {
  return async (dispatch) => {
    try{
      const decision = window.confirm(`Remove blog '${title}' by ${author}`)
      if (decision) {
        await blogs.remove(id)
        dispatch(filterDeletedBlog(id))
        dispatch(displayNotification(`'${title}' by ${author} was deleted`, 'success', 5000))
      }
    }catch(exception){
      dispatch(displayNotification(`'${title}' by ${author} can't be deleted successfully`, 'error', 5000))
    }
  }
}

export const commentBlog = (id, comment) => {
  return async (dispatch) => {
    try{
      const response = await blogs.addComment(id, comment)
      dispatch(updateComments({ blogId: id, comments: response }))
      dispatch(displayNotification('Comment added successfully', 'success', 5000))
    }catch(exception){
      console.log(exception)
      dispatch(displayNotification('Error. Your comment couldn\'t be published', 'error', 5000))
    }
  }
}

export const { setBlogs, sortBlogs, replaceLikedBlog, addNewBlog, filterDeletedBlog, updateComments } = blogSlice.actions

export default blogSlice.reducer