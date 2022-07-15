const grid = document.querySelector('.grid')
const resultDisplay = document.querySelector('.result')
const timeDisplay = document.getElementById('time')
const scoreDisplay = document.getElementById('score')
let startKey = document.getElementById('start')
let invaders = []
let bullets = []
let score = 0
let remainTime = 100
let makeNewEnemies = true
let invadersIncreas = [30,1,5]
let timePassed = 0


class Invaders{
	constructor(n){
		this.pos = n
		this.node = document.getElementById('sq'+this.pos)
		this.node.classList.add('invader')

	}
	move(){
		this.pos+=15
		this.node.classList.remove('invader')
		this.node = document.getElementById('sq'+this.pos)
		this.node.classList.add('invader')
	}
	remove(){
		let ind = invaders.indexOf(this)
		if (ind!=-1){ 
			invaders.splice(ind,1)
			this.node.classList.remove('invader')		
		}
	}
}

class Player{
	constructor(n){
		this.pos = n
		this.node = document.getElementById('sq'+this.pos)
		this.node.classList.add('player')
	}

	moveLeft(){
		if (!(this.pos%15==0)){
			this.pos--
			this.node.classList.remove('player')
			this.node = document.getElementById('sq'+this.pos)
			this.node.classList.add('player')
		}	
	}

	moveRight(){
		if (!(this.pos%15==14)){
			this.pos++
			this.node.classList.remove('player')
			this.node = document.getElementById('sq'+this.pos)
			this.node.classList.add('player')
		}	
	}

	
	fire(){
		let bullet = new  Bullet(this.pos-15)
		bullets.push(bullet)
		
	}

	
}

class Bullet{
	constructor(n){
		this.pos = n
		this.node = document.getElementById('sq'+(this.pos))		
		this.node.innerHTML = "<div class='bullet'></div>"
	}
	move(){
		if (this.pos<15){
			this.remove()
		}else{
			this.pos-=15
			this.node.innerHTML=''
			this.node = document.getElementById('sq'+this.pos)
			this.node.innerHTML = "<div class='bullet'></div>"
		}
	}
	remove(){
		this.node.innerHTML = ''
		bullets.splice(bullets.indexOf(this),1)		
	}
}


function makeSpace(){
	for (let i=0;i<225;i++){
		const square = document.createElement('div')
		square.id = 'sq'+i
		square.classList.add('space')
		grid.appendChild(square)

	}
}

function makeInvaders(n,row){
	let positions=[]
	let c=0
	while(c<n){
		let pos = Math.floor(Math.random()*15)+row*15
		if (!(positions.includes(pos))){
			positions.push(pos)
			c++
		}
	}	
	positions.forEach(pos=>{
		newInvader = new Invaders(pos)
		invaders.push(newInvader)
	})	
}




function checkInvadersDeath(){		
	invaders.forEach(invader=>{
		bullets.forEach(bullet=>{
			if(invader.pos==bullet.pos){
				invader.remove()
				bullet.remove()
				score++
				scoreDisplay.innerText = ' \n'+score
			}
		})
	})
}

function CheckLose(){
	invaders.forEach(invader=>{
		if (invader.pos>194){
			clearInterval(invadersInt)
			clearInterval(bulletMoveInt)
			clearInterval(timeInt)
			document.removeEventListener('keydown', keyHandle)
			resultDisplay.innerText = 'You Lose :('
			resultDisplay.style.color = 'purple'
		}
	})
}

function moveInvaders(){
	invaders.forEach(invader=>invader.move())	
	let newEnemiesNumber = Math.floor(timePassed/invadersIncreas[0])*invadersIncreas[1]+invadersIncreas[2]
	if (newEnemiesNumber>15){newEnemiesNumber=15}
	if (makeNewEnemies){makeInvaders(newEnemiesNumber,1)}	
	CheckLose()
}

function bulletMove(){
	bullets.forEach(bullet=>bullet.move())
	checkInvadersDeath()

}


function keyHandle(e){
	switch(e.key){
		case 'ArrowLeft':
			player.moveLeft()
			break;
		case 'ArrowRight' :
			player.moveRight()
			break
		case 'ArrowUp' :
			player.fire()
			break	
	}
}

function updateInfos(){
	timeDisplay.innerHTML=' \n' + remainTime
	timePassed++
	if (makeNewEnemies) {remainTime--} 
	if (remainTime==0){
		makeNewEnemies = false	
		if (invaders.length==0){
			clearInterval(timeInt)
			clearInterval(bulletMoveInt)
			clearInterval(invadersInt)			
			document.removeEventListener('keydown', keyHandle)
			resultDisplay.innerText = 'You Win :D'
			resultDisplay.style.color = 'green'
		}
	}
}

function pause(){
	clearInterval(timeInt)
	clearInterval(bulletMoveInt)
	clearInterval(invadersInt)
	document.removeEventListener('keyup', keyHandle)
	startKey.innerText = 'Resume'
	startKey.onclick = resume		

}

function resume(){
	invadersInt = setInterval(moveInvaders,2500)
	bulletMoveInt = setInterval(bulletMove,100)
	timeInt = setInterval(updateInfos,1000)
	document.addEventListener('keyup', keyHandle)
	startKey.innerText = 'Pause'
	startKey.onclick = pause

}

function main(){
	makeSpace()
	makeInvaders(9,3)
	makeInvaders(9,2)
	makeInvaders(9,1)
	player = new Player(202)
	document.addEventListener('keyup', keyHandle)
	invadersInt = setInterval(moveInvaders,2500)
	bulletMoveInt = setInterval(bulletMove,100)
	timeInt = setInterval(updateInfos,1000)
	startKey.innerText = 'Pause'
	startKey.onclick = pause

}					
