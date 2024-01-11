import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'
import { useSelector } from 'react-redux'

const UserList = () => {
  const users = useSelector(state => state.users)

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>User</th>
          <th>Blogs Created</th>
        </tr>
      </thead>
      <tbody>
        {users.map(u => (
          <tr key={u.id}>
            <td>
              <Link to={`/users/${u.id}`}>{u.name}</Link>
            </td>
            <td>{u.blogs.length}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  )
}

export default UserList