

const yourChoiceLabel = document.getElementById('your-choice')
const computerChoiceLabel = document.getElementById('computer-choice')
const resultLabel = document.getElementById('result')
const allPossibleChoices = document.querySelectorAll('button')
let userChoice
let computerChoice
let result
const objects = ['Rock','Paper','Scissors']
allPossibleChoices.forEach(possibleChoice => possibleChoice.addEventListener('click', e=>{
	userChoice = e.target.id
	yourChoiceLabel.innerHTML = userChoice
	findComputerChoice()
	computerChoiceLabel.innerHTML = computerChoice
	findResult()
} ))

function findComputerChoice(){
	let computerChoiceNumber = Math.floor(Math.random()*3)
	computerChoice = objects[computerChoiceNumber]

}

function findResult(){
	if (computerChoice==userChoice){
		result = 'Draw'		
	}else{
		if ((userChoice=='Rock')&&(computerChoice=='Paper')){
			result = 'You Lose'
		}
		if ((userChoice=='Rock')&&(computerChoice=='Scissors')){
			result = 'You Win'
		}
		if ((userChoice=='Paper')&&(computerChoice=='Rock')){
			result = 'You Win'
		}
		if ((userChoice=='Paper')&&(computerChoice=='Scissors')){
			result = 'You Lose'
		}
		if ((userChoice=='Scissors')&&(computerChoice=='Paper')){
			result = 'You Win'
		}
		if ((userChoice=='Scissors')&&(computerChoice=='Rock')){
			result = 'You Lose'
		}
	}
	resultLabel.innerHTML = result
}
