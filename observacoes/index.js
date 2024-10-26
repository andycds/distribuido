const express = require('express')
const app = express()
app.use(express.json())
const { v4: uuidv4 } = require('uuid');


const observacoesPorLembreteId = {}

app.post('/lembretes/:id/observacoes', (req, res) => {
    const idObs = uuidv4();
    const { texto } = req.body;
    //req.params dá acesso a lista de parâmetros da URL
    const observacoesDoLembrete = observacoesPorLembreteId[req.params.id] || [];
    observacoesDoLembrete.push({ id: idObs, texto });
    observacoesPorLembreteId[req.params.id] = observacoesDoLembrete;
    res.status(201).send(observacoesDoLembrete);
})

app.get('/lembretes/:id/observacoes', (req, res) => {
    res.send(observacoesPorLembreteId[req.params.id] || []);
})

app.listen(5000, () => {
    console.log("Observações. Porta 5000.")
})