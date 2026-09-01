import { useState, useEffect, useRef } from 'react'

import Blog from './components/Blog'
import Notification from './components/Notification'
import AddBlogForm from './components/AddBlogForm'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'

import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)
  const [isError, setIsError] = useState(false)

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
      setIsError(false)
      setMessage(`succesfully logged in as ${username}`)

      setTimeout(() => {
        setMessage(null)
      }, 5000)
    } catch {
      setMessage('wrong credentials')
      setIsError(true)

      setTimeout(() => {
        setMessage(null)
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
    
    setMessage('succesfully logged out')
    setIsError(false)
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  const blogFormRef = useRef()

  const createBlog = async (newBlog) => {
    try {
      const createdBlog = await blogService.create({
        title: newBlog.title,
        author: newBlog.author,
        url: newBlog.url,
        likes: 0
      })

      const allBlogs = await blogService.getAll()
      setBlogs(allBlogs)

      const blogTitle = createdBlog.title || newBlog.title
      const blogAuthor = createdBlog.author || newBlog.author

      blogFormRef.current.toggleVisibility()
      setMessage(`a new blog ${blogTitle} by ${blogAuthor} added`)
      setIsError(false)

      setTimeout(() => {
        setMessage(null)
      }, 5000)
    } catch {
      setMessage('failed to add blog')
      setIsError(true)

      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const updateBlog = async (newBlog, blogId) => {
    try {
      const updatedBlog = await blogService.update({
        title: newBlog.title,
        author: newBlog.author,
        url: newBlog.url,
        likes: newBlog.likes
      }, blogId)

      const allBlogs = await blogService.getAll()
      setBlogs(allBlogs)
    } catch {
      setMessage('failed to update blog')
      setIsError(true)

      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification message={message} isError={isError} />

        <LoginForm
          handleLogin={handleLogin}
          username={username}
          password={password}
          setUsername={setUsername}
          setPassword={setPassword}
        />
      </div>
    )
  }

  const visibleBlogs = [...blogs]
    .filter((blog) => {
      const blogUser = blog.user

      return (
        blogUser?.username === user.username ||
        blogUser?.id === user.id ||
        blogUser === user.id
      )
    })
    .sort((a, b) => b.likes - a.likes)

  return (
    <div>
      <h2>blogs</h2>

      <Notification message={message} isError={isError} />

      <p>
        {user.name} logged in{' '}
        <button onClick={handleLogout}>logout</button>
      </p>

      <h2>Add New</h2>

      <Togglable buttonLabel='create new blog' ref={blogFormRef}>
        <AddBlogForm
          createBlog={createBlog}
        />
      </Togglable>

      {visibleBlogs.map((blog) => (
        <Blog key={blog.id} blog={blog} updateBlog={updateBlog} />
      ))}
    </div>
  )
}

export default App