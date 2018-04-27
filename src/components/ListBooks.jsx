import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import Bookshelf from './Bookshelf'

class ListBooks extends Component {
  render() {
    const bookshelves = [
      {
        header: "Currently Reading",
        key: "currentlyReading"
      },
      {
        header: "Want to Read",
        key: "wantToRead"
      },
      {
        header: "Read",
        key: "read"
      }
    ]

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            {bookshelves.map((bookshelf) => (
              <Bookshelf
                header={bookshelf.header}
                key={bookshelf.key}
                books={this.props.books.filter((book) => book.shelf === bookshelf.key)}
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
