var c = 0;
var dif = -1;
var board = [0,0,0,0,0,0,0,0,0];
var func = 0;



function startnew()
 {
	for(i = 1; i <= 9; i++) {
		var y = document.getElementById(i);
		y.value = "";
	} 
	document.getElementById("result").innerHTML = "CHOOSE STARTING PLAYER";
	dif = -1;
	c = 0;
	func = 0;
 }



function chance() 																					//passing the first player information to view
{	
    for(var i = 0; i < board.length; i++) {
        board[i] = 0;
    }
    if(c == 1) {
		document.getElementById("result").style.color = "white";
        var x = Math.floor(Math.random() * 9);
        board[x] = 1;
        document.getElementById(x+1).value = 'X';
    }
    else {
		document.getElementById("result").innerHTML = "START THE GAME";
		document.getElementById("result").style.color = "black"
	}
	func++;
}

function chanced(id)
{
	for(var i = 1; i <= 9; i++) {
		var y = document.getElementById(i);
		y.value = "";
	} 
	document.getElementById("result").innerHTML = "CHOOSE DIFFICULTY LEVEL"
	if(id == 10) {
		c = 2; 																							// I start
	}
	else {
		c = 1; 																							// Computer start
	}
	func = 0;
	func++;
}

function difficulty(id)
{
	dif = id;
	chance();
	func++;
}


																
function change(xpos,ypos,id) 										//passing the user's choice and current stats of board to view.py and updating the computer's move
{   
	if(func==3)
	{
		var y = document.getElementById(id);
		var index = 3*parseInt(xpos)+parseInt(ypos);
		if(c == 1) {
			if(y.value == "") {
			y.value = '0';
			board[index] = 2;
			}
		}
		else if(c == 2) {
			if(y.value == ""){
			y.value = 'X';
			board[index] = 2;
			}
		}
		if(c) {																// c is used to check that if result has come clicking on any box doesn't effect the box.
			document.getElementById("result").style.color = "white";
			var t;
			$.ajax({
				url:"game/",
				type:"POST",
				data:{"board[]":board,"diff":dif},
				cache:false,
				success:function(json) {
					if(c == 1) 
					t = 'X';
					else
					t = 'O'
					if(json['res'] == 1) 
					{
							if(json['winner'] == 'comp') {
								y = document.getElementById(json['val']+1);
								y.value = t;
								document.getElementById("result").innerHTML = "YOU LOST";
							}
							else if(json['winner'] == 'player') {
								document.getElementById("result").innerHTML = "YOU WON";
							}
							else {
								y = document.getElementById(json['val']+1);
								y.value = t;

								document.getElementById("result").innerHTML = "GAME DRAW";
							}
							c = 0;
							document.getElementById("result").style.color = "black"
						}
						else {
							y1 = document.getElementById(json['val']+1);
							board[parseInt(json[['val']])] = 1;
							y1.value = t;
						}
					
					// else {
					// 	if(json['res'] == 1) {
					// 		if(json['winner'] == 'comp') {
					// 			y = document.getElementById(json['val']+1);
					// 			y.value = 'O';
					// 			document.getElementById("result").innerHTML = "YOU LOST";
					// 		}
					// 		else if(json['winner'] == 'player') {
					// 			document.getElementById("result").innerHTML = "YOU WON";
					// 		}
					// 		else {
					// 			document.getElementById("result").innerHTML = "GAME DRAW";
					// 		}
					// 		c = 0;
					// 		document.getElementById("result").style.color = "black"
					// 	}
					// 	else {
					// 		y1 = document.getElementById(json['val']+1);
					// 		y1.value = 'O';
					//         board[parseInt(json[['val']])] = 1;
					// 	}
					// }
				},
				error:function(json) {
					alert(json['val']);
				}
			});
		}
	}
}
