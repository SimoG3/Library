// 1. Book Constructor
function Book(name, author, pages, year, language) {
    this.name = name;
    this.author = author;
    this.pages = pages;
    this.year = year;
    this.language = language;
    this.id = crypto.randomUUID();
}

// 2. Add Book Function (Updated for Modern UI)
function addBook() {
    const form = document.getElementById("bookForm");

    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }

    // Get values
    const title = document.getElementById("title").value.trim();
    const author = document.getElementById("author").value.trim();
    const pages = document.getElementById("pages").value.trim();
    const year = document.getElementById("year").value.trim();
    const language = document.getElementById("language").value.trim();

    const newBook = new Book(title, author, pages, year, language);

    // Create the HTML structure for the new book
    const library = document.getElementById("library");
    const bookDiv = document.createElement("div");
    bookDiv.classList.add("book", "not-read");
    
    // Add expand functionality
    bookDiv.onclick = function() { toggleExpand(this); };

    // --- Badge ---
    const badge = document.createElement("div");
    badge.classList.add("book-badge");
    badge.textContent = "New";
    bookDiv.appendChild(badge);

    // --- Image ---
    const coverImg = document.createElement("img");
    // Using a placeholder image for new books
    coverImg.src = "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&q=80&w=300&h=400"; 
    coverImg.alt = "book-cover";
    coverImg.classList.add("book-cover");
    bookDiv.appendChild(coverImg);

    // --- Info Container ---
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

    // Details Section (Hidden by default)
    const bookDetails = document.createElement("div");
    bookDetails.classList.add("book-details");

    // Helper to create rows
    const createRow = (label, value) => {
        const row = document.createElement("div");
        row.classList.add("detail-row");
        row.innerHTML = `<span>${label}</span> <span>${value}</span>`;
        return row;
    };

    bookDetails.appendChild(createRow("Language", newBook.language));
    bookDetails.appendChild(createRow("Pages", newBook.pages));
    bookDetails.appendChild(createRow("Year", newBook.year));
    
    infoDiv.appendChild(bookDetails);

    // --- Toggle Button ---
    const toggleButton = document.createElement("button");
    toggleButton.classList.add("toggle-btn");
    toggleButton.innerHTML = '<i class="fa-regular fa-circle"></i> <span class="status">Not Read</span>';
    
    toggleButton.onclick = (e) => {
        e.stopPropagation(); // Crucial: prevents expansion
        handleToggleRead(toggleButton, bookDiv, badge);
    };

    infoDiv.appendChild(toggleButton);
    bookDiv.appendChild(infoDiv);
    
    // Add to library grid
    library.appendChild(bookDiv);

    // Reset and Close
    form.reset();
    closeModal();
}

// 3. Helper Functions
function toggleExpand(card, event) {
    // FIX: If the user clicked the toggle-btn or an icon inside it, do NOT expand
    if (event.target.closest('.toggle-btn')) return;
    
    card.classList.toggle("expanded");
}

function closeModal() {
    const modal = document.getElementById("modal");
    if(modal) modal.classList.add("hidden");
}

function handleToggleRead(button, bookDiv, badge) {
    const isRead = bookDiv.classList.toggle("read");
    bookDiv.classList.toggle("not-read");
    
    // Update Button Icon and Text
    button.innerHTML = isRead 
        ? '<i class="fa-solid fa-check-circle"></i> <span class="status">Read</span>' 
        : '<i class="fa-regular fa-circle"></i> <span class="status">Not Read</span>';
        
    // Update Top Right Badge
    if (badge) {
        badge.textContent = isRead ? "Read" : "Not Read";
        // Manual color override since your CSS uses classes
        badge.className = isRead ? "book-badge read-badge" : "book-badge not-read-badge";
    }
}

// 4. Global Event Listeners (Run when page loads)
document.addEventListener('DOMContentLoaded', () => {
    
    // FIX: Setup existing books (Vinland Saga, Ippo, etc.)
    const existingBooks = document.querySelectorAll('.book');
    existingBooks.forEach(book => {
        // Fix the click to expand
        book.onclick = (e) => toggleExpand(book, e);

        // Fix the existing toggle button
        const btn = book.querySelector('.toggle-btn');
        const badge = book.querySelector('.book-badge');
        
        if (btn) {
            btn.onclick = (e) => {
                e.stopPropagation(); // Stops the card from expanding
                handleToggleRead(btn, book, badge);
            };
        }
    });

    // --- Modal Logic ---
    const addBtn = document.getElementById("add-book");
    const modal = document.getElementById("modal");

    if (addBtn && modal) {
        addBtn.addEventListener("click", () => {
            modal.classList.remove("hidden");
        });
    }

    // --- Welcome Overlay Logic ---
    const overlay = document.getElementById('welcome-overlay');
    const message = document.getElementById('welcome-message');
    if(overlay) {
        setTimeout(() => { message?.classList.remove('hidden'); }, 100);
        setTimeout(() => {
            overlay.style.opacity = '0';
            setTimeout(() => { overlay.style.display = 'none'; }, 1000);
        }, 2500);
    }
});
