const express = require('express')
const app = express()

app.use(express.static('public'))
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true }))

app.use('/', require('./routes/router'))

app.get("/", function(req, res){
  res.sendFile(__dirname + '/views/index.html')
})

app.get("/toppings-manager", function(req, res){
  res.sendFile(__dirname + '/views/toppings.html')
})

app.get("/toppings-manager/add", function(req, res){
  res.sendFile(__dirname + '/views/toppingsAdd.html')
})

app.get("/toppings-manager/edit", function(req, res){
  res.sendFile(__dirname + '/views/toppingsEdit.html')
})

app.get("/toppings-manager/edit:id", function(req, res){
  res.sendFile(__dirname + '/views/toppingsEdit.html')
})

app.get("/pizza-manager", function(req, res){
  res.sendFile(__dirname + '/views/pizza.html')
})

app.get("/pizza-manager/add", function(req, res){
  res.sendFile(__dirname + '/views/pizzaAdd.html')
})

app.get("/pizza-manager/edit", function(req, res){
  res.sendFile(__dirname + '/views/pizzaEdit.html')
})

app.get("/pizza-manager/edit:id", function(req, res){
  res.sendFile(__dirname + '/views/pizzaEdit.html')
})

app.get("/pizza-search/", function(req, res) {
  res.status(200).send("test")
})

app.get("*", function(req, res){
  res.send("Error! Route does not exist")
})

module.exports = app