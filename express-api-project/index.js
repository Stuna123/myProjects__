const express = require('express')
const app = express()
const employees = require('./Employee.js')
const moment = require("moment")

app.use(express.json())

// path to access our data employee and to retreive all employee
app.get('/api/employees', (req, res) => {
    res.json(employees)
})

// retrieve single employee
app.get('/api/employees/:name', (req, res) => {
    const checkExist = employees.some(employees => employees.name === req.params.name)
    if (checkExist) {
        res.json(employees.filter(employees =>
            employees.name === req.params.name))
    }
    else {
        // 400 status bad request
        res.status(400).json({ msg: `Employee ${req.params.name} doesn't exist!` })
    }
})

// create employee
app.post('/api/employees', (req, res) => {

    // TOUJOURS METTRE DES LOGS QUAND TU AS UN SOUCIS DANS TON CODE
    console.log(req.body)

    if (!req.body.name || !req.body.email) {
        res.status(400).json({ msg: 'Please include both a name and an email !' })
        return
    }

    const newEmployee = {
        name: req.body.name,
        email: req.body.email,
        age: Math.round(Math.random() * (100 - 18) + 18),
        added: `${moment().format()}` //moment we added
    }


    employees.push(newEmployee)
    res.json(employees)

})

// on crée le port à partir de la variable d'environnement
const PORT = process.env.PORT || 4000 // in dev
app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
