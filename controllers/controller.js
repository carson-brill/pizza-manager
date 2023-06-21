var mongoose = require('mongoose')
var toppingModel = require('../models/topping')
var pizzaModel = require('../models/pizza')

// Toppings

/**
 * POST /toppings
 * Create topping
 */
exports.createTopping = async (req,res) => {
    if (!Object.keys(req.body).length) {
        res.status(400).send({message: "Content cannot be empty"})
        return;
    }

    const topping = new toppingModel(req.body)
    try {
        const newTopping = await topping.save()
            res.redirect('/toppings-manager')
    } catch (err) {
        res.status(400).send({
            message: err.message || "An error occurred while adding topping"
        })
    }
}

/**
 * GET /toppings
 * Get all toppings
 */
exports.getToppings = async (req, res) => {
    const toppings = await toppingModel.find()
    try {
        res.json(toppings)
    } catch (err) {
        res.status(500).json({ message: err.message || "An error occurred while getting topping"})
    }
}

/**
 * PATCH /toppings
 * Update topping
 */
exports.updateTopping = async (req,res) => {
    if (!Object.keys(req.body).length) {
        res.status(400).send({message: "Content cannot be empty"})
        return;
    }

    toppingId = new mongoose.Types.ObjectId(req.body.currentTopping)
    const currentTopping = {_id: toppingId}
    const newTopping = {name: req.body.newTopping}
    try {
        const updatedTopping = await toppingModel.updateOne(currentTopping, newTopping)
            res.status(200).send({message: "Topping updated"})
    } catch (err) {
        res.status(400).send({
            message: err.message || "An error occurred while updating topping"
        })
    }
}

/**
 * DELETE /toppings
 * Delete topping
 */
 exports.deleteTopping = async (req,res) => {
    if (req.params.id.length < 24) {
        res.status(400).send({message: "Invalid id param"})
        return;
    }

    const toppingId = req.params.id
    try {
        await toppingModel.deleteOne({ _id: toppingId });
        res.redirect("/toppings-manager")
    } catch (err) {
        console.log(err.message)
    }
}

// Pizzas

/**
 * POST /pizzas
 * Create pizza
 */
exports.createPizza = async (req,res) => {
    if (!Object.keys(req.body).length) {
        res.status(400).send({message: "Content cannot be empty"})
        return;
    }

    const pizza = new pizzaModel(req.body)
    try {
        const newTopping = await pizza.save()
            res.redirect('/pizza-manager')
    } catch (err) {
        res.status(400).send({
            message: err.message || "An error occurred while adding pizza"
        })
    }
}

/**
 * GET /pizzas
 * Get all pizzas
 */
exports.getPizzas = async (req, res) => {
    const pizzas = await pizzaModel.find()
    try {
        res.json(pizzas)
    } catch (err) {
        res.status(500).json({ message: err.message || "An error occurred while getting pizzas"})
    }
}

/**
 * GET /pizza-search
 * Find one pizza
 */
 exports.findPizza = async (req, res) => {
    if (req.body.pizzaId.length < 24) {
        res.status(400).send({message: "Must supply valid pizzaId in request"})
        return;
    }

    pizzaId = new mongoose.Types.ObjectId(req.body.pizzaId)
    const pizza = await pizzaModel.findById(pizzaId)
    try {
        res.json(pizza)
    } catch (err) {
        res.status(500).json({ message: err.message || "An error occurred while finding pizza"})
    }
}

/**
 * PATCH /pizzas
 * Update pizza
 */
exports.updatePizza = async (req,res) => {
    if (!Object.keys(req.body).length) {
        res.status(400).send({message: "Content cannot be empty"})
        return;
    }

    pizzaId = new mongoose.Types.ObjectId(req.body.currentPizzaId)
    const currentPizza = {_id: pizzaId}
    const newPizza = {name: req.body.newPizzaName, toppings: req.body.newPizzaToppings}

    try {
        const updatedPizza = await pizzaModel.updateOne(currentPizza, newPizza)
        res.status(200).send({message: "Pizza updated:", updatedPizza})
    } catch (err) {
        res.status(400).send({
            message: err.message || "An error occurred while updating pizza"
        })
    }
}

/**
 * DELETE /pizzas
 * Delete pizza
 */
 exports.deletePizza = async (req,res) => {
    if (req.params.id.length < 24) {
        res.status(400).send({message: "Invalid id param"})
        return;
    }

    const pizzaId = req.params.id
    try {
        await pizzaModel.deleteOne({ _id: pizzaId });
        res.redirect("/pizza-manager")
    } catch (err) {
        console.log(err.message)
    }
}