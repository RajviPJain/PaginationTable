const express = require('express')
const app = express()
const port = 3000
require('../models/database_connection')

const cors = require('cors')
app.use(cors());
app.use(express.json())

const employeeRouter=require('../routes/employeeRouter')

app.use(employeeRouter)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})