import { useState } from 'react'

const AddBlogForm = ({ createBlog }) => {
  const [newBlog, setNewBlog] = useState({
    title: '',
    author: '',
    url: ''
  })

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
  }

  return (
    <div>
      <form onSubmit={addBlog}>
        <label>
          title:
          <input
            type="text"
            name="title"
            id="title"
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
            id="author"
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
            id="url"
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
}

export default AddBlogForm