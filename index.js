const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

// canvas.width = innerWidth
// canvas.height = innerHeight

canvas.width = 1024
canvas.height = 768
robot_jump = 128

// console.log(canvas.width)
// console.log(canvas.height)

var squares = []
var moves_history = []
var stack_UD = []
var stack_LR = []

function screen_display_elements(){
    c.clearRect(0, 0, canvas.width, canvas.height)
    draw_squares()
    c.fillStyle = "black";
    c.font = "bold 16px Arial";
    //c.fillText("Zibri", 0, 0);
    c.fillText("Instruction: Press W(up), A(left), S(down), D(right) for moving the robot in the respective direction, ", 50, 40);
    c.fillText("Stack 1 state: " + stack_UD, 50, 70);
    c.fillText("Stack 2 state: " + stack_LR, 50, 100);
}


function valid_move(old_val, new_val, dir){
    //console.log(old_val - new_val)
    if(dir == 'x'){
        if(old_val + new_val > 0 &&  old_val + new_val < canvas.width){
            return true
        }
    }

    if(dir == 'y'){
        if(old_val + new_val > 0 &&  old_val + new_val < canvas.height){
            return true
        }
    }

}

function stack_algo(step_direction){

    if(step_direction == 'right' && stack_LR.length < 7){ //right
        stack_LR.push(step_direction);    
    }

    else if(step_direction == 'down' && stack_UD.length <4){ //down
        stack_UD.push(step_direction);
    }

    else if(step_direction == 'left'){ //left
        if(stack_LR.length != 0){
            popped_element = stack_LR.pop()
        }
        // stack_LR.push('left');
    }

    else if(step_direction == 'up'){ //up
        if(stack_UD.length != 0){
            popped_element = stack_UD.pop()
        }
    }
}

// function sleep(delay) {
//     setTimeout(() => { console.log("World!"); }, delay);
// }

function draw_square(x, y, color, width, height, c){
    c.fillStyle = color;
    c.fillRect(x, y, width, height);
}

function draw_squares(block_width = 128){
    // Allowwing first block width row for stack details representation
    for(j=1; j<20; j++){
        for (i=0; i<20; i++){
            draw_square(block_width*i+i, block_width*j+j, "red", block_width, block_width, c);
        }
    }
}
class Player {
    constructor({position, velocity}){
        this.position = position
        this.velocity = velocity
        this.radius = 30
    }

    draw(){
        c.beginPath()
        c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI*2)
        c.fillStyle = 'yellow'
        c.fill()
        c.closePath()
    }

    update(){
        this.draw()

        // this.position.x += this.velocity.x
        // this.position.y += this.velocity.y

        if(valid_move(this.position.x, this.velocity.x, 'x')){
            this.position.x += this.velocity.x
        }

        if(valid_move(this.position.y, this.velocity.y, 'y')){
            this.position.y += this.velocity.y
        }
    }
}

const player = new Player({
        position:{
            x:64,
            y:192
        },
        velocity: {
            x:0,
            y:0
        }

    }
)

// function animate(){
//     requestAnimationFrame(animate)
    // c.clearRect(0, 0, canvas.width, canvas.height)
    // draw_squares()
    // player.update()
// }

// animate()

//requestAnimationFrame(animate)
draw_squares()
player.update()

addEventListener('keypress', ({key}) =>{
    //c.fillText("Zibri", 0, 0);
    screen_display_elements();

    switch (key){
        case 'q':
            player.update()
            break
            
        case 'w':
            if(player.position.y + player.velocity.y - robot_jump > 65){
                player.velocity.y = -robot_jump
                stack_algo('up');
            // await sleep(1000)
            // moves_history.push('w')
                player.update()
    
            }
            break

        case 'a':
            player.velocity.x = -robot_jump
            stack_algo('left');// moves_history.push('a')
            player.update()
            break

        case 's':
            player.velocity.y = robot_jump
            // moves_history.push('s')
            stack_algo('down');
            player.update()
            break

        case 'd':
            player.velocity.x = robot_jump
            // moves_history.push('d')
            stack_algo('right');
            player.update()
            break 

    }
    console.log(stack_UD)
    console.log(stack_LR)
    // console.log(player.velocity)
})

addEventListener('keyup', ({key}) =>{
    //c.fillText("Zibri", 0, 0);
    screen_display_elements();

    switch (key){
        case 'w':
            player.velocity.y = 0
            player.update()
            break

        case 'a':
            player.velocity.x = 0
            player.update()
            break

        case 's':
            player.velocity.y = 0
            player.update()
            break

        case 'd':
            player.velocity.x = 0
            player.update()
            break 
    }
//     /* console.log(player.velocity) */

})
// class Square {
//     constructor({ position }) {
//         this.position = position
//         this.width = 40
//         this.height = 40
//     }

//     draw(){
//         c.fillStyle = 'blue'
//         c.fillRect(this.position.x, this.position.y,
//             this.width, this.height)
//     }
// }

// const boundary = new Square({
//     position: {
//         x: 0,
//         y: 0
//     }
// })

// boundary.draw()