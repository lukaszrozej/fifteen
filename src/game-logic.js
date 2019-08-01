const RIGHT = { x: 1, y: 0 }
const LEFT = { x: -1, y: 0 }
const UP = { x: 0, y: -1 }
const DOWN = { x: 0, y: 1 }
const TILE = tile => tile
const SHUFFLE = 'shuffle'
const NONE = undefined

const type = action => {
  switch (typeof action) {
    case 'object': return 'direction'
    case 'number': return 'tile'
    case 'string': return 'shuffle'
    default: return 'none'
  }
}

const getTilePosition = (state, tile) => {
  const index = state.indexOf(tile)
  return {
    x: index % 4,
    y: Math.floor(index / 4)
  }
}

const getNeighbor = (position, direction) => ({
  x: position.x - direction.x,
  y: position.y - direction.y
})

const valid = position =>
  position.x >= 0 &&
  position.x <= 3 &&
  position.y >= 0 &&
  position.y <= 3

const getIndex = position => position.x + 4 * position.y

const swap = (state, position1, position2) => {
  const index1 = getIndex(position1)
  const index2 = getIndex(position2)
  const minIndex = Math.min(index1, index2)
  const maxIndex = Math.max(index1, index2)
  return [
    ...state.slice(0, minIndex),
    state[maxIndex],
    ...state.slice(minIndex + 1, maxIndex),
    state[minIndex],
    ...state.slice(maxIndex + 1)
  ]
}

const neighbors = (position1, position2) => {
  const distance = Math.abs(position1.x - position2.x) + Math.abs(position1.y - position2.y)
  return distance === 1
}

const shuffle = state => {
  const directions = [LEFT, RIGHT, UP, DOWN]
  const moves = []
  while (moves.length < 128) {
    moves.push(directions[Math.floor(Math.random() * 4)])
  }
  return moves.reduce(newState, state)
}

const newState = (currentState, action) => {
  if (type(action) === 'direction') {
    const emptyPosition = getTilePosition(currentState, 0)
    const tilePosition = getNeighbor(emptyPosition, action)
    if (valid(tilePosition)) return swap(currentState, emptyPosition, tilePosition)
  }
  if (type(action) === 'tile') {
    const emptyPosition = getTilePosition(currentState, 0)
    const tilePosition = getTilePosition(currentState, action)
    if (neighbors(emptyPosition, tilePosition)) return swap(currentState, emptyPosition, tilePosition)
  }
  if (type(action) === 'shuffle') return shuffle(currentState)
  return currentState
}

const initialState = () => [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 0]
