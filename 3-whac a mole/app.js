

//-----------Model---------------

//--Define Global Varables--

let result = 0
let hitPosition = null
let currentTime
let running = false
let moves = 0
//const rows 
//const columns

//const squares = document.querySelectorAll('.square');
const mole = document.querySelector('.mole')
const timeleft = document.querySelector('#time-left')
const scote = document.querySelector('#score')
const grid = document.querySelector('.grid')
let squares = []




function randomSquare(){
	moves++
	squares.forEach(square => {
		square.classList.remove('mole')
		square.innerHTML = ''
		square.style.backgroundColor = null } )
	let randomSquare =squares[Math.floor(Math.random()*rows*columns)] 	
	randomSquare.classList.add('mole')
	randomSquare.innerHTML = "<img src='mole.png'>"
	hitPosition = randomSquare.id
}

function makeSquares(){
	
	let squareElement
	for (i=0;i<rows*columns;i++){
		let squareElement = document.createElement('div')
		squareElement.classList = 'square'
		squareElement.id = i
		squareHeight = Math.floor((grid.clientHeight-2*rows)/rows)
		squareWidth = Math.floor((grid.clientWidth-2*columns)/columns)
		squareElement.style.height = (Math.floor(100/columns))+'%'		
		squareElement.style.width = (Math.floor(100/rows)-1)+'%'
		grid.appendChild(squareElement)
		squares.push(squareElement)


	}
	squares.forEach(square=>{
		square.addEventListener('mousedown',()=>{
			if (square.id == hitPosition){
				result++
				score.textContent = result
				hitPosition = null
				square.style.backgroundColor = 'red'		}

		})

	})
}
function countdown(){
	currentTime--
	timeleft.textContent = currentTime

	if (currentTime==0){
		clearInterval(timerId)
		clearInterval(movingSquares)
		running=false
		alert('GAME OVER! Your final score is '+result +' / '+moves)
		moves=0
		gameover()

	}
}

function gameover(){
	grid.innerHTML = ''
	squares = []
	result = 0

}



function main(){
	makeSquares()	
	movingSquares = setInterval(randomSquare,escapeTime)
	timerId = setInterval(countdown, 1000)
}

function start(){
	rows = Number(document.getElementsByName('rows')[0].value)
	columns = Number(document.getElementsByName('columns')[0].value)
	escapeTime = Number(document.getElementsByName('escape')[0].value)
	currentTime = Number(document.getElementsByName('TotalTime')[0].value)
	
	if (!((isNaN(rows))||(isNaN(columns))||(isNaN(escapeTime))||(isNaN(currentTime))||(running))){
		running=true
		escapeTime = escapeTime*1000
		main()
		document.getElementsByName('rows')[0].value=''
		document.getElementsByName('columns')[0].value=''
		document.getElementsByName('escape')[0].value=''
		document.getElementsByName('TotalTime')[0].value=''
	}else{
		console.log('false')
	}
}
