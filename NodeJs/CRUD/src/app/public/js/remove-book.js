let tabelaLivros = document.querySelector('#books');
tabelaLivros.addEventListener('click', (event) => {
    let elementoClicado = event.target;
    console.log(elementoClicado);

    if (elementoClicado.dataset.type == 'remove') {
        let bookId = elementoClicado.dataset.ref;
        console.log(bookId);
        fetch(`http://localhost:3000/books/${bookId}`, { method: 'DELETE' })
            .then(response => {
                let tr = elementoClicado.closest(`#book_${bookId}`);
                tr.remove();
            })
            .catch(err => console.log(err));
    }
});