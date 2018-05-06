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
            shelfChanger={(book, shelf) => {
              this.addBook(book, shelf)
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
