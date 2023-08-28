import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import dataSource from './dataSource'


const NewBook = (props) =>{
        
    let book = {
        title: '',
        author:'',
        isbn: '',
        genre: ''
    }
    let newBookCreation = true;

    if(props.book){
        book = props.book;
        newBookCreation = false;
        //console.log(book);


    }


    const[bookTitle, setBookTitle] = useState(book.title);
    const[bookAuthor, setBookAuthor] = useState(book.author);
    const[bookIsbn, setbBookIsbn] = useState(book.isbn);
    const[bookGenre, setBookgenre] = useState(book.genre);
    
    const navigate = useNavigate();

    const updateTitle = (event) =>{
        setBookTitle(event.target.value);
    }
    const updateAuthor = (event) =>{
        setBookAuthor(event.target.value);
    }
    const updateISBN = (event) =>{
        setbBookIsbn(event.target.value);
    }
    const updateGenre = (event) =>{
        setBookgenre(event.target.value);
    }

    const handleFormSubmit = (event) => {
        event.preventDefault();

        console.log('Submitted');

        const editedBook = {
            bookId: book.id,
            title: bookTitle,
            author: bookAuthor,
            isbn: bookIsbn,
            genre: bookGenre
        }

        console.log(book);

        saveBook(editedBook);

    }

    const saveBook = async(book) => {
        let response;

        

        if(newBookCreation){
            response = await dataSource.post('/books', book); 
            console.log(response.data);
        }
        else{
            response = await dataSource.put('/books', book); 
            props.onEditBook(navigate);
        }
        props.onEditBook(navigate);
    }

    const handleCancel = () =>{
        navigate('/');
    }

    return (
    <div>
        <form onSubmit={handleFormSubmit}>
            <h1>{newBookCreation ? "Create New:" : "Edit"}</h1>
            <div className="form-group">
                <label htmlFor="bookTitle">Book title</label>
                <input type="text" className="form-control" id="bookTitle" placeholder="Enter book Title" value={bookTitle} onChange={updateTitle}/>
                <label htmlFor="bookAuthor">Author</label>
                <input type="text" className="form-control" id="bookAuthor"  placeholder="Enter Book Author" value={bookAuthor} onChange={updateAuthor}/>
                <label htmlFor="bookIsbn">Description</label>
                <input type="text" className="form-control" id="bookIsbn"  placeholder="Enter Book ISBN" value={bookIsbn} onChange={updateISBN}/>
                <label htmlFor="bookGenre">Year</label>
                <input type="text" className="form-control" id="bookGenre"  placeholder="Enter Book Genre" value={bookGenre} onChange={updateGenre}/>
            </div>
            <div>
                <button type="button" className="btn btn-light" onClick={handleCancel}>Cancel</button>
                <button type="submit" className="btn btn-primary">Submit</button>
            </div>
        </form>
            
            
    </div>      
    )
}

export default NewBook;