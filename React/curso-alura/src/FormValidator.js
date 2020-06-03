import validator from 'validator'

export default class FormValidator{

    constructor(validation){
        this.validation = validation
    }
    validate(state){
        const fieldValue = state[this.validation.campo.toString()]
        const validationMethod = validator[this.validation.metodo]

        if(validationMethod(fieldValue, [], state)){
            console.log('INVALID FORM')
            return false
        }else{
            return true
        }
    }
}