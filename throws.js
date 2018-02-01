const canvas = document.getElementById('csnv')
const ctx = canvas.getContext('2d')
const w = canvas.width
const h = canvas.height
let first = null
let toss = null
let toTheLeft = 0
let above = 0
let total = 0
let points = [];


let randPoint = (color) => {return {color: color, x: Math.random() * w, y: Math.random() * h}}

let randColor = () => `hsl(${Math.floor(220 + Math.random() * 20)},50%,50%)`

let drawPoint = (o, r) => {
    ctx.beginPath()
    ctx.fillStyle = o.color
    ctx.arc(o.x, o.y, r, 0, Math.PI *2, true)
    ctx.fill()
    ctx.closePath()
}

let drawVer = (x) => {
    ctx.beginPath()
    ctx.lineWidth = 3
    ctx.moveTo(x+1, 0)
    ctx.lineTo(x+1, h)
    ctx.stroke()
    ctx.closePath()
}

let drawHor = (y) => {
    ctx.beginPath()
    ctx.lineWidth = 3
    ctx.moveTo(0, y+1)
    ctx.lineTo(w, y+1)
    ctx.stroke()
    ctx.closePath()
}

let drawFirst = () => {
    drawPoint(first, 10)
}

let draw = () => {
    canvas.width = w
    for (point of points) {
        drawPoint(point, 5)
    }
    if (total > 0) {
        ctx.strokeStyle = "white"
        drawVer(w * toTheLeft / total)
        drawHor(h * above / total)
    }
    drawFirst()
}

let drop = () => {
    if (first) {
        let point = randPoint(randColor())

        if (point.x < first.x) {
            toTheLeft++
        }
        if (point.y < first.y) {
            above++
        }
        points.push(point)
        total++

    } else {
        first = randPoint("yellow")
    }
}

let doNew = () => {
    drop()
    draw()
}

let doNewTen = () => {
    for (let i = 0; i < 10; i++) {
        drop()
    }
    draw()
}

let doNewHundo = () => {
    for (let i = 0; i < 100; i++) {
        drop()
    }
    draw()
}

let doNewThou = () => {
    for (let i = 0; i < 1000; i++) {
        drop()
    }
    draw()
}

let doNew10Thou = () => {
    for (let i = 0; i < 10000; i++) {
        drop()
    }
    draw()
}

function restartIt() {
    console.log('restart called')
    first = null
    toss = null
    toTheLeft = 0
    above = 0
    total = 0
    points = []
    canvas.width = canvas.width
}

document.getElementById('restart').addEventListener('click', restartIt, false)
document.getElementById('throw').addEventListener('click', doNew, false)
document.getElementById('throw10').addEventListener('click', doNewTen, false)
document.getElementById('throw100').addEventListener('click', doNewHundo, false)
document.getElementById('throw1000').addEventListener('click', doNewThou, false)
document.getElementById('throw10000').addEventListener('click', doNew10Thou, false)
