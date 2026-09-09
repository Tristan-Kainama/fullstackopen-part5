import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const Blog = ({ blogs, users, user, updateBlog, removeBlog }) => {
  const navigate = useNavigate()
  const curUser = user ? users.find(thisUser => thisUser.username === user.username) : null

  const id = useParams().id
  const blog = blogs.find(blog => blog.id === id)

  const handleLike = (event) => {
    event.preventDefault()

    if (!user) {
      navigate('/login')
      return
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

    if (!user) {
      navigate('/login')
      return
    }

    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      removeBlog(blog.id)
      navigate('/')
    }
  }

  const isOwner = curUser && curUser.id === blog.user.id

  return (
    <div id={blog.id}>
      <h2>{blog.title}</h2>
      <p>{blog.url}</p>
      <p>likes {blog.likes}</p>
      {user ? <button onClick={handleLike}>like</button> : null}
      <p>Added By {blog.user.name}</p>
      {isOwner ? <button onClick={handleRemove}>remove</button> : null}
    </div>
  )
}

export default Blog