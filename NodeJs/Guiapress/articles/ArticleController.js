const express = require('express')
const router = express.Router()

router.get('/articles', (req, res) => {
    res.send('Rota de artigo')
})

router.get('/admin/articles/new', (req, res) => {
    res.send('Rota para criar novo artigo')
})

module.exports = router