console.log('pizzaScript.js loaded')

getPizzas()

async function getPizzas() {
    try {
        await fetch('/pizzas', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(response => response.json())
        .then(data => createPizzaList(data))
    } catch (error) {
        console.error('Error fetching pizzas:', error)
        return;
    }
}

function createPizzaList(pizzas) {
    const pizzaList = document.getElementById("pizza-list")
    pizzaList.innerHTML = ''

    for (pizza of pizzas) {
        // Create row item (pizza name + toppings + action buttons)
        const rowItem = document.createElement("tr")
        rowItem.className = "align-middle"

        const pizzaNameItem = document.createElement("td")
        pizzaNameItem.textContent = pizza.name

        const pizzaToppingsItem = document.createElement("td")
        pizzaToppingsItem.textContent = pizza.toppings

        const actionButtonsItem = document.createElement("td")
        actionButtonsItem.className = "text-end"

        const divItem = document.createElement("div")
        divItem.className = "d-flex flex-row justify-content-end gap-2"

        const editButton = document.createElement("a")
        editButton.href = "/pizza-manager/edit?name=" + pizza.name + "&id=" + pizza._id
        editButton.type = "button"
        editButton.className = "btn btn-warning btn-small"
        const editIcon = document.createElement("i")
        editIcon.className = "bi bi-pencil"
        editButton.appendChild(editIcon)

        // HTML doesn't support DELETE method in forms, so we use POST
        const formDeleteItem = document.createElement("form")
        formDeleteItem.action = "/pizzas/" + pizza._id
        formDeleteItem.method = "POST"
        formDeleteItem.className = "position-relative"
        const deleteButton = document.createElement("button")
        deleteButton.className = "btn btn-danger btn-small"
        deleteButton.type = "submit"
        const deleteIcon = document.createElement("i")
        deleteIcon.className = "bi bi-x-circle"
        deleteButton.appendChild(deleteIcon)
        formDeleteItem.appendChild(deleteButton)

        // Create action buttons div
        divItem.appendChild(editButton)
        divItem.appendChild(formDeleteItem)
        actionButtonsItem.appendChild(divItem)

        // Create row item (pizza name + toppings + action buttons)
        rowItem.appendChild(pizzaNameItem)
        rowItem.appendChild(pizzaToppingsItem)
        rowItem.appendChild(actionButtonsItem)
        pizzaList.appendChild(rowItem)
    }
}
