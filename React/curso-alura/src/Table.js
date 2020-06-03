import React, { Component } from 'react'

const TableHead = () => {
    return (
        <thead>
            <tr>
                <th>Autores</th>
                <th>Livros</th>
                <th>Preços</th>
                <th>Action</th>
            </tr>
        </thead>
    )
}

const TableTbody = props => {
    const linhas = props.autores.map((linha, index) => {
        return (
            <tr key={index}>
                <td>{linha.nome}</td>
                <td>{linha.livro}</td>
                <td>{linha.preco}</td>
                <td>
                    <button onClick={() => { props.removeAutor(index) }} className="waves-effect waves-light indigo lihten-2 btn">Remove</button>
                </td>
            </tr>
        )
    })

    return(
        <tbody>
            {linhas}
        </tbody>
    )
}
export default class Table extends Component {
    render() {

        const { autores, removeAutor } = this.props;

        return (
            <table className="centered highlight">
                <TableHead />
                <TableTbody autores={autores} removeAutor={removeAutor}/>
            </table>
        )
    }
}