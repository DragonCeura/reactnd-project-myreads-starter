// Libraries/Utilities
import React from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './utils/BooksAPI'
import './App.css'
// Components
import ListBooks from './components/ListBooks'
import SearchBooks from './components/SearchBooks'

class BooksApp extends React.Component {
  state = {
    books: []
  }

  booksAPIRequestPending = false

  componentDidMount() {
    BooksAPI.getAll()
      .then((books) => {
        this.setState(() => ({
          books
        }))
      })
  }

  /**
  * @description Helper function wrapping around the BooksAPI.update() function
  * and catch any errors returned by the API.
  * @param {object} book - The book object being updated
  * @param {string} shelf - The desired shelf to update the book to be put to
  */
  booksAPIUpdate = (book, shelf, currentBooks) => {
    // Start pending API call
    this.booksAPIRequestPending = true
    BooksAPI.update(book, shelf)
      .catch(() => {
        this.setState({
          books: currentBooks
        })
      })
      .then(() => {
        this.booksAPIRequestPending = false
      })
  }

  /**
  * @description Handler for updating what shelf the given book is assigned to
  * @param {object} book - The book object being updated
  * @param {string} shelf - The desired shelf to update the book to be put to
  */
  updateBook = (book, shelf) => {
    if (this.booksAPIRequestPending)
      return

    const currentBooks = this.state.books

    // Optimistic update
    this.setState((prevState) => ({
      books: prevState.books.map((bk) => {
        if (bk.id === book.id)
          bk.shelf = shelf
        return bk
      })
    }))

    // Async API update
    this.booksAPIUpdate(book, shelf, currentBooks)
  }

  /**
  * @description Handler for adding a new book to the list of books to be shelved
  * @param {object} book - The book object being updated
  * @param {string} shelf - The desired shelf to update the book to be put to
  */
  addBook = (book, shelf) => {
    if (this.booksAPIRequestPending)
      return

    // Current state snapshot
    const currentBooks = this.state.books

    // Optimistic update
    book.shelf = shelf
    this.setState((prevState) => ({
      books: prevState.books.concat([book])
    }))

    // Async API update
    this.booksAPIUpdate(book, shelf, currentBooks)
  }

  render() {
    return (
      <div className="app">
        <Route exact path ='/' render={() => (
          <ListBooks
            books={this.state.books}
            shelfChanger={this.updateBook}
          />
        )} />
        <Route exact path ='/search' render={({ history }) => (
          <SearchBooks
            books={this.state.books}
            shelfChanger={this.addBook}
          />
        )} />
      </div>
    )
  }
}

export default BooksApp
