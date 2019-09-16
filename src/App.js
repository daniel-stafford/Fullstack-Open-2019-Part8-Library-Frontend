import React, { useState } from 'react'
import { Query, Mutation } from 'react-apollo'
import { gql } from 'apollo-boost'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'

const ALL_AUTHORS = gql`
  {
    allAuthors {
      name
      born
      bookCount
    }
  }
`

const ALL_BOOKS = gql`
  {
    allBooks {
      title
      author
      published
    }
  }
`

const ADD_BOOK = gql`
  mutation addBook(
    $title: String!
    $author: String!
    $published: String!
    $genres: [String!]!
  ) {
    addBook(
      title: $title
      author: $author
      published: $published
      genres: $genres
    ) {
      title
      author
      published
      genres
    }
  }
`

const App = () => {
  const [page, setPage] = useState('authors')

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
      </div>
      <Query query={ALL_AUTHORS}>
        {result => <Authors result={result} show={page === 'authors'} />}
      </Query>

      <Query query={ALL_BOOKS}>
        {result => <Books result={result} show={page === 'books'} />}
      </Query>
      <Mutation
        mutation={ADD_BOOK}
        refetchQueries={[{ query: ALL_BOOKS }, { query: ALL_AUTHORS }]}
      >
        {addBook => <NewBook addBook={addBook} show={page === 'add'} />}
      </Mutation>
    </div>
  )
}

export default App
