function * numbers () {
    yield 1
    yield 2
    return 3
}

console.log(([...numbers()]));