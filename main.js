const main_content=document.querySelector(".main-content");
let myLibrary=[];


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
}



/**
 * Takes a book inputed by the user and adds it to their library.
 * @param {Book} book 
 */
function addToLibrary(book){
    myLibrary.push(book);
}


function displayLibrary(){
    myLibrary.forEach(book=>{
        let card=document.createElement('div');
        card.setAttribute("class","card")
        main_content.append(card);
    })
}

//let book221= new Book('a', 'b', 2, false)
//addToLibrary(book221);
//displayLibrary();

//for(let i=0;i<4;i++){
  //  let book2=new Book('a','b',2,false);
    //addToLibrary(book2);
    //displayLibrary();
//}