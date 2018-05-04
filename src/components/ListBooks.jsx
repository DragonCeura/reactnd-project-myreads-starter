// Libraries/Utilities
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
// Components
import Bookshelf from './Bookshelf'
import { bookshelves } from './../utils/Utils'

class ListBooks extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    shelfChanger: PropTypes.func.isRequired
  }

  render() {
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
                books={this.props.books.filter((book) => book.shelf === bookshelf.value)}
                shelfChanger={this.props.shelfChanger}
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
}

export default ListBooks
