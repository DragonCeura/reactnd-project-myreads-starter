// Libraries/Utilities
import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { bookshelves } from './../utils/Utils'
// Components
import Bookshelf from './Bookshelf'

function ListBooks ({ books, shelfChanger }) {
  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>
          {bookshelves.map((bookshelf) => (
            <Bookshelf
              key={bookshelf.value}
              header={bookshelf.header}
              books={books.filter((book) => book.shelf === bookshelf.value)}
              shelfChanger={shelfChanger}
            />
          ))}
        </div>
      </div>
      <div className="open-search">
        <Link to='/search'>Add a book</Link>
      </div>
    </div>
  )
}

ListBooks.propTypes = {
  books: PropTypes.array.isRequired,
  shelfChanger: PropTypes.func.isRequired
}

export default ListBooks
