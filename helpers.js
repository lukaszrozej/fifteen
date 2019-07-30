const matched = value => ({
  when: () => matched(value),
  then: () => matched(value),
  otherwise: () => value
})

const matching = (x, f) => ({
  then: value => f(x) ? matched(value) : match(x)
})

const match = x => ({
  when: arg => typeof arg === 'function'
    ? matching(x, arg)
    : matching(x, y => y === arg),
  otherwise: value => value
})
