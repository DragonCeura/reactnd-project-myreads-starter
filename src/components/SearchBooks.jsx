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
    error: undefined,
    query: '',
    searchResults: []
  }

  /**
  * @description handler for querying the BooksAPI for new books to be added
  */
  search = (query) => {
    query = query.trim()
    this.setState(() => ({
      query: query
    }))

    BooksAPI.search(query).then((books) => {
      if (!books) {
        this.setState({
          error: undefined,
          searchResults: []
        })
        return
      }

      if (books.error) {
        this.setState({
          error: books.error,
          searchResults: []
        })
        return
      }

      if (query === this.state.query) {
        // Explicitly identify books as having "none" shelf if not in the provided books prop
        // Relevant with setting the initial value for the shelf changing dropdown in the Book component
        books = books.map((book) => {
          if (!this.props.books.find(bk => bk.id === book.id)) {
            book.shelf = "none"
          } else {
            book.shelf = this.props.books.find(bk => bk.id === book.id).shelf
          }
          return book
        })

        // Return all valid books
        this.setState({
          error: undefined,
          searchResults: books
        })
      }
    })
  }

  render() {
    const { error, query, searchResults } = this.state
    const { shelfChanger } = this.props

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
            {error && (
              <li className="error-message">Books not found using search query: {query}</li>
            )}
            {searchResults.map((book) => (
              <Book key={book.id} book={book} shelfChanger={shelfChanger} />
            ))}
          </ol>
        </div>
      </div>
    )
  }
}

export default SearchBooks
