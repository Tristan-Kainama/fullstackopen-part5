import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from '../Blog'
import { describe, expect, vi } from 'vitest'

describe('<Blog /> rendering', () => {
    beforeEach(() => {
        const blog = {
            title: 'great blog',
            author: 'Tristan Kainama',
            url: 'http://yesman.com',
            likes: 10,
            user: {
                username: 'tristank',
                name: 'Tristan K.'
            }
        }

        render(<Blog blog={blog}/>)
    })

    test('renders title and author', () => {
        screen.getByText('great blog', {exact: false})
        screen.getByText('Tristan Kainama', {exact: false})
    })

    test('at start the other information are not displayed', () => {
        const element = screen.getByText('http://yesman.com')
        expect(element).not.toBeVisible()
    })

    test('after view button is clicked, other information are displayed', async () => {
        const user = userEvent.setup()
        const button = screen.getByText('view')
        await user.click(button)

        const url = screen.getByText('http://yesman.com')
        expect(url).toBeVisible()

        const likes = screen.getByText('10', {exact: false})
        expect(likes).toBeVisible()
    })
})

describe('<Blog /> buttons', () => {
    test('if like button is clicked twice, receive props twice', async () =>{
        const blog = {
            title: 'great blog',
            author: 'Tristan Kainama',
            url: 'http://yesman.com',
            likes: 10,
            user: {
                username: 'tristank',
                name: 'Tristan K.'
            }
        }

        const mockHandler = vi.fn()

        render(<Blog blog={blog} updateBlog={mockHandler}/>)

        const user = userEvent.setup()
        const button = screen.getByText('like')
        
        await user.click(button)
        await user.click(button)

        expect(mockHandler.mock.calls).toHaveLength(2)
    })
})