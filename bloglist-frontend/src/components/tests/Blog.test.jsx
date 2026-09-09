import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import Blog from '../Blog'
import { describe, expect, vi } from 'vitest'

const blog = {
  id: '1',
  title: 'great blog',
  author: 'Tristan Kainama',
  url: 'http://yesman.com',
  likes: 10,
  user: {
    id: 'u1',
    username: 'tristank',
    name: 'Tristan K.'
  }
}

const creator = {
  id: 'u1',
  username: 'tristank',
  name: 'Tristan K.'
}

const viewer = {
  id: 'u2',
  username: 'otheruser',
  name: 'Other User'
}

const users = [creator, viewer]

const renderBlog = (currentUser = null, updateBlog = vi.fn(), removeBlog = vi.fn()) => {
  render(
    <MemoryRouter initialEntries={['/blogs/1']}>
      <Routes>
        <Route
          path='/blogs/:id'
          element={
            <Blog
              blogs={[blog]}
              users={users}
              user={currentUser}
              updateBlog={updateBlog}
              removeBlog={removeBlog}
            />
          }
        />
      </Routes>
    </MemoryRouter>
  )
}

describe('<Blog /> single view', () => {
  test('shows blog information and likes for unauthenticated users without buttons', () => {
    renderBlog(null)

    expect(screen.getByRole('heading', { name: 'great blog' })).toBeInTheDocument()
    expect(screen.getByText('http://yesman.com')).toBeVisible()
    expect(screen.getByText('likes 10')).toBeVisible()
    expect(screen.getByText('Added By Tristan K.')).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'like' })).not.toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'remove' })).not.toBeInTheDocument()
  })

  test('shows only the like button for authenticated users who are not the creator', () => {
    renderBlog(viewer)

    expect(screen.getByRole('button', { name: 'like' })).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'remove' })).not.toBeInTheDocument()
  })

  test('shows the delete button for the blog creator in addition to the like button', () => {
    renderBlog(creator)

    expect(screen.getByRole('button', { name: 'like' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'remove' })).toBeInTheDocument()
  })
})
