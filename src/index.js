// import Rx from 'rxjs/Rx'
import { fromEvent, merge } from 'rxjs'
import { filter, map, scan } from 'rxjs/operators'
import { RIGHT, LEFT, UP, DOWN, TILE, SHUFFLE, NONE, initialState, newState } from './game-logic.js'

const board = document.querySelector('.board')

// Inputs

const keyMapping = {
  32: SHUFFLE,
  37: LEFT,
  38: UP,
  39: RIGHT,
  40: DOWN
}

const keyboardActions = fromEvent(document, 'keydown')
  .pipe(
    filter(e => [32, 37, 38, 39, 40].includes(e.keyCode)),
    map(e => keyMapping[e.keyCode])
  )

const mouseActions = fromEvent(document, 'click')
  .pipe(
    filter(e => e.target.classList.contains('clickable')),
    map(e =>
      e.target.classList.contains('tile')
        ? parseInt(e.target.id)
        : SHUFFLE
    )
  )

const windowActions = fromEvent(window, 'resize')
  .pipe(map(e => NONE))

const actions = merge(keyboardActions, mouseActions, windowActions)

const gameStates = actions.pipe(scan(newState, initialState()))

// Output

const createTile = i => {
  const tile = document.createElement('div')
  tile.classList.add('tile', 'clickable')
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
    const top = Math.floor(index / 4) * Math.floor(board.offsetHeight * 0.24) + Math.floor(board.offsetHeight * 0.04)
    const left = (index % 4) * Math.floor(board.offsetWidth * 0.24) + Math.floor(board.offsetHeight * 0.04)
    tiles[tile - 1].style.top = `${top}px`
    tiles[tile - 1].style.left = `${left}px`
  })
}

show(initialState())

gameStates.forEach(show)
