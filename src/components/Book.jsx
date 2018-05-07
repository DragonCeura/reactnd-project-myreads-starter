// Libraries/Utilities
import React from 'react'
import PropTypes from 'prop-types'
import { bookshelves } from './../utils/Utils'

function Book ({ book, shelfChanger }) {
  const imageUrl = book.imageLinks ? book.imageLinks.thumbnail : 'https://books.google.com/googlebooks/images/no_cover_thumb.gif'
  return (
    <li>
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{ width: 128, height: 193, backgroundImage: `url(${imageUrl})` }}
          />
          <div className="book-shelf-changer">
            <select onChange={(event) => shelfChanger(book, event.target.value)}
              value={book.shelf}>
              <option value="moveTo" disabled>Move to...</option>
              {bookshelves.map((bookshelf) => (
                <option key={bookshelf.value} value={bookshelf.value}>{bookshelf.header}</option>
              ))}
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{book.title}</div>
        <div className="book-authors">{book.authors && book.authors.join(", ")}</div>
      </div>
    </li>
  )
}

Book.propTypes = {
  book: PropTypes.object.isRequired,
  shelfChanger: PropTypes.func.isRequired
}

export default Book
