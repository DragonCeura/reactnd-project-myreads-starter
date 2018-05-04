import React from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './utils/BooksAPI'
import './App.css'

import SearchBooks from './components/SearchBooks'
import ListBooks from './components/ListBooks'

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

  updateBook = (book, shelf) => {
    book.shelf = shelf
    BooksAPI.update(book, shelf)
      .then(
        BooksAPI.getAll()
          .then((books) => {
            this.setState(() => ({
              books: books
            }))
          })
      )
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
            shelfChanger={(book, shelf) => {
              this.updateBook(book, shelf)
              history.push('/')
            }}
            books={this.state.books}
          />
        )} />
      </div>
    )
  }
}

export default BooksApp
