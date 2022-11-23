function findAuthorById(authors = [], id) {
  return authors.find((authorObj) => authorObj.id === id);
}

function findBookById(books = [], id) {
  return books.find((bookObj) => bookObj.id === id);
}

function partitionBooksByBorrowedStatus(books = []) {
  let borrowedBooks = books.filter((bookObj) => {
    const { borrows } = bookObj;
    let currentBook = borrows.some((account) => account.returned === false);
    return currentBook;
  });

  let returnedBooks = books.filter((bookObj) => {
    const { borrows } = bookObj;
    let currentBook = borrows.every((account) => account.returned === true);
    return currentBook;
  });

  return [borrowedBooks, returnedBooks];
}

function getBorrowersForBook(book = {}, accounts = []) {
  const { borrows } = book;
  let result = borrows.map((borrowsObj) => {
    let foundAccounts = accounts.find((accountObj) => {
      return borrowsObj.id === accountObj.id;
    });
    foundAccounts.returned = borrowsObj.returned;
    return foundAccounts;
  });
  return result.slice(0, 10);
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
