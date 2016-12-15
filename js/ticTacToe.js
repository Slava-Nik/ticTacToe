function TicTacToe(options){
	"use strict";
	var elem = options.elem;
	var isOnePlayer = false;
  var moveCounter = 0;

  var overlay = document.querySelector(".overlay");
  var resultMessage = document.querySelector(".resultMessage");
  var messageTitle = resultMessage.children[0];
  var buttonContinue = resultMessage.children[1];

  selectModeOfGame();

	function makeMove(td) {
		var sign = document.createElement("div");
		switch(moveCounter%2){
			case(0): sign.className="cross"; break;
			case(1): sign.className="zero"; break;
		}
		td.appendChild(sign);
		td.className = sign.className + "Sign";

		moveCounter++;

  }

  
  function computerMove(){
  	var sign = document.createElement("div");
  	sign.className="zero";
  	var cells = elem.querySelectorAll("td");
  	var freeCells = [];

  	for(var i = 0; i < cells.length; i++){
  		if(!cells[i].className){
				freeCells.push(cells[i]);
  		}
  	}
  	var randomCell = Math.floor(Math.random() * freeCells.length );

  	
  	freeCells[randomCell].appendChild(sign);
  	freeCells[randomCell].className = "zeroSign";

  	moveCounter++;

  }


  function defineWinner(){
  	
  	for(var i = 1; i <= 3; i++){
			var completeRow = getComplete(elem.querySelectorAll(`[row = '${i}']`));
  		var completeCol = getComplete(elem.querySelectorAll(`[col = '${i}']`));

  		if(completeRow || completeCol){
  			return completeRow || completeCol;
			}
		}
		var completeLeftDiagonal = getComplete(elem.querySelectorAll("[ld]"));
		var completeRightDiagonal = getComplete(elem.querySelectorAll("[rd]"));

		if(completeLeftDiagonal || completeRightDiagonal){
  		return completeLeftDiagonal || completeRightDiagonal;
		}

		if(moveCounter === 9) return "draw";
		
		function getComplete(list){
  		var firstClassName = list[0].className;
  		for(var i = 1; i < list.length; i++){
				if( !firstClassName || (list[i].className !== firstClassName) )   return false;
  		}
  		return firstClassName;
  	}

  }
  function selectModeOfGame(){
  	var beforeElem = document.querySelector(".beforeGame");
  	beforeElem.children[1].onclick = function(){
  		isOnePlayer = true;
  		overlay.hidden = true;
			beforeElem.hidden = true;
		};
		beforeElem.children[2].onclick = function(){
  		isOnePlayer = false;
  		overlay.hidden = true;
			beforeElem.hidden = true;
		};
		
	}

  function endTheGame(result){
  	overlay.hidden = false;
  	resultMessage.hidden = false;

  	switch(result){
  		case "cross": (function(){ 
  			messageTitle.textContent = "Победили крестики!";
  			messageTitle.style.color = "red";
			})(); break;
  		case "zero":  (function(){ 
  			messageTitle.textContent = "Победили нолики!";
  			messageTitle.style.color = "green";
			})();break;
  		case "draw": (function(){ 
  			messageTitle.textContent = "Ничья!";
  			messageTitle.style.color = "blue";
			})();break;
  	}

  	buttonContinue.onclick = function(e){
  		overlay.hidden = true;
  		resultMessage.hidden = true;
  		restartGame();
  	};
	}

 function restartGame(){
 	var cells = elem.querySelectorAll("td");
	for(var i = 0; i < cells.length; i++){
		if(cells[i].children.length){
			var sign = cells[i].firstElementChild;
			cells[i].removeChild(sign);
			cells[i].className="";
		}
 	}
 
 	moveCounter = 0;
 	elem.onclick = startGame;
 }
	
	function checkEndOfGame(){
		if(moveCounter > 4) { 
			switch( defineWinner() ){
				case "crossSign": {
					endTheGame("cross");
					elem.onclick = null;
					return true;
		      }
				case "zeroSign": {
					endTheGame("zero");
					elem.onclick = null;
					return true;
				}
				case "draw": {
					endTheGame("draw");
					elem.onclick = null;
					return true;
				}
			} 
			return false;
	 }
 }

	function startGame(event){
		var target = event.target;
		var td = target.closest("td");
		if(td.className) return;
		makeMove(target);
		if( checkEndOfGame() ) return;
		
	 if(isOnePlayer){
			computerMove();
			if( checkEndOfGame() ) return;
		}
  }


	elem.onclick = startGame;

}