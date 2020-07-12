
# Logic for Tic-tac-toe game ---- TEAM MOM 
# valboard is our evaluating function for minimax algorithm in tic-tac-toe ( It returns +10 if computer wins and -10 if player)
# tictac is our minimax function which checks each case in the tree and give us the must optimal choice , it 
# returns a tuple having xpos and ypos (position coordinate of most optimal choice)





xpos = -1
ypos = -1
def valboard(b,comp,p,turn): #checks if a player has won or not
	flag = 0
	for i in range(3):
		count = 0
		for j in range(3):
			if(b[i][j] == turn):
				count = count+1
		if(count == 3):
			flag = 1

	for i in range(3):
		count = 0
		for j in range(3):
			if(b[j][i] == turn):
				count = count+1
		if(count == 3):
			flag = 1

	if(b[0][0] == turn and b[1][1] == turn and b[2][2] == turn):
		flag = 1
	if(b[0][2] == turn and b[1][1] == turn and b[2][0] == turn):
		flag = 1
	if(flag == 1):
		if(turn == comp):
			return 10
		else:
			return -10
	return 0





def checkdraw(b): 
	for i in range(3):
		for j in range(3):
			if(b[i][j] == 0):
				return 0
	return 1



def tictac(b,comp,p,turn,depth):        # Minimax algorithm for tic-tac toe
	curr = comp
	global xpos
	global ypos
	mx = -1000
	mn = 1000
	if(turn == comp):
		curr = p
	check = valboard(b,comp,p,curr)
	if(check == 10):
		return 10 - depth,xpos,ypos
	elif(check == -10):
		return -10 + depth,xpos,ypos
	elif(checkdraw(b)):
		return 0,xpos,ypos
	if(turn == comp):
		for i in range(3):
			for j in range(3):
				if(b[i][j] == 0):
					b[i][j] = comp
					x = tictac(b,comp,p,p,depth+1)[0]
					#print x
					if(x > mx):
						mx = x
						if(depth == 0):
							xpos = i
							ypos = j
					b[i][j] = 0
		return mx,xpos,ypos
	elif(turn == p):
		for i in range(3):
			for j in range(3):
				if(b[i][j] == 0):
					b[i][j] = p
					y = tictac(b,comp,p,comp,depth+1)[0]
					if(y < mn):
						mn = y
						if(depth == 0):
							xpos = i
							ypos = j
					b[i][j] = 0
		return mn,xpos,ypos
