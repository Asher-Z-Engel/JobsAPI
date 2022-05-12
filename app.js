require('dotenv').config()
require('express-async-errors')
const express = require('express')
const app = express()
// connectDB
const connectDB = require('./db/connect')

app.use(express.json())
// routes
app.get('/', (req, res) => {
  res.send('Jobs API')
})

const port = process.env.PORT || 5000
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
      .then(() => console.log('Connected to the DB'))
    app.listen(port, () => console.log(`App is listening on port ${port}...`))
  } catch (error) {
    console.log(error)
  }
}
start()