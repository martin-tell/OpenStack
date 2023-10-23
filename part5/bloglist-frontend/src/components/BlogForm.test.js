import React from 'react'
import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'

describe('<BlogForm/>', () => {

  test('calls to addBlog function when the button \'create\' is called', () => {
    const addBlog = jest.fn()
    render(<BlogForm createBlog={addBlog}/>)
    const input_title = screen.queryByTestId('title')
    const input_author = screen.queryByTestId('author')
    const input_url = screen.queryByTestId('url')

    fireEvent.change(input_title, { target: { value: 'Example Title' } })
    fireEvent.change(input_author, { target: { value: 'Somebody' } })
    fireEvent.change(input_url, { target: { value: 'www.url.com' } })

    const create_button = screen.queryByTestId('create')
    fireEvent.click(create_button)

    expect(addBlog.mock.calls).toHaveLength(1)
    expect(addBlog.mock.calls[0][0]['title']).toBe('Example Title')
    expect(addBlog.mock.calls[0][0]['author']).toBe('Somebody')
    expect(addBlog.mock.calls[0][0]['url']).toBe('www.url.com')
  })
})