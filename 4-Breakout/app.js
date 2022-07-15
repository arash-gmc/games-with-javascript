
const grid=document.querySelector('.grid')
const blockWidth = 100
const blockHeight = 20
const userStart = [230,10]
let currentPosition = userStart
const ballStart = [270,50]
let ballPosition = ballStart
let ballVelocity = [2,1]
let render

class Block {
	constructor(xAxis,yAxis){
		this.bottomLeft = [xAxis,yAxis]
		this.bottomRight = [xAxis+blockWidth,yAxis]
		this.topLeft = [xAxis,yAxis+blockHeight]
		this.topRight = [xAxis+blockWidth,yAxis+blockHeight]
		this.div= document.createElement('div')
		this.div.classList.add('block')
		this.div.style.left = this.bottomLeft[0]+'px'
		this.div.style.bottom = this.bottomLeft[1]+'px'	
		grid.appendChild(this.div)

	}

	Remove(){
		grid.removeChild(this.div)
	}


}

class Ball {
	
	constructor(){
		this.div = document.createElement('div')
		this.div.classList.add('ball')
		grid.appendChild(this.div)
		this.position = [260,50]
		this.velocity = [2,1]
		this.draw()
		
	}

	draw(){
		this.div.style.left = this.position[0]+'px'
		this.div.style.bottom = this.position[1]+'px'
	}
	move(){
		if ((this.position[0]>540	) || (this.position[0]<0)){
			this.verticalCollusion()
		}

		if (this.position[1]> 280){
			this.horizontalCollusion()
		}
		this.position[0] += this.velocity[0]
		this.position[1] += this.velocity[1]
		this.draw()
	}
	horizontalCollusion(){
		this.velocity[1]=-this.velocity[1]
	}

	verticalCollusion(){
		this.velocity[0]=-this.velocity[0]
	}
}

class Rocket{
	constructor(){
		this.div = document.createElement('div')
		this.div.classList.add('user')
		this.position = [230,20]
		grid.appendChild(this.div)
		this.draw()
		
		
	}
	draw(){
		this.div.style.left = this.position[0] +'px'
		this.div.style.bottom = this.position[1] + 'px'
		}
		
	move(key){
	switch(key){
		case 'ArrowLeft':
			if (this.position[0]>0){
				this.position[0]-=10
				this.draw()}
			break
		case 'ArrowRight':
			if (this.position[0]<460){
				this.position[0]+=10
				this.draw()}
			break	
		
			}
	}

}

const blocks=[]

for (i=0;i<5;i++){
	for (j=0;j<4;j++){
		let block = new Block(110*i+10,30*j+160)
		blocks.push(block)

	}
}

ball1 = new Ball()
player = new Rocket()

function move(){
	ball1.move()
	blocks.forEach(block=>{
		if ((ball1.position[0]+20>block.bottomLeft[0])&&(ball1.position[0]<block.bottomRight[0])&&
			(ball1.position[1]+20>block.bottomLeft[1])&&(ball1.position[1]<block.topLeft[1])){
			blockBallCollusion(block,ball1)
			

			
		}
	})
	if ((ball1.position[0]+10>player.position[0])&&(ball1.position[0]+10<player.position[0]+100)
		&&(ball1.position[1]==player.position[1]+20)){
		ball1.horizontalCollusion()
	}

	if (ball1.position[1]==0){
		gameover=document.createElement('div')
		gameover.classList.add('gameover')
		gameover.innerText="GAME OVER"
		grid.appendChild(gameover)
		document.removeEventListener('keydown',moveRocket)
		clearInterval(render)
	}

	if (blocks.length==0){
		gameover=document.createElement('div')
		gameover.classList.add('gameover')
		gameover.innerText="YOU WON"
		gameover.style.color= 'green';
		grid.appendChild(gameover)
		document.removeEventListener('keydown',moveRocket)
		clearInterval(render)
	}
	
}

function blockBallCollusion(block,ball){
	block.Remove()
	ind = blocks.indexOf(block)
	blocks.splice(ind, 1)
	ball1.horizontalCollusion()

}



render = setInterval(move,15)


function moveRocket(e){
	player.move(e.key)
	
}


document.addEventListener('keydown',moveRocket)
