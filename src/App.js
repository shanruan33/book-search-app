import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [books, setBooks] = useState([]);
  const [query, setQuery] = useState('Christmas');
  const [search, setSearch] = useState("");
  // const [savedBooks, setSavedBooks] = useState([]);
  // const [isbn, setIsbn] = useState(""); 

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

  ///////// Task 6: fetch data from database
  // useEffect(() => {
  //   getSavedBooks();
  // }, []);
  // const getSavedBooks = async () => {
  //   await axios.get('http://localhost:8080/api/v1/book').then(res => {
  //     console.log(res);
  //     res = res.data;
  //     setSavedBooks(res);
  //     console.log(savedBooks);
  //   }).catch(err => console.log(err));
  // }
  // const handleAdd = isbn => {     //Other option:[...savedBooks, tempBook] => setSavedBooks([...new Set(tempBooks)])
  //   let existedBook = [...savedBooks];
  //   existedBook = existedBook.find(book => book.isbn === isbn);
  //   if (!existedBook) {
  //     setIsbn(isbn);
  //     let tempBook = [...books];
  //     tempBook = tempBook.find(book => book.isbn === isbn);
  //     let updatedSavedBooks = [...savedBooks, tempBook]
  //     setSavedBooks(updatedSavedBooks);
  //     console.log(updatedSavedBooks);
  //   }
  // }
  // const handleDelete = isbn => {
  //   setIsbn(isbn);
  //   let savedbooks = [...savedBooks];
  //   savedbooks = savedbooks.filter(book => book.isbn !== isbn);
  //   setSavedBooks(savedbooks);
  // }

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
                key={book.index}
                title={book.titleweb}
                author={book.author}
                price={book.pricecanada}
                format={book.formatname}
                flapcopy={book.flapcopy}
                bio={book.authorbio}
                isbn={book.isbn}
                saved={false}
                id={""}
                // onAdd={handleAdd}
              />
            ))}
        </div>
        {/* ///////// Task 6: show saved books*/}
        {/* <div className="saved-books" >
          {!savedBooks ? <h2>You don't have saved books.</h2> :
            savedBooks.map(book => (
              <Book
                key={book._id}
                title={book.titleweb}
                author={book.author}
                price={book.pricecanada}
                format={book.formatname}
                flapcopy={book.flapcopy}
                bio={book.authorbio}
                isbn={book.isbn}
                saved={true}
                id={book._id}
                onDelete={handleDelete}
              />
            ))}
        </div> */}
      </div>
    </>
  )

}

// create Book Component
const Book = ({ title, author, price, format, flapcopy, bio, isbn, saved, id, onDelete, onAdd }) => {
  // click event for showing details
  const collapse = (e) => {
    e.preventDefault();
    console.log(e.target.className);
    if (e.target.className === 'book-summary') {
      var content = e.target.nextElementSibling;
      if (content.style.display === "block") {
        content.style.display = "none";
      } else {
        content.style.display = "block";
      }
    }
  }

  ///////// Task 5: save books to DB
  // const addBook = (e) => {
  //   e.preventDefault();
  //   axios.post('http://localhost:8080/api/v1/book', {
  //     "titleweb": title,
  //     "author": author,
  //     "pricecanada": price,
  //     "formatname": format,
  //     "flapcopy": flapcopy,
  //     "authorbio": bio,
  //     "isbn": isbn
  //   }).then(() => {
  //     console.log("data sent");
  //   }).catch(err => console.log(err));
  //   onAdd(e.target.id);
  //   console.log(e.target);
  //   e.target.className = 'clicked';
  // };
  // ///////// Task 7: delete books to DB
  // const deleteBook = (e) => {
  //   e.preventDefault();
  //   axios.delete(`http://localhost:8080/api/v1/book/${id}`).then(() => {
  //     console.log("data deleted");
  //   }).catch(err => console.log(err));
  //   onDelete(e.target.id);
  // };
  return (
    <div className="book">
      <div className="book-summary" onClick={collapse}>
        <h3 className="title">
          {title}
        </h3>
        <p>By: {author}</p>
        <p>{format}</p>
        <p className="price">
          <strong>$</strong>{price}
        </p>
      </div>
      <div className="collapse">
        <h4>Introduction</h4>
        <p>{flapcopy}</p>
        <h4>About Author</h4>
        <p>{bio}</p>
      </div>
      {/* ////// Task 5 & 7 */}
      {saved ? <div className="delete-btn"
        // onClick={deleteBook}
      ><span id={isbn}>-</span></div> : <div className="save-btn"
        // onClick={addBook}
      ><span id={isbn}>+</span></div>}
      {/* function insert here (eg. axios.post()) for later connect to backend */}
    </div>
  )
};

export default App;
