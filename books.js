
let addBookFormButton = document.getElementById("addBookFormButton");
let cancelButton = document.getElementById("cancelButton");
let addThisBookButton = document.getElementById("addThisBookButton");
let cardDisplay = document.getElementById("cardDisplay");
const newline = "\n";
const removeButton = document.getElementById("removeButton");
// creates an array for the library
let myLibrary = [];



// hides the new book form on initial page load
document.getElementById("form").style.display = 'none';

// creates an object contructor to create different books in a Library
function Book(title, author, pages, read)
{
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

// creating a couple of default book objects with the Book object constructor
const book1 = new Book("The Fellowship of The Ring", "J.R.R. Tolkien", "356", "Yes");
const book2 = new Book("A Song of Ice and Fire", "George R.R. Martin", "256", "No");


// if statement that checks if the local storage contains a "library" string and, if so, populates
// uses it to fill the library array. If not, it populates the array with the 2 default books
if (localStorage.getItem('library'))
{
    myLibrary = JSON.parse(window.localStorage.getItem('library'));
}

else
{
    // creates an array for the library and populates it with the default book objects
    myLibrary = [book1, book2];
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

// function for the cancel button pressed
function cancelButtonClicked()
{
    document.getElementById("title").value = "";
    document.getElementById("author").value = "";
    document.getElementById("pages").value = "";
    document.getElementById("read").value = "";
    document.getElementById("form").style.display = 'none';
    document.getElementById("addBookFormButton").style.display = 'inline'
    
}

// creates a function that takes an argument, the button's data attribute, and uses it to delete the matching array index
function deleteBook(bookToDelete)
{
    let index = bookToDelete;
    if (index > -1) {
    myLibrary.splice(index, 1);}
    //copies the myLibrary array to the library string in local storage
    localStorage.setItem('library', JSON.stringify(myLibrary))
}

// creates a function to remove a particular book when the remove button is pressed
function removeButtonClicked()
{
    //calls the delete book function and adds the button id attribute that matches the array item to delete
    deleteBook(this.getAttribute("data-buttonid"))
    //removes the cardDisplay's elements and displays the updated library
    document.getElementById("cardDisplay").textContent = "";
    document.getElementById("display").textContent = addNewCard(myLibrary);
    console.log(myLibrary);
}


function radioButtonYesClicked()
{
    let index = this.getAttribute("data-radioid");
    myLibrary[index].read = "Yes";
    localStorage.setItem('library', JSON.stringify(myLibrary))
}

function radioButtonNoClicked()
{
    let index = this.getAttribute("data-radioid");
    myLibrary[index].read = "No";
    localStorage.setItem('library', JSON.stringify(myLibrary))
}

// creating event listeners for buttons
addBookFormButton.addEventListener("click", addBookFormButtonClicked);
addThisBookButton.addEventListener("click", addThisBookButtonClicked);
cancelButton.addEventListener("click", cancelButtonClicked);



//function creating new div elements ("card") with the myLibrary array and appending it to display in html
function addNewCard(array)
{
    array.forEach(element =>
    {
        // creating a new div in the dom and assigning the card class to it. Then filling out its text with the 
        // information from the current element in the array.
        let newCard = document.createElement("div");
        newCard.class = "card";
        newCard.dataset.id = array.indexOf(element);

        //creating the title
        let title = document.createElement("h3");
        title.textContent = element.title;
        newCard.appendChild(title);

        // Creating the Author 
        let author = document.createElement("p");
        author.textContent = "By: " + element.author;
        newCard.appendChild(author);

        // Creating the Page count 
        let pages = document.createElement("p");
        pages.textContent = "Number of pages: " + element.pages;
        newCard.appendChild(pages);

        // Creating read yet
        let read = document.createElement("p");
        read.textContent = "Has been read: " + element.read;
        newCard.appendChild(read);        

        // adds the new card to the cardDisplay div
        cardDisplay.appendChild(newCard).className = 'card';

        let cardMenu = document.createElement("div");
        cardMenu.classList.add("cardMenu");
        cardMenu.dataset.menuid = cardMenu;
        newCard.appendChild(cardMenu)

        // creating a set of radio buttons to check if this book has been read or not
        let bookReadRadioYes = document.createElement("INPUT");
        bookReadRadioYes.setAttribute("type", "radio");
        bookReadRadioYes.classList.add("bookReadRadio");
        bookReadRadioYes.dataset.radioid = array.indexOf(element);
        bookReadRadioYes.setAttribute('id', "radioYes");
        bookReadRadioYes.setAttribute('value', "Yes");
        let radioGroup = array.indexOf(element);
        bookReadRadioYes.setAttribute('name', radioGroup);
        cardMenu.appendChild(bookReadRadioYes);
        //creates a label for the yes radio button
        let labelForYes = document.createElement('label');
        labelForYes.setAttribute('for', 'radioYes');
        labelForYes.innerHTML = "Yes";
        cardMenu.appendChild(labelForYes);

        //creates the no radio button
        let bookReadRadioNo = document.createElement("INPUT");
        bookReadRadioNo.setAttribute("type", "radio");
        bookReadRadioNo.classList.add("bookReadRadio");
        bookReadRadioNo.dataset.radioid = array.indexOf(element);
        bookReadRadioNo.setAttribute('id', "radioNo");
        bookReadRadioNo.setAttribute('value', "No");
        bookReadRadioNo.setAttribute('name', radioGroup);
        cardMenu.appendChild(bookReadRadioNo);

        let labelForNo = document.createElement('label');
        labelForNo.setAttribute('for', 'radioNo');
        labelForNo.innerHTML = "No";
        cardMenu.appendChild(labelForNo);

        // creates the delete button for the card and fills in its text
        let removeButton = document.createElement("button");
        removeButton.classList.add("removeButton");
        removeButton.textContent = "Delete Book";
        removeButton.dataset.buttonid = array.indexOf(element);
        cardMenu.appendChild(removeButton);

        // creates and event listener for the newly created remove buttons
        removeButton.addEventListener("click", removeButtonClicked);

        bookReadRadioYes.addEventListener("click", radioButtonYesClicked)
        bookReadRadioNo.addEventListener("click", radioButtonNoClicked)
        // adds the myLibrary array into local storage as the string "library"
        localStorage.setItem('library', JSON.stringify(myLibrary));

        // sets the initial state for the read radio buttons from the entered form
        if (element.read == "No")
        {
            bookReadRadioNo.checked = true;
        }
        if (element.read == "Yes")
        {
            bookReadRadioYes.checked = true;
        }



        // console.log(localStorage.getItem('library'))
        

     })
    
};



// adds the info function to the Book contructor's prototype. This function returns each value in the current book object. 
// The function being added to the prototype avoids each object (book) creating the functions
// everytime a new object (book in this example) is created. This will increase performance if there are thousands
// of objects being created and they are simply inheriting and not recreating this function each time.
Book.prototype.info = function()
{
     return this.title + " by " + this.author +  ". " + this.pages + " pages. " + this.read;
}


// creates a function that takes the attributes for a book, adds
// them to a new 'book' object, then adds that object to the array
function addBookToLibrary(title, author, pages, read) 
{
    let newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
} 

// runs through the library array and displays the library
function displayLibrary()
{
    let libraryDisplay = "";

    for(let i = 0; i < myLibrary.length; i++)
    {
        libraryDisplay = libraryDisplay += myLibrary[i].info() + "<br>"
    }

    return libraryDisplay;
}

// checks to see if local storage is available
function storageAvailable(type) {
    var storage;
    try {
        storage = window[type];
        var x = '__storage_test__';
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    }
    catch(e) {
        return e instanceof DOMException && (
            // everything except Firefox
            e.code === 22 ||
            // Firefox
            e.code === 1014 ||
            // test name field too, because code might not be present
            // everything except Firefox
            e.name === 'QuotaExceededError' ||
            // Firefox
            e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
            // acknowledge QuotaExceededError only if there's something already stored
            (storage && storage.length !== 0);
    }
}

if (storageAvailable('localStorage')) {
    console.log("Local storage is available");
  }
  else {
    console.log("Local storage is not available");
  }


// does the intial display for the library
document.getElementById("display").textContent = addNewCard(myLibrary);
//localStorage.removeItem('library') 

