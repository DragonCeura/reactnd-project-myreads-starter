// Libraries/Utilities
import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Book extends Component {
  static propTypes = {
    book: PropTypes.object.isRequired,
    shelfChanger: PropTypes.func.isRequired
  }

  render() {
    const imageUrl = this.props.book.imageLinks
      ?
      this.props.book.imageLinks.thumbnail
      :
      'https://books.google.com/googlebooks/images/no_cover_thumb.gif'
    return (
      <li>
        <div className="book">
          <div className="book-top">
            <div
              className="book-cover"
              style={{ width: 128, height: 193, backgroundImage: `url(${imageUrl})` }}
            />
            <div className="book-shelf-changer">
              <select onChange={(event) => this.props.shelfChanger(this.props.book, event.target.value)}
                value={this.props.book.shelf}>
                <option value="moveTo" disabled>Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
          <div className="book-title">{this.props.book.title}</div>
          <div className="book-authors">{this.props.book.authors && this.props.book.authors.join(", ")}</div>
        </div>
      </li>
    )
  }
}

export default Book
