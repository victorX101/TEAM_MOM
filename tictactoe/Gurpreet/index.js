var c = 0;
var board = [0,0,0,0,0,0,0,0,0];



$( "#single" ).click(function() {
  $( "#l2" ).toggle( 400 );
});
$( "#double" ).click(function() {
  $( "#l5" ).toggle( 400 );
});

/*
arrayId=['101','102','103','104','120'];
arrayId.forEach(function(){
  $( this ).click(function() {
  $( "#l3" ).toggle( 400 );
  });
});
*/

$( "#101" ).click(function() {
  $( "#l3" ).toggle( 400 );
});
$( "#102" ).click(function() {
  $( "#l3" ).toggle( 400 );
});
$( "#103" ).click(function() {
  $( "#l3" ).toggle( 400 );
});
$( "#104" ).click(function() {
  $( "#l3" ).toggle( 400 );
});
$( "#120" ).click(function() {
  $( "#l3" ).toggle( 400 );
});
$( "#bl5" ).click(function() {
  $( "#l4" ).toggle( 400 );
});

/*
function showDivsL3() {
   document.getElementById('l3').style.display = "block";
}
function showDivsL4() {
   document.getElementById('l4').style.display = "block";
}
function showDivsL5() {
   document.getElementById('l5').style.display = "block";
}
*/

function displayNames(){
	var x=document.getElementById("pname").value;
	var y=document.getElementById("pnamep").value;
	document.getElementById("111").value = x+" starts";
	document.getElementById("112").value = y+" starts";
}



 function startnew()
 {
	for(i = 1; i <= 9; i++) {
		var y = document.getElementById(i);
		y.value = "";
	} 
	document.getElementById("result").innerHTML = "CHOOSE STARTING PLAYER";
 }

function chance(id) //passing the first player information to view
{	
	if(id == 10) {
		c = 2; // I start
	}
	else {
		c = 1; // Comp start
	}
	var i;
    //document.getElementById("result").innerHTML = "";
	for(i = 1; i <= 9; i++) {
		var y = document.getElementById(i);
		y.value = "";
	}
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
}
//passing the user's choice and current stats of board or move to view and updating the computer's move
function change(xpos,ypos,id) 
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
    if(c) {			// c is used to check here that if result has come clicking on any box doesn't effect the box.
        document.getElementById("result").style.color = "white";
        $.ajax({
            url:"game/",
            type:"POST",
            data:{"board[]":board},
            cache:false,
            success:function(json) {
            	if(c == 1) {
            		if(json['res'] == 1) {
            			if(json['winner'] == 'comp') {
            				y = document.getElementById(json['val']+1);
            				y.value = 'X';
            				document.getElementById("result").innerHTML = "YOU LOST";
            			}
            			else if(json['winner'] == 'player') {
            				document.getElementById("result").innerHTML = "YOU WON";
            			}
            			else {
            				y = document.getElementById(json['val']+1);
            				y.value = 'X';

            				document.getElementById("result").innerHTML = "GAME DRAW";
            			}
						c = 0;
						document.getElementById("result").style.color = "black"
            		}
            		else {
            			y1 = document.getElementById(json['val']+1);
                        board[parseInt(json[['val']])] = 1;
            			y1.value = 'X';
            		}
            	}
            	else {
            		if(json['res'] == 1) {
            			if(json['winner'] == 'comp') {
            				y = document.getElementById(json['val']+1);
            				y.value = 'O';
            				document.getElementById("result").innerHTML = "YOU LOST";
            			}
            			else if(json['winner'] == 'player') {
            				document.getElementById("result").innerHTML = "YOU WON";
            			}
            			else {
            				document.getElementById("result").innerHTML = "GAME DRAW";
            			}
						c = 0;
						document.getElementById("result").style.color = "black"
            		}
            		else {
            			y1 = document.getElementById(json['val']+1);
            			y1.value = 'O';
                        board[parseInt(json[['val']])] = 1;
            		}
            	}
            },
            error:function(json) {
                alert(json['val']);
            }
        });
    }
}