console.log('toppingsEditScript.js loaded')

populateToppingToEdit()

document.querySelector('#btnUpdate').addEventListener('click', () => {
  currentTopping = getCurrentTopping()
  console.log('currTopping,', currentTopping)
  newTopping = document.getElementById('toppingName').value
  if (currentTopping && newTopping) { // null/empty check
      updateTopping(currentTopping, newTopping)
  }
})

function populateToppingToEdit() {
  const urlParams = new URLSearchParams(window.location.search)
  const topping = urlParams.get('name')
  document.querySelector('#toppingName').value = topping
}

function getCurrentTopping() {
  const urlParams = new URLSearchParams(window.location.search)
  const topping = urlParams.get('id')
  return topping
}

async function updateTopping(currentTopping, newTopping) {
  fetch('/toppings', {
      method: 'PATCH',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(
          {
              currentTopping: currentTopping, 
              newTopping: newTopping
          }),
  })
      .then(response => response.text())
      .then(data => {
          console.log(currentTopping, 'topping update sent')
      })
      .catch(err => {
          console.error('Error updating topping:', error)
      })
}