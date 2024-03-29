import React, { useState } from 'react'
import Select from 'react-select'

const Authors = ({ show, result, editBorn, token }) => {
  const [name, setName] = useState('')
  const [year, setYear] = useState('')
  if (!show) {
    return null
  }
  if (result.loading) {
    return <div>Loading...</div>
  }

  if (!result.data) {
    return <div>No authors available.</div>
  }

  const authors = result.data.allAuthors
  const options = authors.map(a => {
    return { value: a.name, label: a.name }
  })
  const handleChange = selectedOption => {
    setName(selectedOption.value)
  }
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
      {token === undefined && (
        <div>
          <h3>Update Author</h3>
          <form onSubmit={submit}>
            <div>
              <Select isSearchable onChange={handleChange} options={options} />
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
      )}
    </div>
  )
}

export default Authors
