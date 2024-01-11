import ItemListBlog from './ItemListBlog'

const BlogList = ({ blogs }) => {
  return(
    <div>
      {blogs.map(blog => (
        <ItemListBlog
          key={blog.id}
          blog={blog}
        />
      ))}
    </div>
  )
}

export default BlogList