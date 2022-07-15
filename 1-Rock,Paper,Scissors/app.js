

//M
const objects = ['Rock','Paper','Scissors']



function computerChoice(yourChoiceNumber){
	const computerNumber = Math.floor(Math.random()*objects.length)
	showComputerChoice(computerNumber)
	findResult(yourChoiceNumber,computerNumber)

}

function findResult(yn,cn){
	let result=''
	console.log(yn,cn)
	if (yn==cn){
			result = 'Draw'	;			
	}else if (yn==0){
		if (cn==1){
			result='You Lose'
		}else if (cn==2){
			result = 'You Win'
		}
	}else if (yn==1){
		if (cn==0){
			result='You Win'
		}else if (cn==2){
			result = 'You Lose'
		}
	}else if (yn==2){
		if (cn==0){
			result='You Lose'
		}else if (cn==1){
			result = 'You Win'
		}
	}
	console.log(result)
	showResult(result)

}



//V

function showMyChoice(n){
	document.getElementById('your-choice').innerText = objects[n]
	
}

function showComputerChoice(n){
	document.getElementById('computer-choice').innerText = objects[n]

}

function showResult(res){
	document.getElementById('result-box').innerText = res
}




//C

function rock(event){		
	showMyChoice(0)
	computerChoice(0)

}

function paper(event){
	yourChoiceNumber = 1	
	showMyChoice(1)
	computerChoice(1)

}

function scissors(event){
	yourChoiceNumber = 2	
	showMyChoice(2)
	computerChoice(2)

}