const { nanoid } = require('nanoid');
const books = require('./books')

const addBookHandler = (request, h) => {
    const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;

    const id = nanoid(16);
    const finished = readPage === pageCount;
    const createdAt = newDate().toISOString();
    const updatedAt = createdAt;

    if (name === undefined) {
        const response = h.response({
            status: "fail",
            message: "Gagal menambahkan buku. Mohon isi nama buku."
        });
        response.code(400);
        return response;   
    } if (readPage > pageCount) {
        const response = h.response({
            status: "fail",
            message: "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount"
        });
        response.code(400);
        return response;
    } if (readPage > pageCount) {
        const response = h.response({
            status: "fail",
            message: "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount"
        });
        response.code(400);
        return response;
    }

    const newBook = {
        name, year, author, summary, publisher, pageCount, readPage, reading, id, finished, insertedAt, updatedAt
    };

    books.push(newBook);

    const isSuccess = books.filter((book) => book.id === id).length > 0;

    if (isSuccess) {
        const response = h.response({
            status: 'success',
            message: 'Buku berhasil ditambahkan',
            data: {
                bookId: id,
            },
        });
        response.code(201);
        return response;
    }
    const response = h.response({
        status: 'fail',
        message: 'Buku gagal ditambahkan',
    });
    response.code(500);
    return response;  
};

const getAllBooksHandler = () => ({
    status: 'success',
    data: {
        books,
    },
});


module.exports = { addBookHandler, getAllBooksHandler };