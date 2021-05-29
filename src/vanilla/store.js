class Store {
  constructor (initState = {}) {
    this._state = initState
    this._event = new Map()
  }

  get = () => {
    return Object.freeze(this._state)
  }

  on = (prop, listener) => {
    if (!this._event.has(prop)) {
      this._event.set(prop, [listener])
      return prop
    }

    this._event.get(prop).push(listener)
    return prop
  }

  remove = (state) => {
    return this._event.delete(state)
  }

  set = (state) => {
    const prevState = { ...this._state }
    const nextState = { ...this._state, ...state }

    const changedProps = this._changedProps(prevState, nextState)
    if (changedProps.length > 0) {
      this._state = nextState;
      [...changedProps].forEach((prop) => {
        this._pipe(...this._event.get(prop))(prevState, nextState)
      })
      console.log(this._state)
    }
  }

  _checkDifference = (prev, next) => {
    return JSON.stringify(prev) !== JSON.stringify(next)
  }

  _pipe = (...func) => (...arg) =>
    func.reduce((args, fun) => {
      if (typeof fun !== 'function') return fun
      fun(...arg)
    }, {})

  _changedProps = (prev, next) => {

    return [...this._event.keys()].filter((prop) => {
      const prevValue = prev[prop]
      const nextValue = next[prop]

      return this._checkDifference(prevValue, nextValue)
    })
  }
}

export default Store
