const library=[];

function Book(name) {
    this.name = name;
    this.id = crypto.randomUUID();
}


//add books to library
function addBook() {
    //hardcoded book
    const newBook = new Book("The Great Gatsby");

    const toggleButton = document.createElement("button");
    toggleButton.classList.add("toggle-btn");

    const span = document.createElement("span");
    span.classList.add("status");
    span.textContent = "📖 Not Read";

    const titleDiv = document.createElement("div");
    titleDiv.classList.add("title");
    titleDiv.textContent = newBook.name;

    const coverImg = document.createElement("img");
    coverImg.src = "";
    coverImg.alt = "book-cover";
    coverImg.classList.add("book-cover");
  
    const library = document.getElementById("library");
  
    const bookDiv = document.createElement("div");
    bookDiv.classList.add("book");
    bookDiv.classList.add("not-read"); 

    toggleButton.appendChild(span);
    toggleButton.addEventListener("click", () => {
      const isRead = bookDiv.classList.toggle("read");
      bookDiv.classList.toggle("not-read");
      span.textContent = isRead ? "✅ Read" : "📖 Not Read";
  });  

   
    bookDiv.appendChild(coverImg);
    bookDiv.appendChild(titleDiv);
    bookDiv.appendChild(toggleButton);
    
    library.appendChild(bookDiv);
}


 //read toggle button
 const toggleButtons = document.querySelectorAll('.toggle-btn');

 toggleButtons.forEach(button => {
   button.addEventListener('click', () => {
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

 //favorite toggle button
 //code...


 //form pop up page
document.getElementById("add-book").addEventListener("click", function () {
  document.getElementById("modal").classList.remove("hidden");
});

 function closeModal() {
  document.getElementById("modal").classList.add("hidden");
}

