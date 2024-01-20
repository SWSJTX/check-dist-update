export function setupCounter(element) {
  let counter = 0
  const setCounter = (count) => {
    counter = count
    element.innerHTML = `count is ${counter}`
  }

  console.log('111111')

  element.addEventListener('click', () => setCounter(++counter))
  setCounter(0)
}
