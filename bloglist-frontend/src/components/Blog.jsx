import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const Blog = ({ blogs, user, updateBlog, removeBlog }) => {
  const [visible, setVisible] = useState(false)
  const navigate = useNavigate()

  const id = useParams().id
  const blog = blogs.find(blog => blog.id === id)

  const showWhenVisible = { display: visible ? '' : 'none' }
  const buttonLabel = visible ? 'hide' : 'view'

  const setVisibility = (event) => {
    event.preventDefault()
    setVisible((previousVisible) => !previousVisible)
  }

  const handleLike = (event) => {
    event.preventDefault()

    if (!user) {
      navigate('/login')
    }

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
      if (!user) {
        navigate('/login')
      }
      
      removeBlog(blog.id)
      navigate('/')
    }
  }

  return (
    <div id={blog.id}>
      <h2>{blog.title}</h2>
      <p>{blog.url}</p>
      <p>likes {blog.likes}</p> <button onClick={handleLike}>like</button>
      <p>Added By {blog.user.name}</p>
      <button onClick={handleRemove}>remove</button>
    </div>
  )
}

export default Blog