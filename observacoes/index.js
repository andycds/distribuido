const express = require('express')
const app = express()
app.use(express.json())

app.post('/lembretes/:id/observacoes', (req, res) => {

})

app.get('/lembretes/:id/observacoes', (req, res) => {

})

app.listen(5000, () => {
    console.log("Observações. Porta 5000.")
})