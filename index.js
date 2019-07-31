const showC = s => {
  console.log(s.slice(0, 4))
  console.log(s.slice(4, 8))
  console.log(s.slice(8, 12))
  console.log(s.slice(12))
}

const createTile = i => {
  const tile = document.createElement('div')
  tile.classList.add('tile')
  tile.textContent = i > 0 ? i : ''
  return tile
}

const board = document.querySelector('.board')

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]

const tiles = numbers.map(createTile)

tiles.forEach(tile => board.appendChild(tile))

const show = state => {
  state.forEach((tile, index) => {
    if (tile === 0) return
    const top = Math.floor(index / 4) * 40
    const left = (index % 4) * 40
    console.log(tile, index, top, left)
    tiles[tile-1].style.top = `${top}px`
    tiles[tile-1].style.left = `${left}px`
  })
}

let s = initialState()

show(s)