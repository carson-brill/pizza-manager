console.log('pizzaEditScript.js loaded')

currentPizzaToppings = []

populatePizzaToEdit()

getToppings()

document.querySelector('#btnUpdate').addEventListener('click', () => {
  currentPizzaId = getCurrentPizzaId()
  newPizzaName = document.getElementById('pizzaName').value
  newPizzaToppings = getNewPizzaToppings()
  if (currentPizzaId && newPizzaName && newPizzaToppings) { // null/empty check
    updatePizza(currentPizzaId, newPizzaName, newPizzaToppings)
  }
})

async function getPizza() {
  try {
    await fetch('/pizza-search', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(
            {
                pizzaId: getCurrentPizzaId()
            }),
    })
    .then(response => response.json())
    .then(data => setPizzaToppings(data))
} catch (error) {
    console.error('Error fetching toppings:', error)
    return;
}
}

function setPizzaToppings(pizza) {
  currentPizzaToppings = pizza.toppings
}

async function getToppings() {
    try {
        await getPizza() // Get current pizza toppings first to ensure checkboxes are checked
        await fetch('/toppings', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(response => response.json())
        .then(data => createToppingsList(data))
    } catch (error) {
        console.error('Error fetching toppings:', error)
        return;
    }
}

function createToppingsList(toppings) {
    const toppingsList = document.getElementById("toppings-list")
    toppingsList.innerHTML = ''

    for (topping of toppings) {
      // Create column div + topping label + checkbox input

      const colItem = document.createElement("div")
      colItem.className = "col"

      const labelItem = document.createElement("label")
      labelItem.className = "form-check-label"
      labelItem.for = "toppings"
      labelItem.textContent = topping.name

      const inputItem = document.createElement("input")
      inputItem.className = "form-check-input"
      inputItem.type = "checkbox"
      inputItem.id = "toppings"
      inputItem.value = topping.name
      inputItem.name = "toppings"

      if (currentPizzaToppings.includes(topping.name)) {
        inputItem.checked = true
      }

      // Append to list
      colItem.appendChild(labelItem)
      colItem.appendChild(inputItem)
      toppingsList.appendChild(colItem)
    }
}

function populatePizzaToEdit() {
  const urlParams = new URLSearchParams(window.location.search)
  const pizza = urlParams.get('name')
  document.querySelector('#pizzaName').value = pizza
}

function getCurrentPizzaId() {
  const urlParams = new URLSearchParams(window.location.search)
  const pizza = urlParams.get('id')
  return pizza
}

function getNewPizzaToppings() {
  var toppings = []
  document.querySelectorAll('#toppings').forEach(function(topping) {
    if (topping.checked) {
      toppings.push(topping.value)
    }
  });

  return toppings
}

async function updatePizza(currentPizzaId, newPizzaName, newPizzaToppings) {
  fetch('/pizzas', {
      method: 'PATCH',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(
          {
              currentPizzaId: currentPizzaId, 
              newPizzaName: newPizzaName,
              newPizzaToppings: newPizzaToppings
          }),
  })
      .then(response => response.text())
      .then(data => {
          console.log(currentPizzaId, 'pizza update sent')
      })
      .catch(error => {
          console.error('Error updating pizza:', error)
      })
}
