console.log('toppingsScript.js loaded')

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
        // Create row item (topping name + action buttons)
        const rowItem = document.createElement("tr")
        rowItem.className = "align-middle"

        const dataItem = document.createElement("td")
        dataItem.textContent = topping.name

        const actionButtonsItem = document.createElement("td")
        actionButtonsItem.className = "text-end"

        const divItem = document.createElement("div")
        divItem.className = "d-flex flex-row justify-content-end gap-2"

        const editButton = document.createElement("a")
        editButton.href = "/toppings-manager/edit?name=" + topping.name + "&id=" + topping._id
        editButton.type = "button"
        editButton.className = "btn btn-warning btn-small"
        const editIcon = document.createElement("i")
        editIcon.className = "bi bi-pencil"
        editButton.appendChild(editIcon)

        // HTML doesn't support DELETE method in forms, so we use POST
        const formDeleteItem = document.createElement("form")
        formDeleteItem.action = "/toppings/" + topping._id
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

        // Create row item (topping name + action buttons)
        rowItem.appendChild(dataItem)
        rowItem.appendChild(actionButtonsItem)
        toppingsList.appendChild(rowItem)
    }
}
