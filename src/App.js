import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [books, setBooks] = useState([]);
  const [query, setQuery] = useState('Christmas');
  const [search, setSearch] = useState("");

  // recieve input from form
  const updateSearch = e => {
    setSearch(e.target.value);
  }
  // restructure to query format and set query state
  const getSearch = e => {
    e.preventDefault();
    var formatedSearch = search.split(' ').join('%20');
    // console.log(search, formatedSearch);
    setQuery(formatedSearch);
    setSearch("");
  }
  // fetch for data (usually use fetch())
  useEffect(() => {
    //max set to 15 (max = 0 is not working, default is 10)
    axios.get(`https://reststop.randomhouse.com/resources/titles?max=15&expandLevel=1&search=${query}`
    ).then(res => {
      // console.log(res);
      res = res.data.title;
      setBooks(res);
    }).catch(err => console.log(err));
  }, [query]);

  return (
    <>
      {/* search form */}
      <div className="search">
        <input className="search-bar" type="text" placeholder="Search book title..." onChange={updateSearch} />
        <button className="btn search-btn" onClick={getSearch} >Search</button>
      </div>
      {/* search results */}
      <div className="book-list">
        <div className="">
          {(query.length === 0 || !books) ? <h2>Please enter valid value.</h2> :
            books.map(book => (
              <Book
                key={book.isbn}
                title={book.titleweb}
                author={book.author}
                price={book.pricecanada}
                format={book.formatname}
              />
            ))}
        </div>
      </div>
    </>
  )

}

// create Book Component
const Book = ({ title, author, price, format, flapcopy, bio }) => {
  return (
    <div className="book">
      <div className="book-summary" >
        <h3 className="title">
          {title}
        </h3>
        <p>By: {author}</p>
        <p>{format}</p>
        <p>
          <strong>$</strong>{price}
        </p>
      </div>
    </div>
  )
};

export default App;
