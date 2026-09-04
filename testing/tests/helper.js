const loginWith = async (page, username, password) => {
    await page.getByLabel('username').fill(username)
    await page.getByLabel('password').fill(password)
    await page.getByRole('button', { name: 'login' }).click()
}

const addBlog = async (page, title, author, url) => {
    await page.getByRole('button', { name: 'create new blog' }).click()
    await page.getByLabel('title').fill(title)
    await page.getByLabel('author').fill(author)
    await page.getByLabel('url').fill(url)
    await page.getByRole('button', { name: 'create' }).click()
}

const getBlogId = async (title) => {
    const response = await fetch('http://localhost:3001/api/blogs')
    const blogs = await response.json()
    const blog = blogs.find(blog => blog.title === title)
    return blog.id
}

export { loginWith, addBlog, getBlogId }