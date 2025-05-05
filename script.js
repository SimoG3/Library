
function Book(name, author, pages, year, language) {
    this.name = name;
    this.author = author;
    this.pages = pages;
    this.year = year;
    this.language = language;
    this.id = crypto.randomUUID();
}


//add books to library
function addBook() {
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const pages = document.getElementById("pages").value;
    const year = document.getElementById("year").value;
    const language = document.getElementById("language").value;

    const newBook = new Book(title, author, pages, year, language); //creating constructed book

    const icon = document.createElement("i");
    icon.classList.add("fa-solid", "fa-file"); //creating icon for pagesDetail

    //hardcoded book
    //const newBook = new Book("The Great Gatsby");

    const toggleButton = document.createElement("button"); //toggle button
    toggleButton.classList.add("toggle-btn");

    const span = document.createElement("span"); //span inside button
    span.classList.add("status");
    span.textContent = "📖 Not Read";

    const titleDiv = document.createElement("div"); //book title
    titleDiv.classList.add("title");
    titleDiv.textContent = newBook.name;

    const coverImg = document.createElement("img"); //book cover
    coverImg.src = "/home/simog/Downloads/35b9674b3a90fffb83a33d1075d28662.jpg";
    coverImg.alt = "book-cover";
    coverImg.classList.add("book-cover");

    const bookDetails = document.createElement("div"); //book details
    bookDetails.classList.add("book-details");

    //filling paragraphs with details respectively 
    const authorDetail = document.createElement("p"); 
    authorDetail.textContent = "✍️ Author:" + newBook.author;

    const languageDetail = document.createElement("p");
    languageDetail.textContent = "🌐 Language:" + newBook.language;

    const pagesDetail = document.createElement("p");
    pagesDetail.textContent = " Pages:" + newBook.pages;
    pagesDetail.prepend(icon);

    const yearDetail = document.createElement("p");
    pagesDetail.textContent = "📅 Year: " + newBook.year;

    //appending to book details div
    bookDetails.appendChild(authorDetail);
    bookDetails.appendChild(languageDetail);
    bookDetails.appendChild(pagesDetail);
    bookDetails.appendChild(yearDetail);
  
    const library = document.getElementById("library"); //library
  
    const bookDiv = document.createElement("div"); //book
    bookDiv.classList.add("book");
    bookDiv.classList.add("not-read"); 
    bookDiv.onclick = function() { //add expand function to view details div
      toggleExpand(this);
    };
    

    toggleButton.appendChild(span); //read button function
    toggleButton.addEventListener("click", (e) => {
      e.stopPropagation();
      const isRead = bookDiv.classList.toggle("read");
      bookDiv.classList.toggle("not-read");
      span.textContent = isRead ? "✅ Read" : "📖 Not Read";
  });  

   //appending correctly
    bookDiv.appendChild(coverImg);
    bookDiv.appendChild(titleDiv);

    bookDiv.appendChild(bookDetails);

    bookDiv.appendChild(toggleButton);
    
    library.appendChild(bookDiv);
}


 //read toggle button
 const toggleButtons = document.querySelectorAll('.toggle-btn');

 toggleButtons.forEach(button => {
   button.addEventListener('click', (e) => {
     e.stopPropagation();
     const book = button.parentElement;
     const status = book.querySelector('.status');

     if (book.classList.contains('read')) {
       book.classList.remove('read');
       book.classList.add('not-read');
       status.textContent = 'Not Read';
     } else {
       book.classList.remove('not-read');
       book.classList.add('read');
       status.textContent = 'Read';
     }
   });
 });

 //expand details
 function toggleExpand(card) {
  card.classList.toggle("expanded");
}


 //favorite toggle button
 //code...


 //form pop up page
document.getElementById("add-book").addEventListener("click", function () {
  document.getElementById("modal").classList.remove("hidden");
});

 function closeModal() {
  document.getElementById("modal").classList.add("hidden");
}


//link form to the made book

