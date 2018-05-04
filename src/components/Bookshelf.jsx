// Libraries/Utilities
import React, { Component } from 'react'
import PropTypes from 'prop-types'
// Components
import Book from './Book'

class Bookshelf extends Component {
  static propTypes = {
    header: PropTypes.string.isRequired,
    books: PropTypes.array.isRequired,
    shelfChanger: PropTypes.func.isRequired
  }

  render() {
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.header}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {this.props.books.map((book) => (
              <Book key={book.id} book={book} shelfChanger={this.props.shelfChanger} />
            ))}
          </ol>
        </div>
      </div>
    )
  }
}

export default Bookshelf
