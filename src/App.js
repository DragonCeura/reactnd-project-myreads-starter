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

  componentDidMount() {
    BooksAPI.getAll()
      .then((books) => {
        this.setState(() => ({
          books: books
        }))
      })
  }

  /**
  * @description Handler for updating what shelf the given book is assigned to
  * @param {object} book - The book object being updated
  * @param {string} shelf - The desired shelf to update the book to be put to
  */
  updateBook = (book, shelf) => {
    this.setState((prevState) => ({
      books: prevState.books.map((bk) => {
        if (bk.id === book.id)
          bk.shelf = shelf
        return bk
      })
    }))
    BooksAPI.update(book, shelf)
  }

  /**
  * @description Handler for adding a new book to the list of books to be shelved
  * @param {object} book - The book object being updated
  * @param {string} shelf - The desired shelf to update the book to be put to
  */
  addBook = (book, shelf) => {
    book.shelf = shelf
    this.setState((prevState) => ({
      books: prevState.books.concat([book])
    }))
    BooksAPI.update(book, shelf)
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
            shelfChanger={(book, shelf) => {
              this.addBook(book, shelf)
              history.push('/')
            }}
          />
        )} />
      </div>
    )
  }
}

export default BooksApp
