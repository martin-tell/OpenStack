import React from 'react'
import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react'
import Blog from './Blog'

const sampleBlog = {
  title: 'Blog for testing',
  author: 'Somebody',
  url: 'www.url.com',
  likes: 0,
  user: { username: 'Somebody' },
}

describe('<Blog/>', () => {
  test('only show title and author', () => {
    render(<Blog blog={sampleBlog} likeBlog={jest.fn()} userName="Somebody" remove={jest.fn()} />)

    const title = screen.getByText(sampleBlog.title)
    const author = screen.getByText(sampleBlog.author)
    const hidden = screen.queryByTestId('details')

    expect(title).toBeInTheDocument()
    expect(author).toBeInTheDocument()
    expect(hidden).toHaveStyle('display: none')
  })

  test('show url and likes are shown when the button with the text \'view\' is clicked', () => {
    render(<Blog blog={sampleBlog} likeBlog={jest.fn()} userName="Somebody" remove={jest.fn()} />)

    const button = screen.getByRole('button', { name: /view/i })
    fireEvent.click(button)

    const url = screen.getByText(sampleBlog.url)
    const likes = screen.getByText(`likes ${sampleBlog.likes}`)

    expect(url).toBeInTheDocument()
    expect(likes).toBeInTheDocument()
  })

  test('calls twice the likeBlog function when the button \'like\' is clicked twice', () => {
    const like_function = jest.fn()
    render(<Blog blog={sampleBlog} likeBlog={like_function} userName="Somebody" remove={jest.fn()} />)

    const view_button = screen.getByRole('button', { name: /view/i })
    fireEvent.click(view_button)

    const like_button = screen.getByRole('button', { name: /like/i })
    fireEvent.click(like_button)
    fireEvent.click(like_button)

    expect(like_function.mock.calls).toHaveLength(2)
  })
})