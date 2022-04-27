from django.urls import path
from .views import *

urlpatterns = [
   path('',homepage),
   path('view/',view),
   path('create/',create),
   path('detail/<str:pk>/',detail),
    path('edit/<str:pk>/',edit),
     path('delete/<str:pk>/',delete),
]