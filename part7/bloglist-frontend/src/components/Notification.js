import { useSelector } from 'react-redux'

const styles = {
  success: {
    color: 'green',
    background: 'lightgrey',
    fontSize: '20px',
    borderStyle: 'solid',
    borderRadius: '5px',
    padding: '10px',
    marginBottom: '10px',
  },
  error: {
    color: 'red',
    background: 'lightgrey',
    fontSize: '20px',
    borderStyle: 'solid',
    borderRadius: '5px',
    padding: '10px',
    marginBottom: '10px',
  }
}

const Notification = () => {

  const { message, style } = useSelector(state => {
    return state.notification
  })

  if (message === null) {
    return null
  }

  return (
    <div id='notification' style={styles[style]}>
      {message}
    </div>
  )
}

export default Notification