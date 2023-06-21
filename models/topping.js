var mongoose = require('mongoose')

// Define topping schema
const toppingSchema = new mongoose.Schema({
    name: {type: String, required: true, unique: true}
    })
    
const Topping = mongoose.model('Topping', toppingSchema)

module.exports = Topping