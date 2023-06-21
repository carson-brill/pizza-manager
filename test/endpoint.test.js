const { describe } = require("node:test")
var mongoose = require('mongoose')
const request = require('supertest')
const app = require('../app')
const Topping = require("../models/topping")
const Pizza = require("../models/pizza")
const port = 4000
const databaseName = 'jest-testing'
const uri = 'mongodb+srv://cbrill:pizzapassword@carsoncluster.bp97dce.mongodb.net/' + databaseName

const server = app.listen(port, () => {
  console.log(`Test pizza manager app listening on port ${port}`)
})

beforeAll( async () => {
  await mongoose.connect(uri);
})

afterAll( async () => {
  await mongoose.disconnect()
  server.close()
})

describe('POST /toppings', () => {

  test('Should reject empty request', async () => {
    const res = await request(app).post('/toppings')
    expect(res.status).toEqual(400)
    expect(res.body).toEqual({
      message: "Content cannot be empty"
    })
  })

  test('Should save new topping to database', async () => {
    const res = await request(app).post('/toppings').send({
      name: 'pepperoni'
    })

    const topping = await Topping.findOne({name: 'pepperoni'})
    expect(topping.name).toEqual('pepperoni')
  })
})

describe('GET /toppings', () => {

  test('Should get toppings', async () => {
    const res = await request(app).get('/toppings')
    expect(res.status).toEqual(200)
    expect(res.body[0].name).toBeTruthy()
  })
})

describe('PATCH /toppings', () => {

  test('Should reject empty request', async () => {
    const res = await request(app).patch('/toppings')
    expect(res.status).toEqual(400)
    expect(res.body).toEqual({
      message: "Content cannot be empty"
    })
  })

  test('Should update topping in database', async () => {
    const topping = await Topping.findOne({name: 'pepperoni'})
    
    const res = await request(app).patch('/toppings').send({
      currentTopping: topping.id,
      newTopping: 'onions'
    })

    const updatedTopping = await Topping.findOne({name: 'onions'})

    expect(updatedTopping.name).toEqual('onions')
  })
})

describe('DELETE /toppings', () => {

  test('Should reject invalid id length (< 24)', async () => {
    const res = await request(app).post('/toppings/12345678901234567890123')
    expect(res.status).toEqual(400)
    expect(res.body).toEqual({
      message: "Invalid id param"
    })
  })

  test('Should delete topping from database', async () => {
    const topping = await Topping.findOne({name: 'onions'})

    const res = await request(app).post('/toppings/' + topping._id).send({})

    const find = await Topping.findOne({name: 'onions'})
    expect(find).toBeFalsy()
  })
})

describe('POST /pizzas', () => {

  test('Should reject empty request', async () => {
    const res = await request(app).post('/pizzas')
    expect(res.status).toEqual(400)
    expect(res.body).toEqual({
      message: "Content cannot be empty"
    })
  })

  test('Should save new pizza to database', async () => {
    const res = await request(app).post('/pizzas').send({
      name: 'The Test Special',
      toppings: ['peppers', 'onions']
    })

    const pizza = await Pizza.findOne({name: 'The Test Special'})
    expect(pizza.name).toEqual('The Test Special')
    expect(pizza.toppings).toEqual(['peppers', 'onions'])
  })
})

describe('GET /pizzas', () => {

  test('Should get pizzas', async () => {
    const res = await request(app).get('/pizzas')
    expect(res.status).toEqual(200)
    expect(res.body[0].name).toBeTruthy()
  })
})

describe('POST /pizza-search', () => {

  test('Should retrieve single pizza by providing ID as param', async () => {
    const pizza = await Pizza.findOne({name: 'The Test Special'})

    const res = await request(app).post('/pizza-search').send({
      pizzaId: pizza._id
    })
    expect(res.status).toEqual(200)
    expect(res.body.name).toEqual('The Test Special')
    expect(res.body.toppings).toEqual(['peppers', 'onions'])
  })
})

describe('PATCH /pizzas', () => {

  test('Should reject empty request', async () => {
    const res = await request(app).patch('/pizzas')
    expect(res.status).toEqual(400)
    expect(res.body).toEqual({
      message: "Content cannot be empty"
    })
  })

  test('Should update pizza in database', async () => {
    const pizza = await Pizza.findOne({name: 'The Test Special'})
    
    const res = await request(app).patch('/pizzas').send({
      currentPizzaId: pizza._id, 
      newPizzaName: 'The New Test Special',
      newPizzaToppings: ['peppers', 'onions', 'pepperoni']
    })

    const updatedPizza = await Pizza.findOne({name: 'The New Test Special'})

    expect(updatedPizza.name).toEqual('The New Test Special')
    expect(updatedPizza.toppings).toEqual(['peppers', 'onions', 'pepperoni'])
  })
})

describe('DELETE /pizzas', () => {

  test('Should reject invalid id length (< 24)', async () => {
    const res = await request(app).post('/pizzas/12345678901234567890123')
    expect(res.status).toEqual(400)
    expect(res.body).toEqual({
      message: "Invalid id param"
    })
  })

  test('Should delete pizza from database', async () => {
    const pizza = await Pizza.findOne({name: 'The New Test Special'})

    const res = await request(app).post('/pizzas/' + pizza._id).send({})

    const find = await Pizza.findOne({name: 'The New Test Special'})
    expect(find).toBeFalsy()
  })
})