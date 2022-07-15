const timeLeftDisplay = document.querySelector('#time-left')
const resultDisplay = document.querySelector('#result')
const squares = document.querySelectorAll('.grid div')
const logsLeft = document.querySelectorAll('.log-left')
const logsRight = document.querySelectorAll('.log-right')
const carsLeft = document.querySelectorAll('.car-left')
const carsRight = document.querySelectorAll('.car-right')
let time
let running=false
let endGame = true
let logsInt
let carsInt
let timeInt
let frogIndex
let lastFrogIndex



function moveFrog(e){
	switch (e.key) {
		case 'ArrowLeft':
			frogIndex--
			break;
		case 'ArrowRight':
			frogIndex++
			break
		
		case 'ArrowUp':
			frogIndex-=9
			break

		case 'ArrowDown':
			frogIndex+=9
			break	
		
	}
	if ((frogIndex>80)||(frogIndex<0)
		||((lastFrogIndex%9==8)&&(frogIndex%9==0))
		||((lastFrogIndex%9==0)&&(frogIndex%9==8))){
		frogIndex=lastFrogIndex
	}
	squares[lastFrogIndex].classList.remove('frog')
	squares[frogIndex].classList.add('frog')
	

	lastFrogIndex = frogIndex
	checkCollusion()
	checkWin()
}



function autoMoveLogs(){
	logsLeft.forEach(log=>moveLogLeft(log))
	logsRight.forEach(log=>moveLogRight(log))
	checkCollusion()
}

function autoMoveCars(){
	carsLeft.forEach(car=>moveCarLeft(car))
	carsRight.forEach(car=>moveCarRight(car))
	checkCollusion()
}		

function moveLogLeft(log){	
	let className = log.classList[1]
	let newClass = 'l'+(Number(className[1])+1)
	if (newClass=='l6'){newClass='l1'}
	log.classList.remove(className)
	log.classList.add(newClass)
	reloadFrog(log)	
}

function moveLogRight(log){	
	let className = log.classList[1]
	let newClass = 'l'+(Number(className[1])-1)
	if (newClass=='l0'){newClass='l5'}
	log.classList.remove(className)
	log.classList.add(newClass)
	reloadFrog(log)	
}

function moveCarLeft(car){	
	let className = car.classList[1]
	let newClass = 'c'+(Number(className[1])+1)
	if (newClass=='c4'){newClass='c1'}
	car.classList.remove(className)
	car.classList.add(newClass)
	reloadFrog(car)	
}

function moveCarRight(car){	
	let className = car.classList[1]
	let newClass = 'c'+(Number(className[1])-1)
	if (newClass=='c0'){newClass='c3'}
	car.classList.remove(className)
	car.classList.add(newClass)	
	reloadFrog(car)
	
}

function checkCollusion(){
	let crashBlocks = document.querySelectorAll('.l4,.l5,.c1')
	crashBlocks.forEach(block=>{
		if(block.classList.contains('frog')){
			clearInterval(logsInt)
			clearInterval(carsInt)
			clearInterval(timeInt)
			document.removeEventListener('keyup', moveFrog)
			resultDisplay.innerText = 'You Lose'
			resultDisplay.style.color = 'red'
			endGame=true
		}
	})		
}

function reloadFrog(block){
	if(block.classList.contains('frog')){
		block.classList.remove('frog')
		block.classList.add('frog')
	}
}

function checkWin(){
	let winBlock = document.querySelector('.ending-block')
	if (winBlock.classList.contains('frog')){
		clearInterval(logsInt)
		clearInterval(carsInt)
		clearInterval(timeInt)
		document.removeEventListener('keyup', moveFrog)
		resultDisplay.innerText = 'You Win'
		resultDisplay.style.color = 'green'
		endGame=true
	}
}

function timePassing(){
	time--
	timeLeftDisplay.innerText = time	
	if (time==0){
		clearInterval(logsInt)
		clearInterval(carsInt)
		clearInterval(timeInt)
		document.removeEventListener('keyup', moveFrog)
		resultDisplay.innerText = 'You Lose'
		resultDisplay.style.color = 'red'
		endGame=true
	}
}

function startPause(){
	if (endGame){
		try{document.querySelector('.frog').classList.remove('frog')}
		catch(err){}
		const stratBlock = document.querySelector('.starting-block')
		stratBlock.classList.add('frog')
		resultDisplay.innerText = ''
		frogIndex=76
		lastFrogIndex=76
		logsInt = setInterval(autoMoveLogs, 1000)
		carsInt = setInterval(autoMoveCars, 800)
		timeInt = setInterval(timePassing, 1000)
		document.addEventListener('keyup',moveFrog)		
		running = true
		endGame = false
		time=20
	}else{
		if (running){
			clearInterval(logsInt)
			clearInterval(carsInt)
			clearInterval(timeInt)
			document.removeEventListener('keyup', moveFrog)
			running = false
		}else{
		logsInt = setInterval(autoMoveLogs, 1000)
		carsInt = setInterval(autoMoveCars, 800)
		timeInt = setInterval(timePassing, 1000)
		document.addEventListener('keyup',moveFrog)
		running = true
		}
	}
}

	




