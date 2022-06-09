class Book {

    constructor(title,author,isbn){

        this.title=title
        this.author = author
        this.isbn = isbn
    }

}

class UI {

    addBookToList (bookObject) {
        const bookTable = document.querySelector('#book-table')
    
        //make row
        const row = document.createElement('tr')
        //inert cols
    
        row.innerHTML = `
        <td>${bookObject.title}</td>
        <td>${bookObject.author}</td>
        <td>${bookObject.isbn}</td>
        <td > <a class='delete' href='#'> X </a> </td>
        `
        bookTable.appendChild(row)
    }
    
    clearFields(){
        document.querySelector('#title').value = ''
        document.querySelector('#author').value = ''
        document.querySelector('#isbn').value = ''
    }

    showAlert (message,className) {
        const div = document.createElement('div')
        
        div.classList.add('alert')
    
        const alert = document.createElement('p')
        alert.classList.add(className)
        alert.innerText=message
    
        div.appendChild(alert)
        const form = document.querySelector('#book-form')
        const container = document.querySelector('.container')
    
        container.insertBefore(div,form)
    
        //Timeout
    
        setTimeout( function removeAlert() {
            document.querySelector('.alert').remove()
        },3000)
    }
    
    //Book Deletion
    deleteBook(target) {
        if (target.classList.contains('delete')) {
            target.parentElement.parentElement.remove()
    }}
}

//Event Listeners
document.querySelector('#book-form').addEventListener('submit', (e) => {
    e.preventDefault()
    //form values
    const title =document.querySelector('#title').value,
          author =document.querySelector('#author').value,
          isbn =document.querySelector('#isbn').value

    const submittedBook = new Book(title,author,isbn)


    const ui = new UI();

    //validate submissions
    if (title== '' || author =='' || isbn==''){
        ui.showAlert('Fill in all fields!','error')
    } else {
    //Add book to list
    ui.addBookToList(submittedBook);
    //Clear UI
    ui.clearFields();

    ui.showAlert(`${submittedBook.title} has been checked out!`,'success')
    }



})

document.querySelector('#book-table').addEventListener('click', (e)=> {
    
    const ui = new UI()
    ui.deleteBook(e.target)
    ui.showAlert('Book removed','success')
    e.preventDefault()
})