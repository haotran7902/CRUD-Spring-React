import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import BookService from '../services/BookService'

const ListBookComponent = () => {

    const [books, setBooks] = useState([])

    useEffect(() => {
        getAllBooks();
    }, [])

    const getAllBooks = () => {
        BookService.getAllBooks().then((response) => {
            setBooks(response.data)
            console.log(response.data);
        }).catch(error => {
            console.log(error);
        })
    }

    const deleteBook = (bookcode) => {
        BookService.deleteBook(bookcode).then((response) => {
            getAllBooks();
        }).catch(error => {
            console.log(error);
        })

    }

    return (
        <div className="container">
            <h2 className="text-center"> List Books </h2>
            <Link to="/add-book" className="btn btn-primary mb-2" > Add Book </Link>
            <table className="table table-bordered table-striped">
                <thead>
                    <th> Book Id </th>
                    <th> Title </th>
                    <th> Author </th>
                    <th> Category </th>
                    <th> Approved </th>
                    <th> Actions </th>
                </thead>
                <tbody>
                    {
                        books.map(
                            book =>
                                <tr key={book.bookcode}>
                                    <td> {book.bookcode} </td>
                                    <td> {book.title} </td>
                                    <td> {book.author} </td>
                                    <td>{book.category}</td>
                                    <td>
                                        <input type='checkbox' defaultChecked={book.approved}/>
                                    </td>
                                    <td>
                                        <Link className="btn btn-info" to={`/edit-book/${book.bookcode}`} >Edit</Link>
                                        <button
                                            className="btn btn-danger"
                                            onClick={() => {
                                                if (window.confirm("Are you sure delete this book?")) {
                                                    deleteBook(book.bookcode);
                                                }
                                            }}
                                            style={{ marginLeft: "10px" }}
                                        >
                                            Delete
                                        </button>

                                    </td>
                                </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    )
}

export default ListBookComponent;
