import React, { useState } from 'react'
import { gql } from 'apollo-boost'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import { useQuery, useMutation, useApolloClient } from '@apollo/react-hooks'

const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`
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
      genres
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
      bookCount
      id
    }
  }
`

const App = () => {
  const [errorMessage, setErrorMessage] = useState(null)
  const client = useApolloClient()
  const handleError = error => {
    setErrorMessage(error.message.substring(15))
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }

  const [token, setToken] = useState(null)

  const [addBook] = useMutation(ADD_BOOK, {
    onError: handleError,
    refetchQueries: [{ query: ALL_BOOKS }, { query: ALL_AUTHORS }]
  })
  const [editBorn] = useMutation(EDIT_BORN, {
    onError: handleError,
    refetchQueries: [{ query: ALL_BOOKS }, { query: ALL_AUTHORS }]
  })
  const authors = useQuery(ALL_AUTHORS, { onError: handleError })
  const books = useQuery(ALL_BOOKS)
  const [login] = useMutation(LOGIN, {
    onError: handleError
  })

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  const [page, setPage] = useState('authors')

  if (!token) {
    return (
      <div>
        {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
        <div>
          <button onClick={() => setPage('authors')}>authors</button>
          <button onClick={() => setPage('books')}>books</button>
          <button onClick={() => setPage('login')}>login</button>
        </div>
        <Authors
          result={authors}
          editBorn={editBorn}
          show={page === 'authors'}
          token={token}
        />
        <Books result={books} show={page === 'books'} />
        <LoginForm
          login={login}
          setToken={token => setToken(token)}
          show={page === 'login'}
        />
      </div>
    )
  }
  return (
    <div>
      {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
        <button onClick={logout}>logout</button>
      </div>
      <Authors result={authors} editBorn={editBorn} show={page === 'authors'} />
      <Books result={books} show={page === 'books'} />
      <NewBook addBook={addBook} show={page === 'add'} />
    </div>
  )
}

export default App
