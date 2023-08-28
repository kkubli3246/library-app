import React from "react";
import dataSource from "./dataSource";

const Card = (props) =>{

    const handleButtonClick = (event, uri) =>{
        props.onClick(props.bookId, uri);
    }

    const deleteBook = async (bookId) =>{
        
        const response = await dataSource.delete('/books/'+ bookId);
        console.log(response);
      }
    

    const imgUrl = 'https://www.vhv.rs/dpng/d/521-5214539_transparent-clip-art-open-book-frame-transparent-open.png'
    
    
    return (
        <div className="card" style={{width: '18rem'}}>
        <img src={imgUrl} className="card-img-top" alt="..." />
        <div className="card-body">
            <h5 className="card-title">{props.title}</h5>
            <h3 className="card-text">
                {props.author}
            </h3>
            <button 
                onClick={() => handleButtonClick(props.bookId,'/edit/')}
                className="btn btn-primary"
            >
                Edit
            </button>

            <button 
                onClick={() => deleteBook(props.bookId)}
                className="btn btn-danger"
            >
                Delete
            </button>
            <p className="isbn">ISBN: {props.isbn}</p>
        </div>      
    </div>
    )
}

export default Card;