const express = require('express')
const axios = require('axios')
const app = express()
app.use(express.json())

const palavraChave = "importante"

const funcoes = {
    ObservacaoCriada: (observacao) => {
        observacao.status = observacao.texto.includes(palavraChave) ? "importante" : "comum"
        axios.post('http://localhost:10000', {
            tipo: 'ObservacaoClassificada',
            dados: observacao
        })
    }
}

app.post('/eventos', (req, res) => {
    funcoes[req.body.tipo](req.body.dados)
    res.send({ msg: 'ok' })
})

app.listen(7000, () => console.log("Classificação. Porta 7000."))