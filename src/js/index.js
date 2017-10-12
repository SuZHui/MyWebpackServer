import React, { Component } from 'react'
import ReactDom from 'react-dom'
import Redux from 'react-redux'
import { createStore } from 'redux'
import PropTypes from 'prop-types'

import Counter from '@/Components/Counter'

const reducer = (state = 0, action) => {
    switch (action.type) {
        case 'INCREMENT':
            return state + 1
        case 'DECREMENT':
            return state - 1
        default:
            return state
    }
}

const store = createStore(reducer)

const render = () => ReactDom.render(
    <Counter
        value={store.getState()}
        onIncrement={() => store.dispatch({ type: 'INCREMENT' })}
        onDecrement={() => store.dispatch({ type: 'DECREMENT' })}/>,
    document.getElementById('root')
)

store.subscribe(render)
render()
console.log(21)