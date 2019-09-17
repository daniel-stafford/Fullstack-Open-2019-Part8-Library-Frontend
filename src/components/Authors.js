import React, { useState } from 'react'

const Authors = ({ show, result, editBorn }) => {
  const [name, setName] = useState('')
  const [year, setYear] = useState('')
  if (!show) {
    return null
  }
  if (result.loading) {
    return <div>loading...</div>
  }

  const authors = result.data.allAuthors

  const submit = async e => {
    e.preventDefault()

    await editBorn({
      variables: { name, year }
    })

    setName('')
    setYear('')
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map(a => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <h3>Update Author</h3>
        <form onSubmit={submit}>
          <div>
            name
            <input
              value={name}
              onChange={({ target }) => setName(target.value)}
            />
          </div>
          <div>
            born
            <input
              value={year}
              onChange={({ target }) => setYear(parseInt(target.value, 10))}
            />
          </div>

          <button type='submit'>update author </button>
        </form>
      </div>
    </div>
  )
}

export default Authors
