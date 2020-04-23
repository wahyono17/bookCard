//function construct
function Book (title,author,isbn){
    this.title = title;
    this.author = author;
    this.isbn = isbn;
}
//ui class
class UI {
    static displayBook(){
        const StoreBooks = [
            
        ];
        //const books = StoreBooks;
        StoreBooks.forEach((book)=>UI.addBookToList(book));    
    }

    static addBookToList(book) {
        const list = document.querySelector('#book-list');
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
        `;
        list.appendChild(row);
    }

    static deleteBook(el){
        if(el.classList.contains('delete')){
            el.parentElement.parentElement.remove()
        }
    }
    
    static showAllert(message,className){
        const div = document.createElement('div');
            div.className = `alert alert-${className}`;
            div.appendChild(document.createTextNode(message));
        const container = document.querySelector('.container');
        const form = document.querySelector('#book-form');
        container.insertBefore(div,form);
        //go in 3 second
        setTimeout(()=>document.querySelector('.alert').remove(),3000);
    }

    static clearFields(){
        document.querySelector('#title').value = '';
        document.querySelector('#author').value = '';
        document.querySelector('#isbn').value = '';
    }
}
//store class : handle store

//event: display book
document.addEventListener('DOMContentLoaded',UI.displayBook);
//event: add book
document.querySelector('#book-form').addEventListener('submit',(e)=>{
    //prefent devault value
    e.preventDefault();
    //ambil form value
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const isbn = document.querySelector('#isbn').value;
    //validate 
    if(title === '' || author === '' || isbn === ''){
        UI.showAllert('please fill all filed','danger');
    }else {
        //instansiasi book
        const book = new Book(title,author,isbn);
        //add book to UI
        UI.addBookToList(book);
        //clear field
        UI.clearFields();
    }
});
//event: remove book
document.querySelector('#book-list').addEventListener('click',(e)=>{
    UI.deleteBook(e.target);
});
