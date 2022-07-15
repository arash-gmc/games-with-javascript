document.addEventListener('DOMContentLoaded',()=>{

const grid = document.querySelector('.grid')
const currentPlayerDisplay = document.getElementById('current-player')
const resultDisplay = document.getElementById('result')
let currentPlayer = 1
let colors=['red','blue']
let symbol = document.getElementById('token-symbol')
let holes= []


function initGame(){
	for (let i=0;i<49;i++){		
		let newSquare = document.createElement('div')
		if (42<=i){
			newSquare.classList.add('taken','virtual')}
		grid.appendChild(newSquare)
		holes.push(newSquare)

	}

	for (let i=0;i<42;i++){
		holes[i].onclick= ()=>{
			if ((holes[i+7].classList.contains('taken'))&&(!(holes[i].classList.contains('taken')))){
				holes[i].classList.add('taken')
				holes[i].classList.add('player'+currentPlayer)
				switchPlayer()
				checkWin()

			}
		}
	}
	
	
}

function switchPlayer(){
	if(currentPlayer==1){
		currentPlayer=2
		symbol.style.backgroundColor = 'blue'
	}else if (currentPlayer==2){
		currentPlayer=1
		symbol.style.backgroundColor = 'red'
	}
	currentPlayerDisplay.innerText = 'Now Player '+ currentPlayer + ' is playing.'

}



function checkWin(){

	for (let i=0 ; i<42 ; i++){
		let conditions = [(i%7<=3),(i<=20),((i<=20)&&(i%7<=3)),((i<=20)&&(i%7>=3))]
		m=[1,7,8,6]
		for(let j=0;j<4;j++)
			if (conditions[j]){
				if (holes[i].classList.contains('taken')&&
					holes[i+m[j]].classList.contains('taken')&&
					holes[i+2*m[j]].classList.contains('taken')&&
					holes[i+3*m[j]].classList.contains('taken'))
						{if(holes[i].classList[1]==holes[i+m[j]].classList[1]){
							if (holes[i+m[j]].classList[1]==holes[i+2*m[j]].classList[1]){
								if(holes[i+2*m[j]].classList[1]==holes[i+3*m[j]].classList[1]){
									result.innerText = holes[i].classList[1]+' is winner.'
									holes.forEach(hole=>hole.onclick=()=>{})

								}

							}
						}
				}
			}
	}
}



initGame()


})