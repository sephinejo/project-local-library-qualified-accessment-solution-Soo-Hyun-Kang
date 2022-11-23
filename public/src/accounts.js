function findAccountById(accounts = [], id) {
  return accounts.find((accountObj) => accountObj.id === id);
}

function sortAccountsByLastName(accounts = []) {
  return accounts.sort((accountA, accountB) =>
    accountA.name.last < accountB.name.last ? -1 : 1
  );
}

function getTotalNumberOfBorrows(account = {}, books = []) {
  let total = 0;
  books.forEach((bookObj) => {
    const { borrows } = bookObj;

    borrows.forEach((borrowsObj) => {
      if (borrowsObj.id === account.id) {
        total++;
      }
    });
  });
  return total;
}

function getBooksPossessedByAccount(account = {}, books = [], authors = []) {
  let booksAccountBorrows = books.filter((bookObj) => {
    const { borrows } = bookObj;
    let foundBook = borrows.find((borrowsObj) => {
      return borrowsObj.id === account.id && borrowsObj.returned === false;
    });

    if (foundBook !== undefined) {
      return true;
    } else {
      return false;
    }
  });

  let result = booksAccountBorrows.map((bookObj) => {
    const { authorId } = bookObj;
    let foundAuthor = authors.find((authorObj) => {
      return authorObj.id === authorId;
    });
    bookObj.author = foundAuthor;
    return bookObj;
  });
  return result;
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
