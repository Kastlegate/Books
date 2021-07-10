
let addBookFormButton = document.getElementById("addBookFormButton");
let cancelButton = document.getElementById("cancelButton");
let addThisBookButton = document.getElementById("addThisBookButton");
let cardDisplay = document.getElementById("cardDisplay");
var newline = "\n";


// hides the new book form on initial page load
document.getElementById("form").style.display = 'none';

// an object contructor to create different books in a Library
function Book(title, author, pages, read, index)
{
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.index = index;
}

// function to bring up the form when the add new book button is pressed
function addBookFormButtonClicked()
{    
    // shows the form and buttons
    document.getElementById("form").style.display = 'inline';  
    document.getElementById("addBookFormButton").style.display = 'none'
}

// function for the form button addThisBookButton, that takes the information inside the form and creates
// a new book with it
function addThisBookButtonClicked()
{
    if (document.getElementById("title").value == "" || document.getElementById("author").value == "" || 
    document.getElementById("pages").value == "" || document.getElementById("read").value == "")
    {
        alert("Please fill out all fields in the form");
    }

    else 
    {
        //inputs the values from the form into the function to add a new book
        addBookToLibrary(document.getElementById("title").value, document.getElementById("author").value, 
        document.getElementById("pages").value, document.getElementById("read").value);

        //updates the html with the new book added
        document.getElementById("cardDisplay").textContent = "";
        document.getElementById("display").textContent = addNewCard(myLibrary);
        console.log(myLibrary)

        //resets the state of the form, its entries, and the add book button back to their default states after adding a book
        document.getElementById("title").value = "";
        document.getElementById("author").value = "";
        document.getElementById("pages").value = "";
        document.getElementById("read").value = "";
        document.getElementById("form").style.display = 'none';
        document.getElementById("addBookFormButton").style.display = 'inline'
        
    }
}

function cancelButtonClicked()
{
    document.getElementById("title").value = "";
    document.getElementById("author").value = "";
    document.getElementById("pages").value = "";
    document.getElementById("read").value = "";
    document.getElementById("form").style.display = 'none';
    document.getElementById("addBookFormButton").style.display = 'inline'
    
}

// creating event listeners for buttons
addBookFormButton.addEventListener("click", addBookFormButtonClicked);
addThisBookButton.addEventListener("click", addThisBookButtonClicked);
cancelButton.addEventListener("click", cancelButtonClicked);



// creating a couple of default book objects with the Book object constructor
const book1 = new Book("The Fellowship of The Ring", "J.R.R. Tolkien", "356", "Has been read.");
const book2 = new Book("A song of Ice and Fire", "George R.R. Martin", "256", "Has not been read.");

// creates an array for the library and populates it with the default book objects
let myLibrary = [book1, book2];

//function creating a new div element ("card") with the myLibrary array and appending it to display in html

function addNewCard(array)
{
    array.forEach(element =>
    {
        let newCard = document.createElement("div");
        newCard.class = "card";
        newCard.textContent = "Title: " + element.title + newline + "Author: " + element.author + newline + "Page count: " + element.pages + newline + element.read;
        cardDisplay.appendChild(newCard).className = 'card';
        let removeButton = document.createElement("button");
        removeButton.textContent = "Remove";
        removeButton.dataset.id = element.id;
        newCard.appendChild(removeButton);

    })
    
};

// + <br></br> + "element.author" + <br></br> + <button class="removeButton" data-id="myLibrary(element)" >Remove</button>;

// adds the info function to the Book contructor's prototype. This function returns each value in the current book object. 
// The function being added to the prototype avoids each object (book) creating the functions
// everytime a new object (book in this example) is created. This will increase performance if there are thousands
// of objects being created and they are simply inheriting and not recreating this function each time.
Book.prototype.info = function()
{
     return this.title + " by " + this.author +  ". " + this.pages + " pages. " + this.read;
}

function addBookToLibrary(title, author, pages, read, index) 
{
    let newBook = new Book(title, author, pages, read, index);
    myLibrary.push(newBook);
} 

function displayLibrary()
{
    let libraryDisplay = "";

    for(let i = 0; i < myLibrary.length; i++)
    {
        libraryDisplay = libraryDisplay += myLibrary[i].info() + "<br>"
    }

    return libraryDisplay;
}

document.getElementById("display").textContent = addNewCard(myLibrary);
// addBookToLibrary()
