const BookDao = require('../infra/book-dao');
const db = require('../../config/db');

module.exports = (app)=>{
    app.get('/', function(req, resp){
        resp.send(
            `
                <html>
                    <head>
                    <title>Page Title</title>
                    </head>
                    <body>
                        <h1>This is a Heading</h1>
                        <p>This is a paragraph.</p>
                    </body>
                </html>
             `
        );
    });
    
    app.get('/books', function(req, resp){
        const bookDao = new BookDao(db);
        bookDao.read()
               .then(result =>resp.marko(
                    require('../views/books/show/list.marko'),
                    {
                        books:result
                    }
                ))
                .catch(err => console.log(err));
    });

    app.get('/book/form', function(req, res){
        res.marko(require('../views/books/form/form.marko'))
    });

    app.post('/book', function(req, res){
        console.log(req.body)
        const bookDao = new BookDao(db);
        bookDao.create(req.body)
               .then(res.redirect('/books'))
               .catch(err => console.log(err));
    });

    app.delete('/books/:id', function(req, res){
        const id = req.params.id;
        const bookDao = new BookDao(db);
        
        bookDao.delete(id)
                .then(()=>res.status(200).end())
                .catch(err => console.log(err))
    });
}
