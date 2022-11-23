function getTotalBooksCount(books = []) {
  return books.length;
}

function getTotalAccountsCount(accounts = []) {
  return accounts.length;
}

function getBooksBorrowedCount(books = []) {
  const total = books.reduce((accumulator, bookObj) => {
    const { borrows } = bookObj;
    let bookBorrowed = borrows.some((borrowsObj) => {
      return borrowsObj.returned === false;
    });
    if (bookBorrowed === true) {
      accumulator++;
    }
    return accumulator;
  }, 0);
  return total;
}

function getMostCommonGenres(books = []) {
  let lookUp = {};
  books.forEach((bookObj) => {
    const { genre } = bookObj;
    if (lookUp.hasOwnProperty(genre)) {
      lookUp[genre] += 1;
    } else {
      lookUp[genre] = 1;
    }
  });

  const genresArray = Object.keys(lookUp);

  let result = [];
  genresArray.forEach((genre) => {
    let count = lookUp[genre];
    let currentObj = { name: genre, count };
    result.push(currentObj);
  });
  const sortedResult = result.sort((objA, objB) => {
    return objB.count > objA.count ? 1 : -1;
  });
  return result.slice(0, 5);
}

function getMostPopularBooks(books = []) {
  sortingBookObjsHelper(books);

  let result = books.map((bookObj) => {
    const { title, borrows } = bookObj;
    let obj = { name: title, count: borrows.length };
    return obj;
  });
  return result.slice(0, 5);
}

function getMostPopularAuthors(books = [], authors = []) {
  sortingBookObjsHelper(books);
  const topFiveBooks = books.slice(0, 5);

  let result = topFiveBooks.map((bookObj) => {
    const { authorId, borrows } = bookObj;
    let foundAuthor = authors.find((authorObj) => {
      return authorObj.id === authorId;
    });

    let name = `${foundAuthor.name.first} ${foundAuthor.name.last}`;
    let obj = { name, count: borrows.length };
    return obj;
  });
  return result;
}

function sortingBookObjsHelper(books = []) {
  books.sort((bookA, bookB) => {
    return bookB.borrows.length - bookA.borrows.length;
  })
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
