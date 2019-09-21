import React from 'react'
import _ from 'lodash'

const Recommendations = ({ show, result, user }) => {
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
  console.log('recommendations user genre', user.data.me.genre)
  const favGenre = user.data.me.genre

  const booksToDisplay = () => {
    const result = _.filter(books, b => {
      //how do I get the user's fav genre?
      return b.genres.includes(favGenre)
    })
    console.log('booksToDisplay', result)
    return result
  }

  return (
    <div>
      <h2>Recommendations</h2>
      <h4>books in your favorite genre: {favGenre}</h4>
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
    </div>
  )
}

export default Recommendations
