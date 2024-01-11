import { Link } from 'react-router-dom'
import { Card } from 'react-bootstrap'

const ItemListBlog = ({ blog }) => {
  return (
    <Card style={{ marginBottom: '10px' }}>
      <Card.Body>
        <Link to={`/blogs/${blog.id}`} style={{ textDecoration: 'none' }}>
          <Card.Title>{blog.title}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">{blog.author}</Card.Subtitle>
        </Link>
      </Card.Body>
    </Card>
  )
}

ItemListBlog.displayName = 'ItemListBlog'

export default ItemListBlog