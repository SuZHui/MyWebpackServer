import * as React from 'react'
import * as ReactDOM from 'react-dom'

import { Hello } from './tsx/component'

ReactDOM.render(
    <Hello compiler="TypeScript" framework="React"/>,
    document.getElementById('root')
)

function buttonEvent() :void {
    let btn: HTMLElement = document.querySelector('#btn') as HTMLElement
    console.log(btn)
    btn.addEventListener("click", (e: Event) => {
        console.log(e)
        countDown(btn, 12)
    })
}

class Timer extends Window {
    static second: number = 0
    static timer: any

    constructor(time:number) {
        super();
    }
}
Timer.second = 3

function countDown(btn:HTMLElement, time:number) :any{
    if (Timer.timer == null || Timer.timer == undefined) {
        Timer.second = time
        Timer.timer = setInterval(() => {
            if (Timer.second <= 0) {
                clearInterval(Timer.timer);
                btn.innerHTML = '获取验证码'
                Timer.timer = null
                return
            }
            btn.innerHTML = `${Timer.second--}秒后再次获取`
        },1000);
        console.log(Timer.timer)
    }
    return Timer.timer
}

buttonEvent()

