import React from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from '../../BooksAPI'

class SearchPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      results: []
    }
  }


  componentDidMount() {
    BooksAPI.getAll()
    .then(resp => {
      console.log(resp);
      this.setState({books: resp});
    });
  }

  updateQuery = (query) => {
    this.setState({query: query}, this.submitSearch);
  }

  submitSearch() {
    if(this.state.query === '' || this.state.query === undefined) {
      return this.setState({results: []});
    }
    BookAPI.search(this.state.query.trim())
    .then(res => {
      if(res.error) {
        return this.setState({results: [] });
      }
      else {
        return this.setState({resutls: res });
      }
    });
  }

  updateBook = (book, shelf) => {
    BooksAPI.update(book, shelf)
    .then(resp => {
      book.shelf = shelf;
      this.setState(state => ({
        books: state.books.filter(b => b.id !== book.id).concat([book])
      }));
    });
  }

  render() {
    return(
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
          <div className="search-books-input-wrapper">
            <input type="text" placeholder="Search by title or author" value={this.state.query}
              onChange={(e) => this.updateQuery(e.target.value)} />

          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid"></ol>
        </div>
      </div>
    );
  }
}


export default SearchPage;
