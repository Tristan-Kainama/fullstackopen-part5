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

export default AddBlogForm