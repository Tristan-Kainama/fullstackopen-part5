import { useState } from 'react'

const Blog = ({ blog }) => {
  const [visible, setVisible] = useState(false)

  const showWhenVisible = { display: visible ? '' : 'none' }
  const buttonLabel = visible ? 'hide' : 'view'

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
    fontSize: 14
  }

  const setVisibility = (event) => {
    event.preventDefault()
    setVisible((previousVisible) => !previousVisible)
  }

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author} <button onClick={setVisibility}>{buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        <p>{blog.url}</p>
        <p>likes {blog.likes}</p>
        <p>{blog.user.name}</p>
      </div>
    </div>
  )
}

export default Blog