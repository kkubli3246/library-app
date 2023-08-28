import React from "react";
import dataSource from "./dataSource";

const DeleteBook = (props) =>{
    
    let book = props.book;


    const sendDelete = async(book) => {
        let response = await dataSource.delete('/books', book.id);
        console.log((response).data);
    }


    sendDelete(book);
};

export default DeleteBook;