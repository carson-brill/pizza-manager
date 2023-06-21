const app = require('./app')
const request = require('supertest');
const port = 1000
// const databaseName = 'jest-testing'
// const uri = 'mongodb+srv://cbrill:pizzapassword@carsoncluster.bp97dce.mongodb.net/' + databaseName

const server = app.listen(port, () => {
  console.log(`Test pizza manager app listening on port ${port}`)
})

beforeAll( async () => {
  // await mongoose.connect(uri);
})

afterAll( async () => {
  // await mongoose.disconnect()
  server.close()
})


describe('GET /', () => {
  it('responds with the index.html file', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
    expect(res.text).toContain('index.html');
  });
});

describe('GET /toppings-manager', () => {
  it('responds with the toppings.html file', async () => {
    const res = await request(app).get('/toppings-manager');
    expect(res.statusCode).toBe(200);
    expect(res.text).toContain('toppings.html');
  });
});

describe('GET /toppings-manager/add', () => {
  it('responds with the toppingsAdd.html file', async () => {
    const res = await request(app).get('/toppings-manager/add');
    expect(res.statusCode).toBe(200);
    expect(res.text).toContain('toppingsAdd.html');
  });
});

describe('GET /toppings-manager/edit', () => {
  it('responds with the toppingsEdit.html file', async () => {
    const res = await request(app).get('/toppings-manager/edit');
    expect(res.statusCode).toBe(200);
    expect(res.text).toContain('toppingsEdit.html');
  });
});

describe('GET /pizza-manager', () => {
  it('responds with the pizza.html file', async () => {
    const res = await request(app).get('/pizza-manager');
    expect(res.statusCode).toBe(200);
    expect(res.text).toContain('pizza.html');
  });
});

describe('GET /pizza-manager/add', () => {
  it('responds with the pizzaAdd.html file', async () => {
    const res = await request(app).get('/pizza-manager/add');
    expect(res.statusCode).toBe(200);
    expect(res.text).toContain('pizzaAdd.html');
  });
});

describe('GET /pizza-manager/edit', () => {
  it('responds with the pizzaEdit.html file', async () => {
    const res = await request(app).get('/pizza-manager/edit');
    expect(res.statusCode).toBe(200);
    expect(res.text).toContain('pizzaEdit.html');
  });
});