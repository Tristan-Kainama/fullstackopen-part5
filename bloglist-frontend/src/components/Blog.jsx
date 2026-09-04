import { useState } from 'react'

const Blog = ({ blog, updateBlog, removeBlog }) => {
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

  const handleRemove = (event) => {
    event.preventDefault()

    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)){
      removeBlog(blog.id)
    }
  }

  return (
    <div style={blogStyle} id={blog.id}>
      <div>
        {blog.title} {blog.author} <button onClick={setVisibility}>{buttonLabel}</button>
      </div>
      <div style={showWhenVisible} className='otherInformation'>
        <p>{blog.url}</p>
        <p>likes {blog.likes}</p> <button onClick={handleLike}>like</button>
        <p>{blog.user.name}</p>
        <button onClick={handleRemove}>remove</button>
      </div>
    </div>
  )
}

export default Blog