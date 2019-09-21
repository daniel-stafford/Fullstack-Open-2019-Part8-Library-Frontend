import React, { useState } from 'react'
import _ from 'lodash'

const Books = ({ show, result }) => {
  const [filter, setFilter] = useState('')

  if (!show) {
    return null
  }

  if (result.loading) {
    return <div>loading...</div>
  }

  if (!result.data) {
    return <div>No books available.</div>
  }
  const books = result.data.allBooks
  const booksToDisplay = () => {
    if (filter === '') return books
    const result = _.filter(books, b => {
      return b.genres.includes(filter)
    })
    console.log('booksToDisplay', result)
    return result
  }

  const genres = () => {
    let result = books.map(b => b.genres)
    result = [].concat.apply([], result)
    result = _.union(result)
    return result
  }
  const handleFilter = genre => {
    console.log(`you clicked ${genre}`)
    setFilter(genre)
  }

  return (
    <div>
      <h2>books</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {booksToDisplay().map(b => (
            <tr key={b.title}>
              <td>{b.title}</td>
              <td>{b.author.name}</td>
              <td>{b.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {genres().map(g => (
        <button onClick={() => handleFilter(g)} key={g}>
          {g}
        </button>
      ))}
    </div>
  )
}

export default Books
