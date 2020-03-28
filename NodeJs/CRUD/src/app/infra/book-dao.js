class BookDao{
    constructor(db){
        this._db = db;
    }
    list(){
        return new Promise((resolve, reject)=>{
            this._db.all(
                'SELECT * FROM livros',
                (err, res) => {
                    if(err) reject('Não foi possível listar os livros');
                    return resolve(res)
                }
            )
        })
    }

    add(book){
        return new Promise((resolve, reject)=>{
            this._db.run(`
                INSERT INTO livros(
                    titulo,
                    preco,
                    descricao
                )VALUES(?,?,?)
                `,[
                    book.titulo,
                    book.preco,
                    book.descricao
                ],
                (err)=>{
                    if(err){
                        console.log(err)
                        return reject('Não foi possível inserir o livro');
                    } 
                    resolve();
                }
            )
        });
    }
    getById(id) {
        return new Promise((resolve, reject) => {
            this._db.get(
                `
                    SELECT *
                    FROM livros
                    WHERE id = ?
                `,
                [id],
                (err, book) => {
                    if (err) {
                        return reject('Não foi possível encontrar o livro!');
                    }
                    return resolve(book);
                }
            );
        });
    }

    update(book) {
        return new Promise((resolve, reject) => {
            this._db.run(`
                UPDATE livros SET
                titulo = ?,
                preco = ?,
                descricao = ?
                WHERE id = ?
            `,
            [
                book.titulo,
                book.preco,
                book.descricao,
                book.id
            ],
            err => {
                if (err) {
                    return reject('Não foi possível atualizar o livro!');
                }
                resolve();
            });
        });
    }
}

module.exports = BookDao;