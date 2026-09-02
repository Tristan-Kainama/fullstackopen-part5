const Notification = ({ message, isError }) => {
  if (message === null) {
    return null
  }

  const color = isError ? 'red' : 'green'

  return (
    <div className="notification" style={{ color }}>
      {message}
    </div>
  )
}

export default Notification