import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { TextField, Button } from '@mui/material'

const AddBlogForm = ({ createBlog }) => {
  const [newBlog, setNewBlog] = useState({
    title: '',
    author: '',
    url: ''
  })
  const navigate = useNavigate()

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: newBlog.title,
      author: newBlog.author,
      url: newBlog.url
    })

    setNewBlog({
      title: '',
      author: '',
      url: ''
    })

    navigate('/')
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <TextField
        label='title'
        name='title'
        id='title'
        value={newBlog.title}
        onChange={({ target }) =>
            setNewBlog((prev) => ({
              ...prev,
              [target.name]: target.value
            }))
          }
        style={{ marginTop: 10 }}/>
        
        <br />
        
        <TextField
        label='author'
        name='author'
        id='author'
        value={newBlog.author}
        onChange={({ target }) =>
            setNewBlog((prev) => ({
              ...prev,
              [target.name]: target.value
            }))
          }
        style={{ marginTop: 10 }}/>

        <br />
        
        <TextField
        label='url'
        name='url'
        id='url'
        value={newBlog.url}
        onChange={({ target }) =>
            setNewBlog((prev) => ({
              ...prev,
              [target.name]: target.value
            }))
          }
        style={{ marginTop: 10 }}/>

        <br />

        <Button type="submit" variant="contained" style={{ marginTop: 10 }}>create</Button>
      </form>
    </div>
  )
}

export default AddBlogForm