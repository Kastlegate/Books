
let addBookButton = document.getElementById("addBook");
let cancelButton = document.getElementById("cancel");

//hides the new book form on initial load
document.getElementById("form").style.display = 'none';

// an object contructor to create different books in a Library
function Book(title, author, pages, read)
{
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;

    // adding the info() function here will cause every object to recreate this function when the objects are made
    // moving it outside the constructor, and adding it to the objects prototype like done below, means the code only has to be ran once
    // and all objects created by the contructor automatically inherit the function, making the code run faster

    // this.info = function()
    // {
    //     return this.title + " by " + this.author +  ". " + this.pages + " pages. " + this.read
    // }
}

// function to bring up the form when the add new book button is pressed
function addBookButtonClicked()
{
    console.log("Add Book Button Pressed")
    
    //shows the form
    document.getElementById("form").style.display = 'inline'

    //hides the add new book button
    document.getElementById("addBook").style.display = 'none'
}

//creating event listeners for buttons
addBookButton.addEventListener("click", addBookButtonClicked); 

//creating a couple of default book pbjects with the Book object constructor
const book1 = new Book("The Lord of The Rings", "J.R.R. Tolkien", "356", "Has been read.");
const book2 = new Book("A song of Ice and Fire", "George R.R. Martin", "256", "Has not been read.");

//creates an array for the library and populates it with the default book objects
let myLibrary = [book1, book2];

//adds the info function to the Book contructor's prototype. This function returns each value in the current book object
Book.prototype.info = function()
{
     return this.title + " by " + this.author +  ". " + this.pages + " pages. " + this.read;
}

// function addBookToLibrary() 
// {
//     let newBook = new Book(title, author, pages, read);
//     myLibrary.push(newBook);
// } 

function displayLibrary()
{
    let libraryDisplay = "";

    for(let i = 0; i < myLibrary.length; i++)
    {
        libraryDisplay = libraryDisplay += myLibrary[i].info() + "<br>"
    }

    return libraryDisplay;
}

document.getElementById("display").innerHTML = displayLibrary();
// addBookToLibrary()
console.log(book1.info());
console.log(book2.info());