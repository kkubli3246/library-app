import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import NavBar from './NavBar';
import { useState, useEffect } from 'react';
import SearchBook from './SearchBook';
import dataSource from './dataSource';
import EditBook from  './EditBook';
import OneBook from './OneBook';
import DeleteBook from './DeleteBook';

const App = () => {

  //State Variables
  const[bookList, setBookList] = useState([]);
  const [searchPhrase, setSearchPhrase] = useState('');
  const [currentSelectedBookId, setCurrentSelectedBookId] = useState(0);

  //Read Books from Db and populate BookList
  const loadBooks = async () => {
    const response = await dataSource.get(`/books`);
    setBookList(response.data);
  }

  let refresh = false;

  useEffect(() =>{
    loadBooks();
  }, [refresh]
  );

  const updateSearchResults  = async (phrase) =>{
    console.log('Phrase is = ' + phrase);
    setSearchPhrase(phrase);
  }

  const updateSingleBook = (id, navigate, uri) =>{
    // console.log(`Update single Album: `, id);
    // console.log(`Update single Album: `, navigate);

    var indexNumber = 0;

    console.log("what is the ID "+ id); 
    
    for(let i = 0; i < bookList.length; ++i){
        if(Object.values(bookList[i])[0] === id) {
          
            indexNumber = i;
        }

    }

    
    setCurrentSelectedBookId(indexNumber);
    let path = uri + indexNumber;
    console.log("path" + path);
    navigate(path);
}

 //Reander List of Books to the screen, based on Search Phrase(All Books if Search is empty)
 const renderedList = bookList.filter((book) =>{
       
    if(
        book.title.toLowerCase().includes(searchPhrase.toLowerCase()) ||
        searchPhrase === ''
    ){
        return true;
    }
    return false;
  });

  const onEditBook = (navigate) =>{
    loadBooks();
    navigate('/');
}

  return (
    <BrowserRouter>
      <NavBar/>
      <Routes>
        <Route
            exact
            path ='/'
            element={
              <SearchBook
                updateSearchResults={updateSearchResults}
                bookList ={renderedList}
                updateSingleBook={updateSingleBook}
              />
            }
        />
        <Route exact path='/new' element={<EditBook onEditBook={onEditBook}/>} />
        <Route exact path='/edit/:bookId' element={<EditBook onEditBook={onEditBook} book={bookList[currentSelectedBookId]}/>} />
       
      </Routes>
    </BrowserRouter>
  );
}

export default App;
