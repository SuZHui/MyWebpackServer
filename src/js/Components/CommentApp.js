import React, { Component } from 'react'

import CommentInput from '../Containers/CommentInput'
import CommentList from '../Containers/CommentList'
import Clock from './Clock'

export default class CommentApp extends Component {
    constructor() {
        super()
        this.state = {
            isShowClock: true
        }
    }

    handleShowOrHide() {
        this.setState({isShowClock: !this.state.isShowClock})
    }

    render() {
        return (
            <div className="wrapper">
                { this.state.isShowClock ? <Clock/> : null }
                <button onClick={ this.handleShowOrHide.bind(this) }>显示或隐藏时钟</button>
                <hr/>
                <CommentInput/>
                <CommentList/> 
            </div>
        )
    }
}