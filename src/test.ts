function hello(msg: String): void {
    console.log(msg)
}

interface Person {
    name: String,
    age: Number
}

let isDone: Boolean = true

let decimal: Number = 6

let color: String = "blue"

let list: Number[] = [1,2,3]

let x: [String, Number] = ['1', 3]    //元祖  

enum Color {Red, Green, Blue}    //枚举
let c: Color = Color.Blue

const man: Person = {
    name: 'Tim',
    age: 26
}

//函数定义
function add(a: number, b: number): number {
    return a + b
} 
function readFile(file: string, callback: (err: Error | null, data: object) => void) {
    console.log(file, callback)
} 

type CallbackFunction = (err: Error | null, data: object) => void
function readFile2(file: string, callback: CallbackFunction) {
    console.log(file, callback)
}

interface Callback2Function {
    (err: Error|null, data: object): void
}
function readFile3(file: string, callback:Callback2Function) {
    console.log(file, callback)
}

// 类定义

