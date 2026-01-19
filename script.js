
function Book(name, author, pages, year, language) {
    this.name = name;
    this.author = author;
    this.pages = pages;
    this.year = year;
    this.language = language;
    this.id = crypto.randomUUID();
}


//add books to library
// Keep your Book Constructor exactly the same...
function Book(name, author, pages, year, language) {
    this.name = name;
    this.author = author;
    this.pages = pages;
    this.year = year;
    this.language = language;
    this.id = crypto.randomUUID();
}

function addBook() {
    const form = document.getElementById("bookForm");

    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }

    const title = document.getElementById("title").value.trim();
    const author = document.getElementById("author").value.trim();
    const pages = document.getElementById("pages").value.trim();
    const year = document.getElementById("year").value.trim();
    const language = document.getElementById("language").value.trim();

    const newBook = new Book(title, author, pages, year, language);

    // --- NEW DOM CREATION LOGIC TO MATCH MODERN CSS ---

    const library = document.getElementById("library");
    const bookDiv = document.createElement("div");
    bookDiv.classList.add("book", "not-read");
    bookDiv.onclick = function() { toggleExpand(this); };

    // 1. Badge
    const badge = document.createElement("div");
    badge.classList.add("book-badge");
    badge.textContent = "New";
    bookDiv.appendChild(badge);

    // 2. Cover Image
    const coverImg = document.createElement("img");
    coverImg.src = "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&q=80&w=300&h=400"; // Generic nice book image
    coverImg.alt = "book-cover";
    coverImg.classList.add("book-cover");
    bookDiv.appendChild(coverImg);

    // 3. Info Wrapper
    const infoDiv = document.createElement("div");
    infoDiv.classList.add("book-info");

    // Title & Author
    const titleDiv = document.createElement("div");
    titleDiv.classList.add("title");
    titleDiv.textContent = newBook.name;
    infoDiv.appendChild(titleDiv);

    const authorDiv = document.createElement("div");
    authorDiv.classList.add("author");
    authorDiv.textContent = newBook.author;
    infoDiv.appendChild(authorDiv);

    // Details Section (Using flex rows for alignment)
    const bookDetails = document.createElement("div");
    bookDetails.classList.add("book-details");

    const detailsData = [
        { label: "Language", value: newBook.language },
        { label: "Pages", value: newBook.pages },
        { label: "Year", value: newBook.year }
    ];

    detailsData.forEach(item => {
        const row = document.createElement("div");
        row.classList.add("detail-row");
        
        const labelSpan = document.createElement("span");
        labelSpan.textContent = item.label;
        
        const valueSpan = document.createElement("span");
        valueSpan.textContent = item.value;

        row.appendChild(labelSpan);
        row.appendChild(valueSpan);
        bookDetails.appendChild(row);
    });

    infoDiv.appendChild(bookDetails);

    // Toggle Button
    const toggleButton = document.createElement("button");
    toggleButton.classList.add("toggle-btn");
    
    // Add event listener immediately
    toggleButton.addEventListener("click", (e) => {
        e.stopPropagation();
        const isRead = bookDiv.classList.toggle("read");
        bookDiv.classList.toggle("not-read");
        
        // Update Icon and Text
        toggleButton.innerHTML = isRead 
            ? '<i class="fa-solid fa-check-circle"></i> <span class="status">Read</span>' 
            : '<i class="fa-regular fa-circle"></i> <span class="status">Not Read</span>';
            
        // Update Badge color via CSS class
        badge.style.backgroundColor = isRead ? "var(--success)" : "var(--text-muted)";
        badge.textContent = isRead ? "Read" : "Not Read";
    });

    // Initial Button State
    toggleButton.innerHTML = '<i class="fa-regular fa-circle"></i> <span class="status">Not Read</span>';
    infoDiv.appendChild(toggleButton);

    bookDiv.appendChild(infoDiv);
    library.appendChild(bookDiv);

    form.reset();
    closeModal(); // Auto close modal on success
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


//welcome pop up 

window.addEventListener('load', () => {
  const message = document.getElementById('welcome-message');
  const overlay = document.getElementById('welcome-overlay');

  // Force a reflow to ensure animation triggers
  void message.offsetWidth; // triggers reflow

  // Animate in
  message.classList.remove('hidden');
  message.classList.add('visible');

  // Fade out overlay after 3 seconds
  setTimeout(() => {
    overlay.style.opacity = '0';
    setTimeout(() => {
      overlay.style.display = 'none';
    }, 1000); // matches CSS fade duration
  }, 3000);
});






