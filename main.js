const main_content=document.querySelector(".main-content");
const add_button=document.querySelector('.library-button');
const popup_form=document.querySelector('.popup-form');
const submit_button=document.querySelector('.submit');


const titleInput=document.querySelector('#titleInput')
const authorInput=document.querySelector('#author');
const pageInput=document.querySelector('#number');
const radio_yes=document.querySelector('#yes-button');
let myLibrary=[];



// Event Listener for the add button to add a book which will open the form to add a new book

add_button.addEventListener('click',e=>{
    openModal();
})

//Event Listener for closing the modal form by clicking outside the form
document.addEventListener('click',event=>{
    closeModal(event);
})

//Event Listener for the submit button

submit_button.addEventListener('click',event=>{
    event.preventDefault();
    //console.log(titleInput.value);
    //console.log(authorInput.value);
    //console.log(pageInput.value);
    //let p=document.getElementById('yes-button').checked;
    //console.log(p);
    //console.log(radio_yes.checked);
    addBookToLibrary();
    popup_form.style.display='none';
    titleInput.value="";
    authorInput.value="";
    pageInput.value="";
}
)


function addBookToLibrary(){
    let newBook= new Book(titleInput.value,authorInput.value,pageInput.value,radio_yes.checked);
    addToLibrary(newBook);
    displayLibrary();
}



/**
 * 
 * @param {Event} event 
 */
function closeModal(event){
    
    //let f=event.target;
    //console.log(f);
    if(event.target.matches('.popup-form')){
       popup_form.style.display='none' 
    }
    

}

/**
 * This function opens the modal form upon click of adding 
 */
function openModal(){
    popup_form.style.display='flex';
}
/**
 * This is the constructor for a Book 
 * @param {String} title 
 * @param {String} author 
 * @param {Number} pages
 * @param {Boolean} isRead 
 */
function Book(title,author,pages,isRead){
    this.title=title;
    this.author=author;
    this.pages=pages;
    this.isRead=isRead;
    this.isDisplayed=false;
}



/**
 * Takes a book inputed by the user and adds it to their library.
 * @param {Book} book 
 */
function addToLibrary(book){
    myLibrary.push(book);
}


//function displayLibrary(){
  //  myLibrary.forEach(book=>{
    //    let card=document.createElement('div');
      //  card.setAttribute("class","card")
        //main_content.append(card);
    //})
//}


function displayLibrary(){
    myLibrary.forEach(book=>{
        if(!book.isDisplayed){
            let card=document.createElement('div');
            let title=document.createElement('p');
            let author=document.createElement('p');
            let pages=document.createElement('p');
            let isReadButton=document.createElement('button')
            let removeButton=document.createElement('button');
            

            if(book.isRead){
                isReadButton.setAttribute('class','read')
                isReadButton.textContent='Read';
                readButtonEventAssign(isReadButton);
            }
            else{
                isReadButton.setAttribute('class','notRead');
                isReadButton.textContent='Not Read';
                notReadButtonEventAssign(isReadButton);
            }

            removeButton.setAttribute('class','remove');
            removeButton.textContent="Remove";
            removeButtonAssign(removeButton);



            pages.textContent=book.pages+' pages';
            author.textContent=book.author;
            title.textContent=book.title;
            card.setAttribute("class", "card");

            //Adding everything to the div elment 
            card.append(title);
            card.append(author);
            card.append(pages);
            card.append(isReadButton);
            card.append(removeButton);
            main_content.append(card);
            book.isDisplayed=true;
        }
    })
}


/**
 * This function assigns to the read button the appropriate event listener
 * @param {Element} button 
 */
function readButtonEventAssign(button){

    //console.log(button);

    button.addEventListener('click',event=>{
        readButtonEventTriggers(button);
    }
)
}

/**
 * This function is what occurs when the readButton event is triggered.
 * @param {Element} button 
 */
function readButtonEventTriggers(button){

    //console.log(button);
    button.setAttribute('class','notRead');
    button.removeEventListener('click',readButtonEventTriggers);
    button.textContent="Not Read";
    notReadButtonEventAssign(button);
}


/**
 * This function assigns to the notRead Button the appropriate 
 * @param {Element} button 
 */
function notReadButtonEventAssign(button){
    button.addEventListener('click', event=>{
        notReadButtonEventTriggers(button);
    })
}

/**
 * This functon is what triggers when the notReadEvent is triggered.
 * @param {Element} button 
 */
function notReadButtonEventTriggers(button){
    button.setAttribute('class', 'read');
    button.removeEventListener('click', notReadButtonEventTriggers);
    button.textContent='Read';
    readButtonEventAssign(button);
}

function removeButtonAssign(button){

    button.addEventListener('click',event=>{
        removeBook(button);
    })
}


function removeBook(button){
    let parent= button.parentElement;
    //console.log(parent);
    let title= parent.firstElementChild.textContent;

    for(let i=0;i<myLibrary.length;i++){
        if(myLibrary[i].title===title){
            myLibrary[i]=null;
        }
    }

    myLibrary=myLibrary.filter(isNotNull);
    //console.log(title);
    main_content.removeChild(parent);
}


function isNotNull(input){
    if(input!==null){
        return true;
    }
    return false;
}