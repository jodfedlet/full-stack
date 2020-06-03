import React, { Component } from 'react'
import FormValidator from './FormValidator'

export default class Form extends Component {

    constructor(props) {
        super(props)

        this.validator = new FormValidator({
            campo:'nome',
            metodo:'isEmpty'
        })

        this.inicialState = {
            nome: '',
            livro: '',
            preco: ''
        }

        this.state = this.inicialState
    }

    inputListener = event => {
        const { name, value } = event.target

        this.setState({
            [name]: value
        })
    }

    formSubmit = () => {
        if(this.validator.validate(this.state)){
            this.props.submitListener(this.state)
            this.setState(this.inicialState)
        }
    }

    render() {

        const { nome, livro, preco } = this.state

        return (
            <form>
                <div className="row">
                    <div className="input-field col s4">
                        <label className="input-field" htmlFor="nome">Nome</label>
                        <input
                            className="validate"
                            id="nome"
                            type="text"
                            name="nome"
                            value={nome}
                            onChange={this.inputListener}
                        />
                    </div>

                    <div className="input-field col s4">
                        <label className="input-field" htmlFor="livro">Livro</label>
                        <input
                            className="validate"
                            id="livro"
                            type="text"
                            name="livro"
                            value={livro}
                            onChange={this.inputListener}
                        />
                    </div>

                    <div className="input-field col s4">
                        <label className="input-field" htmlFor="preco">Preço</label>
                        <input
                            className="validate"
                            id="preco"
                            type="text"
                            name="preco"
                            value={preco}
                            onChange={this.inputListener}
                        />
                    </div>


                    <button className="waves-effect waves-light indigo lihten-2 btn" type="button" onClick={this.formSubmit} >
                        Salvar
                </button>
                </div>
            </form>

        )

    }
}
