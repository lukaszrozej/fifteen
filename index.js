const showC = s => {
  console.log(s.slice(0, 4))
  console.log(s.slice(4, 8))
  console.log(s.slice(8, 12))
  console.log(s.slice(12))
}

const board = document.querySelector('.board')

// Inputs

const keyMapping = {
  32: SHUFFLE,
  37: LEFT,
  38: UP,
  39: RIGHT,
  40: DOWN
}

const keyboardActions = Rx.Observable
  .fromEvent(document, 'keydown')
  .filter(e => [32, 37, 38, 39, 40].includes(e.keyCode))
  .map(e => keyMapping[e.keyCode])

const mouseActions = Rx.Observable
  .fromEvent(board, 'click')
  .filter(e => e.target.classList.contains('tile'))
  .map(e => parseInt(e.target.id))

const actions = Rx.Observable.merge(keyboardActions, mouseActions)

const gameStates = actions.scan(newState, initialState())

// Output

const createTile = i => {
  const tile = document.createElement('div')
  tile.classList.add('tile')
  tile.textContent = i > 0 ? i : ''
  tile.id = i
  return tile
}

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]

const tiles = numbers.map(createTile)

tiles.forEach(tile => board.appendChild(tile))

const show = state => {
  state.forEach((tile, index) => {
    if (tile === 0) return
    const top = Math.floor(index / 4) * 40
    const left = (index % 4) * 40
    tiles[tile-1].style.top = `${top}px`
    tiles[tile-1].style.left = `${left}px`
  })
}

show(initialState())

gameStates.forEach(show)
