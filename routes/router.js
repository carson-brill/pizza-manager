const express = require('express')
const router = express.Router()
const controller = require('../controllers/controller')

// API
router.post('/toppings', controller.createTopping)
router.get('/toppings', controller.getToppings)
router.patch('/toppings', controller.updateTopping)
router.post('/toppings/:id', controller.deleteTopping)

router.post('/pizzas', controller.createPizza)
router.post('/pizza-search', controller.findPizza)
router.get('/pizzas', controller.getPizzas)
router.patch('/pizzas', controller.updatePizza)
router.post('/pizzas/:id', controller.deletePizza)

module.exports = router