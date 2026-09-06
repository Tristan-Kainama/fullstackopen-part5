import Blog from './Blog'
import Notification from './Notification'

const BlogList = ({ blogs, updateBlog, removeBlog, message, isError}) => {
    return (
        <div>
            <h2>blogs</h2>
            {blogs.map((blog) => (
                <Blog key={blog.id} blog={blog} updateBlog={updateBlog} removeBlog={removeBlog}/>
            ))}
        </div>
    )
}

export default BlogList