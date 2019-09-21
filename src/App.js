import React, { useState } from 'react'
import { gql } from 'apollo-boost'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import { useQuery, useMutation } from '@apollo/react-hooks'

const ALL_AUTHORS = gql`
  {
    allAuthors {
      name
      born
      bookCount
      id
    }
  }
`

const ALL_BOOKS = gql`
  {
    allBooks {
      title
      author {
        name
        born
        bookCount
        id
      }
      published
      id
    }
  }
`

const ADD_BOOK = gql`
  mutation addBook(
    $title: String!
    $author: String!
    $published: Int!
    $genres: [String!]!
  ) {
    addBook(
      title: $title
      author: $author
      published: $published
      genres: $genres
    ) {
      title
      author {
        name
        born
        bookCount
        id
      }
      published
      genres
      id
    }
  }
`
const EDIT_BORN = gql`
  mutation editAuthor($name: String!, $year: Int!) {
    editAuthor(name: $name, setBornTo: $year) {
      name
      born
      id
    }
  }
`

const App = () => {
  const [errorMessage, setErrorMessage] = useState(null)

  const handleError = error => {
    setErrorMessage(error.message.substring(15))
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }

  const [addBook] = useMutation(ADD_BOOK, {
    onError: handleError,
    refetchQueries: [{ query: ALL_BOOKS }, { query: ALL_AUTHORS }]
  })
  const [editBorn] = useMutation(EDIT_BORN, { onError: handleError })
  const authors = useQuery(ALL_AUTHORS, { onError: handleError })
  const books = useQuery(ALL_BOOKS)
  const [page, setPage] = useState('authors')

  return (
    <div>
      {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
      </div>
      <Authors result={authors} editBorn={editBorn} show={page === 'authors'} />
      <Books result={books} show={page === 'books'} />
      <NewBook addBook={addBook} show={page === 'add'} />
    </div>
  )
}

export default App
