import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const AddBlogForm = ({ newBlog, setNewBlog, handleAddBlog }) => (
  <div>
    <form onSubmit={handleAddBlog}>
      <label>
        title:
        <input
          type="text"
          name="title"
          value={newBlog.title}
          onChange={({ target }) =>
            setNewBlog((prev) => ({
              ...prev,
              [target.name]: target.value
            }))
          }
        />
      </label>
      <br />

      <label>
        author:
        <input
          type="text"
          name="author"
          value={newBlog.author}
          onChange={({ target }) =>
            setNewBlog((prev) => ({
              ...prev,
              [target.name]: target.value
            }))
          }
        />
      </label>
      <br />

      <label>
        url:
        <input
          type="text"
          name="url"
          value={newBlog.url}
          onChange={({ target }) =>
            setNewBlog((prev) => ({
              ...prev,
              [target.name]: target.value
            }))
          }
        />
      </label>
      <br />

      <button type="submit">create</button>
    </form>
  </div>
)

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  const [newBlog, setNewBlog] = useState({
    title: '',
    author: '',
    url: '',
  })

  useEffect(() => {
    if (!user) {
      return
    }

    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [user])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const loggedInUser = await loginService.login({
        username,
        password
      })

      window.localStorage.setItem(
        'loggedBlogappUser',
        JSON.stringify(loggedInUser)
      )

      blogService.setToken(loggedInUser.token)
      setUser(loggedInUser)
      setUsername('')
      setPassword('')
    } catch {
      setErrorMessage('wrong credentials')

      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()

    window.localStorage.removeItem('loggedBlogappUser')
    blogService.setToken(null)
    setUser(null)
    setUsername('')
    setPassword('')
  }

  const handleAddBlog = async (event) => {
    event.preventDefault()

    try {
      const createdBlog = await blogService.create({
        title: newBlog.title,
        author: newBlog.author,
        url: newBlog.url,
      })

      setBlogs((prevBlogs) => prevBlogs.concat(createdBlog))
      setNewBlog({
        title: '',
        author: '',
        url: '',
      })
    } catch {
      setErrorMessage('failed to add blog')

      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const loginForm = () => (
    <div>
      <h2>Log in to application</h2>

      {errorMessage && <div>{errorMessage}</div>}

      <form onSubmit={handleLogin}>
        <div>
          <label>
            username
            <input
              type="text"
              value={username}
              onChange={({ target }) => setUsername(target.value)}
            />
          </label>

          <br />

          <label>
            password
            <input
              type="password"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
          </label>
        </div>

        <button type="submit">login</button>
      </form>
    </div>
  )

  if (user === null) {
    return loginForm()
  }

  return (
    <div>
      <h2>blogs</h2>

      <p>
        {user.name} logged in{' '}
        <button onClick={handleLogout}>logout</button>
      </p>

      <h2>Add New</h2>

      <AddBlogForm
        newBlog={newBlog}
        setNewBlog={setNewBlog}
        handleAddBlog={handleAddBlog}
      />

      {blogs
        .filter((blog) => blog.user.username === user.username)
        .map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
    </div>
  )
}

export default App