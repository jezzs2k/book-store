let books = [];
let page = 1;

async function readFile() {
  const res = await axios.get('https://r2egb.sse.codesandbox.io/books');
  books = [...res.data];
}
readFile();

function getBook(style) {
  const num = page * 8;
  return books.slice((page - 1) * 8, num);
}

const booksHtml = document.getElementById('books');
const pagination = document.getElementById('pagination');

pagination.addEventListener('click', (e) => {
  const num = e.target.getAttribute('data-pagination');
  const button = e.target.getAttribute('data-button');

  Array.from(e.path[1].children).forEach((item, i) => {
    item.classList.remove('active');
    if (button === 'previous' && i === 1) {
      item.classList.add('active');
    }
    if (button === 'next' && i === 4) {
      item.classList.add('active');
    }
  });

  // item.classList.add('active');

  if (button === 'previous') {
    if (page === 1) {
      page = 1;
    } else {
      page--;
      if (page >= 4) {
        Array.from(e.path[1].children).forEach((item, i) => {
          if (i !== 0 && i !== 5) {
            let currentPage = parseInt(item.getAttribute('data-pagination', 1));
            currentPage--;
            item.setAttribute('data-pagination', currentPage);
          }
        });
      }
    }
  } else if (button === 'next' && page * 8 <= books.length) {
    page++;
    if (page > 4) {
      Array.from(e.path[1].children).forEach((item, i) => {
        if (i !== 0 && i !== 5) {
          let currentPage = parseInt(item.getAttribute('data-pagination', 1));
          currentPage++;
          item.setAttribute('data-pagination', currentPage);
        }
      });
    }
  } else {
    e.target.classList.add('active');
    page = parseInt(num);
  }

  renderBooks(getBook(page));
});

function renderBooks(books) {
  let html = '';

  html = books.map((book) => {
    return `
        <div class="book col-sm-4">
                <div class="h-card">
                  <a href="/pages/bookDetail.html" class="h-card-content">
                    <img
                      src="./image/Dac-nhan-tam.jpg"
                      class="h-card-img"
                      alt="book card"
                    />
                    <div class="h-card-body">
                      <h3 class="h-card-title">
                        ${book.name}
                      </h3>
                      <p class="h-card-text">
                        ${book.author}
                      </p>
                      <p class="h-payment">180.000 đ</p>
                      <div class="book-star">
                        <img
                          src="./image/star.svg"
                          alt="star"
                          style="max-width: 20px;"
                          class="_1-start"
                        />
                        <img
                          src="./image/star.svg"
                          alt="star"
                          style="max-width: 20px;"
                          class="_1-start"
                        />
                        <img
                          src="./image/star.svg"
                          alt="star"
                          style="max-width: 20px;"
                          class="_1-start"
                        />
                        <img
                          src="./image/star.svg"
                          alt="star"
                          style="max-width: 20px;"
                          class="_1-start"
                        />
                      </div>
                    </div>
                  </a>
                </div>
              </div>
        `;
  });

  booksHtml.innerHTML = html.join('');
}

if (books.length === 0) {
  booksHtml.innerHTML = `<img src='https://media.giphy.com/media/xTk9ZvMnbIiIew7IpW/giphy.gif' style="height: 200px; margin: auto"/>`;
}

setTimeout(() => {
  renderBooks(getBook(1));
}, 3000);
