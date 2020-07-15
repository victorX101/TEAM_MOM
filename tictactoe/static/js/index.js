var c = 0;
var dif = -1;
var board = [0,0,0,0,0,0,0,0,0];
var func = 0;
var nplayer = -1;             // Number of players
var turn = -1;				  // For two player game 

function startnew()
 {
	for(i = 1; i <= 9; i++) {
		var y = document.getElementById(i);
		y.value = "";
	}
	for(var i = 0; i < board.length; i++) {
        board[i] = 0;
    }
	nplayer = -1;
	document.getElementById("result").innerHTML = "CHOOSE SINGLE OR MULTIPLAYER";
	
	dif = -1;
	c = 0;
	func = 0;
 }

 function numplayer(id)
 {
	 if(id == 1)
	 nplayer = 1;
	 else
	 nplayer = 2;
	 document.getElementById("result").innerHTML = "CHOOSE STARTING PLAYER";
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
	if(id == 10) {
		c = 2; 																							// I start     // Player O start
	}
	else if(id == 11) {
		c = 1; 																							// Computer start  // Player X start
	}
	if(nplayer == 1)
	{
		document.getElementById("result").innerHTML = "CHOOSE DIFFICULTY LEVEL"
		func = 0;
		func++;
	}
	if(nplayer == 2)
	{
		document.getElementById("result").innerHTML = c==1?("START THE GAME PLAYER X"):("START THE GAME PLAYER O");
		turn = c;
	}
}

function difficulty(id)
{
	dif = id;
	chance();
	func++;
}

function change(xpos,ypos,id)
{
	if(nplayer == 1)
	changeone(xpos,ypos,id)											      // For Single player
	else if(nplayer == 2)
	changetwo(xpos,ypos,id)											     // For Multiplayer
}


																
function changeone(xpos,ypos,id) 										//passing the user's choice and current stats of board to view.py and updating the computer's move
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
				},
				error:function(json) {
					alert(json['val']);
				}
			});
		}
	}
}


function changetwo(xpos,ypos,id)
{
	var y = document.getElementById(id);
	var index = 3*xpos + ypos;
	if(c)
	{
		if(turn == 1) {
			if(y.value == "") {
			y.value = 'X';
			board[index] = 1;
			turn = 2;
			document.getElementById("result").innerHTML = "PLAYER O's TURN";
			}
		}
		else if(turn == 2) {
			if(y.value == ""){
			y.value = 'O';
			board[index] = 2;
			turn = 1;
			document.getElementById("result").innerHTML = "PLAYER X's TURN";
			}
		}
	}
	$.ajax({
		url : 'two/',
		type: 'POST',
		data:{"board[]":board},
		cache:false,
		success:function(json) {
			if(json['res'] == 1)
			{
				if(json['winner'] == 1)
				{
					document.getElementById("result").innerHTML = "PLAYER X WON";

				}
				else if(json['winner'] == 0)
				{
					document.getElementById("result").innerHTML = "GAME DRAW";
				}
				else if(json['winner'] == 2)
				{
					document.getElementById("result").innerHTML = "PLAYER O WON";
				}
				c = 0;
			}
		},
		error:function(json) {
			alert(json['val']);
		}
	});
}
