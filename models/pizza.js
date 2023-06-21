var mongoose = require('mongoose')

// Define pizza schema
const pizzaSchema = new mongoose.Schema({
    name: {type: String, required: true},
    toppings: {type: [String], required: true}
  })

pizzaSchema.index({
  name: 1,
  toppings: 1,
}, {
  unique: true
})
  
// Define pizza model
const Pizza = mongoose.model('Pizza', pizzaSchema)

module.exports = Pizza