const express = require('express')
const mysql = require('mysql2')
require('dotenv').config()
const app = express()
app.use(express.json())

const { DB_USER, DB_PASSWORD, DB_HOST, DB_DATABASE, DB_PORT } = process.env
const pool = mysql.createPool({
    host: DB_HOST,
    user: DB_USER,
    database: DB_DATABASE,
    password: DB_PASSWORD,
    port: DB_PORT,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
})


app.get('/medicos', (req, res) => {
    pool.query("select * from tb_medico", (err, results, fields) => {
        res.json(results)
    })
})

app.post('/medicos', (req, res) => {
    const crm = req.body.crm
    const nome = req.body.nome
    const sql = "insert into tb_medico (crm, nome) values (?, ?)"
    pool.query(sql, [crm, nome], (err, results, fields) => {
        res.status(201).send('criado')
    })
})

app.get('/pacientes', (req, res) => {
    pool.query("select * from tb_paciente", (err, results, fields) => {
        res.json(results)
    })
})

const porta = 3000
app.listen(porta, () => console.log(`Executando. Porta ${porta}`))