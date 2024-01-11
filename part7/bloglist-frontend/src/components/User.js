import { Card } from 'react-bootstrap'

const User = ({ user }) => {
  return (
    <Card>
      <Card.Body>
        <Card.Title>{user.name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">Blogs Added</Card.Subtitle>
        <ul>
          {user.blogs.map(blog => (
            <li key={blog.id}>{blog.title}</li>
          ))}
        </ul>
      </Card.Body>
    </Card>
  )
}

export default User
