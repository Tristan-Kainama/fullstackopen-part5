import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

import Blog from './components/Blog'
import Notification from './components/Notification'
import AddBlogForm from './components/AddBlogForm'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import BlogList from './components/BlogList'

import {
  BrowserRouter as Router,
  Routes, Route, Link
} from 'react-router-dom'

import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

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
      return true
    } catch {
      setMessage('wrong credentials')
      setIsError(true)

      setTimeout(() => {
        setMessage(null)
      }, 5000)
      return false
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
      await blogService.update({
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

  const removeBlog = async (blogId) => {
    try {
      const blogToDelete = await blogService.getBlog(blogId)
      await blogService.remove(blogId)

      const allBlogs = await blogService.getAll()
      setBlogs(allBlogs)

      setMessage(`${blogToDelete.title} by ${blogToDelete.author} blog has been sucessfully removed`)

      setTimeout(() => {
        setMessage(null)
      }, 5000)
    } catch {
      setMessage('failed to delete blog')
      setIsError(true)

      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  // const visibleBlogs = [...blogs]
  //   .filter((blog) => {
  //     const blogUser = blog.user

  //     return (
  //       blogUser?.username === user.username ||
  //       blogUser?.id === user.id ||
  //       blogUser === user.id
  //     )
  //   })
  //   .sort((a, b) => b.likes - a.likes)

  return (
    <Router>
      <div>
        <Link to='/'>blogs</Link>
        {user ?  <button onClick={handleLogout}>logout</button> : <Link to='/login'>login</Link>}
      </div>

      <Notification message={message} isError={isError} />

      <Routes>
        <Route path='/' element={
          <BlogList blogs={blogs} updateBlog={updateBlog} removeBlog={removeBlog} message={message} isError={isError}/>
        }/>
        <Route path='/login' element={
          <LoginForm 
          handleLogin={handleLogin}
          username={username}
          password={password}
          setUsername={setUsername}
          setPassword={setPassword}/>
        }/>
      </Routes>

      {/* {user && <>
        <h2>Add New</h2>
        <Togglable buttonLabel='create new blog' ref={blogFormRef}>
          <AddBlogForm createBlog={createBlog} />
        </Togglable>
      </>} */}
    </Router>
  )
}

export default App