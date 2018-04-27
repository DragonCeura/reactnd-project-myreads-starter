import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import Bookshelf from './Bookshelf'
import { bookshelves } from './../utils/Utils'

class ListBooks extends Component {
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
