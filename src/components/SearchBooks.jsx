import React, { Component } from 'react'
import * as BooksAPI from '../utils/BooksAPI'

import Book from './Book'

class SearchBooks extends Component {

  state = {
    searchResults: []
  }

  search = (query) => {
    BooksAPI.search(query).then((books) => {
      if (!books || books.error) {
        this.setState({
          searchResults: []
        })
        return;
      }

      books.map((book) => {
        book.shelf = (!this.props.books.find(bk => bk.id === book.id))
          ?
          book.shelf = "none"
          :
          book.shelf
      })

      this.setState(() => ({
        searchResults: books.filter((book) => book.shelf === "none")
      }))
    })
  }

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <a className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</a>
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
