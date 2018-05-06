// Libraries/Utilities
import React from 'react'
import PropTypes from 'prop-types'
// Components
import Book from './Book'

function Bookshelf (props) {
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{props.header}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {props.books.map((book) => (
            <Book key={book.id} book={book} shelfChanger={props.shelfChanger} />
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
