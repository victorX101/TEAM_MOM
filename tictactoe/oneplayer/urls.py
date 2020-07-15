from django.urls import path
from oneplayer import views

urlpatterns = [
    path('',views.home,name = 'home'),
    path('game/',views.oneplayergame,name = 'game'),
    path('two/',views.twoplayergame, name='two')

]