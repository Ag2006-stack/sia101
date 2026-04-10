const express = require('express')
const cors = require('cors')
const path = require('path')

const app = express()
const port = 3000

app.use(cors())
app.use(express.json())

app.use(express.static(path.join(__dirname, 'public')))

const students = [
    {
        id: 1,
        name: "Adolf Hitler",
        yearLevel: 1,
    },
    {
        id: 2,
        name: " Joseph Stalin",
        yearLevel: 2,
    },
    {
        id: 3,
        name: "Emperor Hirohito",
        yearLevel: 3,
    },
]

app.get('/api/students', (req, res) =>{
    res.json(students)
})

app.post('/api/students', (req, res) =>{
    const {name,yearLevel} = req.body
    const newStudent = {name, yearLevel}
    students.push(newStudent)

    res.json(201).json({
        message: "Student added successfuly",
        students:newStudent
    })
})

app.listen(port, () => {
    console.log(`Server running on http://localhost:no${port}`)
})