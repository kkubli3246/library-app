import React from "react";
import { useNavigate} from 'react-router-dom';
import Card from "./Card";

const BookList = (props) => {

    const navigator = useNavigate();

    console.log(props);

    const handleSelectionOne = (bookId, uri) => {
        console.log(`Select ID is : `, bookId);
        props.onClick(bookId, navigator, uri);
    }

    const books = props.bookList.map((book) =>{
        return(
            <Card
                key = {book.id}
                bookId = {book.id}
                title = {book.title}
                author = {book.author}
                isbn = {book.isbn}
                genre = {book.genre}
                onClick ={handleSelectionOne}
            />
        )
    }
    )    

    return (
        <div className="container">
            {books}
        </div>
    )
}

export default BookList;