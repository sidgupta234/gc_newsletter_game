const canvas = document.querySelector('canvas');

const c = canvas.getContext('2d')


canvas.width = 1024
canvas.height = 576

const collisionsMap = []

for (let i = 0; i < collisions.length; i+=70){
    collisionsMap.push(collisions.slice(i, i+70))
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

const foregroundImage = new Image()
foregroundImage.src = './img/ForegroundObjects.png'

const playerDownImage = new Image()
playerDownImage.src = './img/playerDown.png'

const playerUpImage = new Image()
playerUpImage.src = './img/playerUp.png'

const playerLeftImage = new Image()
playerLeftImage.src = './img/playerLeft.png'

const playerRightImage = new Image()
playerRightImage.src = './img/playerRight.png'

const player = new Sprite({
    position:{
        x: canvas.width/2 - 192 / 4 + 20,
        y: canvas.height/2 - 68 / 4 + 100
    },
    image: playerDownImage,
    frames: {
        max:4
    },
    sprites: {
        up: playerUpImage,
        down: playerDownImage,
        left: playerLeftImage,
        right: playerRightImage
    }
})

console.log(player)

const background = new Sprite({
    position: {
    x:offset.x,
    y:offset.y,
    },

    image: image
})

const foreground = new Sprite({
    position: {
    x:offset.x,
    y:offset.y,
    },

    image: foregroundImage
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

const movables = [background, ...boundaries, foreground]

function rectangularCollision({ rectangle1, rectangle2 }) {
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
    })
    player.draw()
    foreground.draw()
    // testBoundary.draw()
    //console.log(keys.ArrowUp.pressed)

    let moving = true
    player.moving = false

    if(keys.ArrowUp.pressed && lastKey == 'ArrowUp'){
        player.moving = true
        player.image = player.sprites.up

        for (let i =0; i < boundaries.length; i++){
            const boundary = boundaries[i]
            if(
                rectangularCollision({
                    rectangle1:player,
                    rectangle2:{
                        ...boundary, 
                        position : {
                            x: boundary.position.x,
                            y: boundary.position.y + 3
                    }}
                })
            ){
                console.log('colliding')
                moving = false
                break
            }
        }

        if (moving){
            movables.forEach(movable => {
                movable.position.y += 3
            })
        }
        
    }

    else if(keys.ArrowDown.pressed && lastKey == 'ArrowDown') {
        player.moving = true
        player.image = player.sprites.down

        for (let i =0; i < boundaries.length; i++){
            const boundary = boundaries[i]
            if(
                rectangularCollision({
                    rectangle1:player,
                    rectangle2:{
                        ...boundary, 
                        position : {
                            x: boundary.position.x,
                            y: boundary.position.y - 3
                    }}
                })
            ){
                console.log('colliding')
                moving = false
                break
            }
        }

        if (moving){
        movables.forEach(movable => {
            movable.position.y -= 3
            })
        }

    }


    else if(keys.ArrowLeft.pressed && lastKey == 'ArrowLeft') {
        player.moving = true
        player.image = player.sprites.left

        for (let i =0; i < boundaries.length; i++){
            const boundary = boundaries[i]
            if(
                rectangularCollision({
                    rectangle1:player,
                    rectangle2:{
                        ...boundary, 
                        position : {
                            x: boundary.position.x + 3,
                            y: boundary.position.y
                    }}
                })
            ){
                console.log('colliding')
                moving = false
                break
            }
        }

        if (moving){
        movables.forEach(movable => {
            movable.position.x += 3
            })
        }

    }
    
    else if(keys.ArrowRight.pressed && lastKey == 'ArrowRight') {
        player.moving = true
        player.image = player.sprites.right
        
        for (let i =0; i < boundaries.length; i++){
            const boundary = boundaries[i]
            if(
                rectangularCollision({
                    rectangle1:player,
                    rectangle2:{
                        ...boundary, 
                        position : {
                            x: boundary.position.x - 3,
                            y: boundary.position
                    }}
                })
            ){
                console.log('colliding')
                moving = false
                break
            }
        }

        if (moving){
        movables.forEach(movable => {
            movable.position.x -= 3
            })
        }

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