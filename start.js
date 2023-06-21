const app = require('./app.js')
const port = 3000

const mongoose = require('mongoose')
const uri = 'mongodb+srv://cbrill:pizzapassword@carsoncluster.bp97dce.mongodb.net/?retryWrites=true&w=majority'


/**
 * Connect to MongoDB
 */
 async function connect() {
  try {
    await mongoose.connect(uri)
    console.log('Connected to MongoDB for pizza related activity')
  } catch (error) {
    console.error(error)
  }
}

connect() // connect to mongo

/**
 * Listen for connections
 */
 const server = app.listen(port, () => {
  console.log(`Pizza Manager app listening on port ${port}`)
})

module.exports = server