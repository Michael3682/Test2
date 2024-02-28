var canvas = document.getElementById("myCanvas")
var ctx = canvas.getContext("2d")
canvas.width = window.innerWidth
canvas.height = window.innerHeight
const particlesArray = []
const mouse = {
    x: undefined,
    y: undefined
}

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
})

canvas.addEventListener('mousemove', (event) => {
    mouse.x = event.x
    mouse.y = event.y
    for (let i = 0; i < 50; i++) {
        particlesArray.push(new Particle())
    }
})

class Particle {
    constructor() {
        this.x = mouse.x
        this.y = mouse.y
        this.size = Math.random() * 10 + 1
        this.speedX = Math.random() * 3 - 1.5
        this.speedY = Math.random() * 3 - 1.5
    }
    update() {
        this.x += this.speedX
        this.y += this.speedY
        if (this.size > .1) {
            this.size -= .1
        }
    }
    draw() {
        ctx.strokeStyle = 'white'
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 6, 2 * Math.PI)
        ctx.stroke()
    }
}
function handleParticles() {
    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update()
        particlesArray[i].draw()
        if (particlesArray[i].size <= 0.3) {
            particlesArray.splice(i, 1)
            i--
        }
    }
}
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    handleParticles()
    requestAnimationFrame(animate)
}
animate()