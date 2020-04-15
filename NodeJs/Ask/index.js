const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const connection = require('./database/database')
const Question = require('./database/Question')
const Answer = require('./database/Answer')

connection
    .authenticate()
    .then(()=> {
        console.log('You ve been connected')
    })
    .catch((errMsg) =>{
        console.log(errMsg)
    })
app.set('view engine', 'ejs')
app.use(express.static('public'))

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.get('/',(req, res) => {
  Question.findAll({raw: true, order:[
      ['id','DESC']
  ]}).then( questions => {
      res.render('index',{
        questions:questions 
      })
  })
})

app.get('/question',(req, res) => {
    res.render('question')
})

app.post('/savequestion',(req, res) => {
    let title = req.body.title
    let description = req.body.description
    Question.create({
        title:title,
        description:description
    }).then(()=>{
        res.redirect('/')
    })
})

app.get('/question/:id', (req, res) => {
    let id = req.params.id
    Question.findOne({
        where:{id: id}
    }).then( question => {
        if(question != undefined){
            Answer.findAll({
                where:{questionId:question.id},
                order:[['id','DESC']]
            }).then(answers => {
                res.render('showQuestion',{
                    question:question,
                    answers:answers
                })
            })
        }else{
            res.redirect('/')
        }
    })
})

app.post('/answer', (req, res) => {
    let message = req.body.message
    let questionId = req.body.question

    Answer.create({
        body:message,
        questionId:questionId
    }).then(()=>{
        res.redirect('/question/'+questionId)
    })

})

app.listen(8080, () => { console.log('App rodando') })