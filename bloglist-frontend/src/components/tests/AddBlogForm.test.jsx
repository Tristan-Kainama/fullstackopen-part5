import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import AddBlogForm from '../AddBlogForm'
import { describe, expect, test, vi } from 'vitest'

describe('<AddBlogForm />', () => {
    test('a blog can be added succesfully', async () => {
        const createBlog = vi.fn()
        const user = userEvent.setup()

        const { container } = render(<AddBlogForm createBlog={createBlog} />)

        const titleInput = container.querySelector('#title')
        const authorInput = container.querySelector('#author')
        const urlInput = container.querySelector('#url')

        await user.type(titleInput, 'cool blog')
        await user.type(authorInput, 'Tristan Kainama')
        await user.type(urlInput, 'http://yesman.com')

        const createButton = screen.getByText('create')
        await user.click(createButton)
        
        expect(createBlog.mock.calls).toHaveLength(1)
        expect(createBlog.mock.calls[0][0].title).toBe('cool blog')
        expect(createBlog.mock.calls[0][0].author).toBe('Tristan Kainama')
        expect(createBlog.mock.calls[0][0].url).toBe('http://yesman.com')
    })
})