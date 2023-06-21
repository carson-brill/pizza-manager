console.log('pizzaAddScript.js loaded')

getToppings()

async function getToppings() {
    try {
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
      console.log(topping)
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

      // Append to list
      colItem.appendChild(labelItem)
      colItem.appendChild(inputItem)
      toppingsList.appendChild(colItem)
    }
}
