const game1 = new Hangman ( 'cat man', 2)

const renderPuzzle = (game) => {
  const puzzle = document.createElement('h2')
  puzzle.textContent = game.puzzle
  return puzzle
}

const renderCount = (game) => {
  const guessCount = document.createElement('p')
  guessCount.textContent = game.statusMsg
  return guessCount
}

document.querySelector('#game').appendChild(renderPuzzle(game1))
document.querySelector('#game').appendChild(renderCount(game1))

window.addEventListener('keypress', (e) => {
  const guess = String.fromCharCode(e.charCode)
  game1.makeGuess(guess)
  game1.getStatus()

  document.querySelector('#game').innerHTML = ''

  document.querySelector('#game').appendChild(renderPuzzle(game1))
  document.querySelector('#game').appendChild(renderCount(game1))


})
