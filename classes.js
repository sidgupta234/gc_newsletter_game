class Boundary{
    static width = 48
    static height = 48
    constructor({position, width}){
        this.position = position
        this.width = 48
        this.height = 48
    }

    draw(){
        c.fillStyle = 'rgba(255, 0, 0, 0.1)'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
}

const boundaries = []

const offset = {
    x: -750,
    y: -600
}

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