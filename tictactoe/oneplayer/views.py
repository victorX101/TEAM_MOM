from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt


xpos = -1
ypos = -1

#Evaluating function for minimax algorithm in tic-tac-toe ( +10 if computer wins and -10 if player)

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


# Checks for draw
def checkdraw(b): 
	for i in range(3):
		for j in range(3):
			if(b[i][j] == 0):
				return 0
	return 1

 # Minimax algorithm for tic-tac toe

def tictac(b,comp,p,turn,depth):
	curr = comp
	global xpos
	global ypos
	mx = -1000
	mn = 1000
	if(turn == comp):
		curr = p
	check = valboard(b,comp,p,curr)
	if(check == 10):
		return 10 - depth
	elif(check == -10):
		return -10 + depth
	elif(checkdraw(b)):
		return 0
	if(turn == comp):
		for i in range(3):
			for j in range(3):
				if(b[i][j] == 0):
					b[i][j] = comp
					x = tictac(b,comp,p,p,depth+1)
					#print x
					if(x > mx):
						mx = x
						if(depth == 0):
							xpos = i
							ypos = j
					b[i][j] = 0
		return mx
	elif(turn == p):
		for i in range(3):
			for j in range(3):
				if(b[i][j] == 0):
					b[i][j] = p
					y = tictac(b,comp,p,comp,depth+1)
					if(y < mn):
						mn = y
						if(depth == 0):
							xpos = i
							ypos = j
					b[i][j] = 0
		return mn


@csrf_exempt
def game(request):
	if(request.method == 'POST'):
		board = request.POST.getlist('board[]')
		a = [[0 for x in range(3)] for x in range(3)]
		for i in range(3):
			for j in range(3):
				a[i][j] = int(board[3*i+j])
		s = valboard(a,1,2,2)                                                       # valboard(board, computer, player, turn)
		if(s == -10):
			return JsonResponse({'val':0,'res':1,'winner':'player'})
		elif(checkdraw(a) == 1):
			return JsonResponse({'val':0,'res':1,'winner':'draw'})
		tictac(a,1,2,1,0)                                                           #  tictactoe(array, computer ,player ,turn, depth)
		a[xpos][ypos] = 1
		s = valboard(a,1,2,1)	                                                    # valboard(board, computer, player ,turn)
		if(s == 10):
			return JsonResponse({'val':xpos*3+ypos,'res':1,'winner':'comp'})
		elif(checkdraw(a) == 1):
			return JsonResponse({'val':xpos*3+ypos,'res':1,'winner':'draw'})
		return JsonResponse({'val':xpos*3+ypos,'res':0,'winner':'none'})
	else:
		return JsonResponse({'val':"error"})



def home(request):
	return render(request,'index.html')



