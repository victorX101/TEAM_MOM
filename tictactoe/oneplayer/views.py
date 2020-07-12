from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from oneplayer.logic import *

# Logic for tic-tac-toe in logic.py 

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
		mat = tictac(a,1,2,1,0)														#  tictactoe(array, computer ,player ,turn, depth)
		xpos = mat[1]
		ypos = mat[2]                                                      			
		a[xpos][ypos] = 1
		s = valboard(a,1,2,1)	                                                     # valboard(board, computer, player ,turn)
		if(s == 10):
			return JsonResponse({'val':xpos*3+ypos,'res':1,'winner':'comp'})
		elif(checkdraw(a) == 1):
			return JsonResponse({'val':xpos*3+ypos,'res':1,'winner':'draw'})
		return JsonResponse({'val':xpos*3+ypos,'res':0,'winner':'none'})
	else:
		return JsonResponse({'val':"error"})



def home(request):
	return render(request,'index.html')



