import React, { Component } from 'react'
import ReactDom from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'

import CommentApp from './Components/CommentApp'
import commentsReducer from './Reducers/comments'

const store = createStore(commentsReducer)

ReactDom.render(
    <Provider store={store}>
        <CommentApp/>
    </Provider>,
    document.getElementById('root')
)







