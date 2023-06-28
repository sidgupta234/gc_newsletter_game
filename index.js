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


image.onload = () => {
    c.drawImage(image, -750, -550)
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
}





window.addEventListener('keydown', (e) => {

    switch (e.key){
        case 'ArrowUp':
            console.log('pressed up')
            break
        case 'ArrowDown':
            console.log('pressed down')
            break
        case 'ArrowLeft':
            console.log('pressed left')
            break
        case 'ArrowRight':
            console.log('pressed right')
            break

    }
})