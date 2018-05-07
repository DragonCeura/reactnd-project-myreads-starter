// Libraries/Utilities
import React from 'react'
import PropTypes from 'prop-types'
// Components
import Book from './Book'

function Bookshelf ({ header, books, shelfChanger }) {
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{header}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {books.map((book) => (
            <Book key={book.id} book={book} shelfChanger={shelfChanger} />
          ))}
        </ol>
      </div>
    </div>
  )
}

Bookshelf.propTypes = {
  header: PropTypes.string.isRequired,
  books: PropTypes.array.isRequired,
  shelfChanger: PropTypes.func.isRequired
}

export default Bookshelf
