const canvas = document.querySelector('canvas');

const c = canvas.getContext('2d')


canvas.width = 1024
canvas.height = 576

const collisionsMap = []

for (let i = 0; i < collisions.length; i+=70){
    collisionsMap.push(collisions.slice(i, i+70))
}

class Boundary{
    static width = 48
    static height = 48
    constructor({position, width}){
        this.position = position
        this.width = 48
        this.height = 48
    }

    draw(){
        c.fillStyle = 'red'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
}

const boundaries = []

const offset = {
    x: -750,
    y: -550
}

collisionsMap.forEach((row, i) => {
    row.forEach((symbol, j) => {
      if (symbol === 1025)
        boundaries.push(
          new Boundary({
            position: {
              x: j * Boundary.width + offset.x,
              y: i * Boundary.height + offset.y
            }
          })
        )
    })
  })

//console.log(boundaries)

const image = new Image()
image.src = './img/Pellet Town.png'

const playerImage = new Image()
playerImage.src = './img/playerDown.png'

class Sprite {
    constructor({position, velocity, image, frames = {max:1}}){
       this.position =  position
       this.image = image
       this.frames = frames

       this.image.onload = () => {
        this.width = this.image.width / this.frames.max
        this.height = this.image.height / this.frames.max

        // console.log(this.width, this.height)
       }
    }

    draw(){
        c.drawImage(
            this.image,
            // Cropping pixels
            0,
            0,
            this.image.width/this.frames.max,
            this.image.height,
            this.position.x,
            this.position.y,
    
            // Rendering pixels
            this.image.width/this.frames.max,
            this.image.height
        )
    }
}

const player = new Sprite({
    position:{
        x: canvas.width/2 - 192 / 4,
        y: canvas.height/2 - 68 / 4
    },
    image: playerImage,
    frames: {
        max:4
    }
})

const background = new Sprite({
    position: {
    x:offset.x,
    y:offset.y,
    },

    image: image
})

// image.onload = () => {

// }

const keys = {
    ArrowUp:{
        pressed: false
    },

    ArrowDown:{
        pressed: false
    },

    ArrowLeft:{
        pressed: false
    },

    ArrowRight:{
        pressed: false
    }
}

 
// const testBoundary = new Boundary({
//     position: {
//         x: 400,
//         y: 400
//     }
// })

const movables = [background, ...boundaries]

function rectangularCollision({rectangle1, rectangle2}){


    return (
        rectangle1.position.x + rectangle1.width >= rectangle2.position.x &&
        rectangle1.position.x <= rectangle2.position.x + rectangle2.width &&
        rectangle1.position.y <= rectangle2.position.y + rectangle2.height &&
        rectangle1.position.y + rectangle1.height >= rectangle2.position.y
    )
}

function animate(){
    window.requestAnimationFrame(animate) //animate calling itself infinitely recursively 
    background.draw()
    boundaries.forEach(boundary => {
        boundary.draw()

        if(
            rectangularCollision({
                rectangle1:player,
                rectangle2:boundary
            })
        ){
            console.log('colliding')
        }
    })
    player.draw()
    // testBoundary.draw()
    //console.log(keys.ArrowUp.pressed)




    if(keys.ArrowUp.pressed && lastKey == 'ArrowUp'){
        movables.forEach(movable => {
            movable.position.y += 3
        })
    } 
    else if(keys.ArrowLeft.pressed && lastKey == 'ArrowLeft') {
        movables.forEach(movable => {
            movable.position.x += 3
        })
    }
    
    else if(keys.ArrowDown.pressed && lastKey == 'ArrowDown') {
        movables.forEach(movable => {
            movable.position.y -= 3
        })
    }
    
    else if(keys.ArrowRight.pressed && lastKey == 'ArrowRight') {
        movables.forEach(movable => {
            movable.position.x -= 3
        })
    }
}


animate()

let lastKey = ''
window.addEventListener('keydown', (e) => {
    switch (e.key){
        case 'ArrowUp':
            keys.ArrowUp.pressed = true
            lastKey = 'ArrowUp'
            break
        case 'ArrowDown':
            keys.ArrowDown.pressed = true
            lastKey = 'ArrowDown'
            break
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = true
            lastKey = 'ArrowLeft'
            break
        case 'ArrowRight':
            keys.ArrowRight.pressed = true
            lastKey = 'ArrowRight'
            break
    }
    //console.log(keys)
})

window.addEventListener('keyup', (e) => {
    switch (e.key){
        case 'ArrowUp':
            keys.ArrowUp.pressed = false
            break
        case 'ArrowDown':
            keys.ArrowDown.pressed = false
            break
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = false
            break
        case 'ArrowRight':
            keys.ArrowRight.pressed = false
            break
    }
    //console.log(keys)
})