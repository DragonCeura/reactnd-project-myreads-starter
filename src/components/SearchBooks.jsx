// Libraries/Utilities
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import * as BooksAPI from '../utils/BooksAPI'
// Components
import Book from './Book'

class SearchBooks extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    shelfChanger: PropTypes.func.isRequired
  }

  state = {
    searchResults: []
  }

  /**
  * @description hanlder for querying the BooksAPI for new books to be added
  */
  search = (query) => {
    BooksAPI.search(query).then((books) => {
      if (!books || books.error) {
        this.setState({
          searchResults: []
        })
        return
      }

      // Explicitly identify books as having "none" shelf if not in the provided books prop
      // Relevant with setting the initial value for the shelf changing dropdown in the Book component
      books.map((book) => {
        if (!this.props.books.find(bk => bk.id === book.id))
          book.shelf = "none"
        return book
      })

      // Return all valid books
      this.setState(() => ({
        searchResults: books
      }))
    })
  }

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to='/'>Close</Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              onChange={(event) => this.search(event.target.value)}/>

          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.state.searchResults.map((book) => (
              <Book key={book.id} book={book} shelfChanger={this.props.shelfChanger} />
            ))}
          </ol>
        </div>
      </div>
    )
  }
}

export default SearchBooks
