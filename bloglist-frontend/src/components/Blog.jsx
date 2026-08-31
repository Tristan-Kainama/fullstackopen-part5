import { useState } from 'react'

const Blog = ({ blog, updateBlog }) => {
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

  const handleLike = (event) => {
    event.preventDefault()

    updateBlog({
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1
    }, blog.id)
  }

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author} <button onClick={setVisibility}>{buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        <p>{blog.url}</p>
        <p>likes {blog.likes}</p> <button onClick={handleLike}>like</button>
        <p>{blog.user.name}</p>
      </div>
    </div>
  )
}

export default Blog