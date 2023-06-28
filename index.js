const canvas = document.querySelector('canvas');

const c = canvas.getContext('2d')


canvas.width = 1024
canvas.height = 576

c.fillStyle = 'White'
c.fillRect(0, 0, canvas.width, canvas.height)

const image = new Image()
image.src = './img/Pellet Town.png'

const playerImage = new Image()
playerImage.src = './img/playerDown.png'

class Sprite {
    constructor({position, velocity, image}){
       this.position =  position
       this.image = image
    }

    draw(){
        c.drawImage(this.image, this.position.x,this.position.y);
    }
}

const background = new Sprite({
    position: {
    x:-750,
    y:-550,
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



function animate(){
    window.requestAnimationFrame(animate) //animate calling itself infinitely recursively 
    background.draw()
    //console.log('animate')
    c.drawImage(
        playerImage,
        // Cropping pixels
        0,
        0,
        playerImage.width/4,
        playerImage.height,

        // Rendering pixels
        canvas.width/2 - playerImage.width/4, 
        canvas.height/2- playerImage.height/4,
        playerImage.width/4,
        playerImage.height
    )

    //console.log(keys.ArrowUp.pressed)
    if(keys.ArrowUp.pressed) background.position.y += 3
    else if(keys.ArrowLeft.pressed) background.position.x += 3
    else if(keys.ArrowDown.pressed) background.position.y -= 3
    else if(keys.ArrowRight.pressed) background.position.x -= 3
}


animate()

window.addEventListener('keydown', (e) => {
    switch (e.key){
        case 'ArrowUp':
            keys.ArrowUp.pressed = true
            break
        case 'ArrowDown':
            keys.ArrowDown.pressed = true
            break
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = true
            break
        case 'ArrowRight':
            keys.ArrowRight.pressed = true
            break
    }
    console.log(keys)
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
    console.log(keys)
})