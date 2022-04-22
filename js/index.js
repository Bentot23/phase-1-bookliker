// const baseUrl = "http://localhost:3000/books"
// const showPanel = document.querySelector('#show-panel')

// let user = {"id":1, "username":"pouros"}

// document.addEventListener("DOMContentLoaded", (e) => {
//     e.preventDefault()
//     fetchBooks().then(renderAllBooks)
//     // renderLikes()
// })

// function fetchBooks() {
//     return fetch(baseUrl)
//     .then(resp => resp.json())
//     // .then(bookArr => {
//     //     console.log(bookArr)
//     //     bookArr.forEach(renderBook)
//     // })
// }



// function renderAllBooks (bookArr) {
//     bookArr.forEach(renderBook)
// }

// function renderBook(bookObj) {

//     //display book titles
//     const bookContainer = document.querySelector('#list')
//     const bookList = document.createElement('li')
//     bookList.textContent = bookObj.title
//     bookContainer.append(bookList)

//     //add event listener to the book titles
//     //display the book's thumbnail, description, and the list of users who liked the book
//     //append to div#show-panel
//     bookList.addEventListener('click', () => {
//          showPanel.innerHTML = ''
//         const bookId = document.createElement('p')
//         bookId.textContent = bookObj.id
//         const bookTitle = document.createElement('h3')
//         bookTitle.textContent = bookObj.title
//         const bookSub = document.createElement('h3')
//         bookSub.textContent = bookObj.subtitle
//         const bookDescription = document.createElement('p')
//         bookDescription.textContent = bookObj.description
//         const bookAuthor = document.createElement('h3')
//         bookAuthor.textContent = bookObj.author
//         const bookImg = document.createElement('img')
//         bookImg.src = bookObj.img_url
//         bookImg.alt = bookObj.title
//         const bookUsers = document.createElement('ul')
//             bookObj.users.forEach(user => {
//                 const li = document.createElement('li')
//                 li.textContent = user.username
//                 bookUsers.append(li)
//             })
//         const likeBtn = document.createElement('button')
//         likeBtn.textContent = 'LIKE'
//         likeBtn.addEventListener('click', likeBook)
        
//         showPanel.append(bookId, bookTitle, bookSub, bookDescription, bookAuthor, bookImg, bookUsers, likeBtn)
//     })
// }


// function likeBook(event) {
//     fetchBooks(event)
//     .then(bookObj => {
//       const bookId = bookObj.id
//       let newUsersDataArray
      
//       if (!bookObj.users.find(el => el.id === user.id)) {
//         newUsersDataArray = [...bookObj.users, user]
//       } else {
//         newUsersDataArray = [...bookObj.users]
//         let index = newUsersDataArray.findIndex(el => el.id === user.id)
//         newUsersDataArray.splice(index, 1)
//       }
      
//       fetch(`http://localhost:3000/books/${bookId}`, {
//         method: 'PATCH',
//         headers: {
//           'Content-Type': 'application/json',
//           'Accept': 'application/json'
//         },
//         body: JSON.stringify({
//           "users": newUsersDataArray
//         })
//       })
//       .then(response => response.json())
//       .then(renderBook)
//     })
  
//   }
  

// ANCHOR DOM Elements
const listPanelDiv = document.querySelector('#list-panel')
const bookTitleList = document.querySelector('#list')
const showPanelDiv = document.querySelector('#show-panel')

let user = {"id":1, "username":"pouros"}

// Event Listeners
function clickListeners() {
  document.addEventListener('click', event => {
    if (event.target.matches('#list li')) {
      getBookInformation(event)
      .then(renderBookShowPanel)
    } else if (event.target.matches('#show-panel button')) {
      likeBook(event)
    }
  })
}

// Event Handlers
function getBookInformation(event) {
  const bookId = event.target.dataset.id
  return fetch(`http://localhost:3000/books/${bookId}`)
  .then(res => res.json())
}

function likeBook(event) {
  getBookInformation(event)
  .then(bookObj => {
    const bookId = bookObj.id
    let newUsersDataArray
    
    if (!bookObj.users.find(el => el.id === user.id)) {
      newUsersDataArray = [...bookObj.users, user]
    } else {
      newUsersDataArray = [...bookObj.users]
      let index = newUsersDataArray.findIndex(el => el.id === user.id)
      newUsersDataArray.splice(index, 1)
    }
    
    fetch(`http://localhost:3000/books/${bookId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        "users": newUsersDataArray
      })
    })
    .then(response => response.json())
    .then(renderBookShowPanel)
  })

}

// Render Functions
function renderBookShowPanel(bookObj) {
  console.log("Rendered Book: ", bookObj)

  showPanelDiv.innerHTML = ''

  const bookImg = document.createElement('img')
  bookImg.src = bookObj.img_url
  bookImg.alt = bookObj.title

  const bookTitle = document.createElement('h3')
  bookTitle.textContent = bookObj.title

  const bookSub = document.createElement('h3')
  bookSub.textContent = bookObj.subtitle

  const bookAuthor = document.createElement('h3')
  bookAuthor.textContent = bookObj.authorH3

  const bookDesc = document.createElement('p')
  bookDesc.textContent = bookObj.description

  const ul = document.createElement('ul')

  bookObj.users.forEach(user => {
    const li = document.createElement('li')
    li.textContent = user.username
    ul.append(li)
  })

  const likeButton = document.createElement('button')
  likeButton.dataset.id = bookObj.id
  likeButton.textContent = 'LIKE'

  showPanelDiv.append(bookImg, bookTitle, bookSub, bookAuthor, bookDesc, ul, likeButton)
  
}

// Get lists of books from ('http://localhost:3000/books')
function renderAllBookTitles(booksObj) {
  booksObj.forEach(renderSingleBookTitle)
}

// Create a lists for each book and add to ul#list element
function renderSingleBookTitle(bookObj) {
  const li = document.createElement('li')
  li.dataset.id = bookObj.id
  li.textContent = bookObj.title
  bookTitleList.append(li)
}

// Initial Render
function initialize() {
  fetch(`http://localhost:3000/books`)
  .then(response => response.json())
  .then(renderAllBookTitles)
}

// Function Calls
initialize()
clickListeners()