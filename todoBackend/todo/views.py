from pickle import GET
from django.shortcuts import render

from django.http import HttpResponse
from . models import todo

from rest_framework.decorators import api_view
from rest_framework.response import Response

from .serializers import todoSerializer
from todo import serializers

# Create your views here.
@api_view(['GET'])
def homepage(request):
    mylist={
        'view':'/view/',
        'create':'/create/',
        'delete':'/delete/<pk:str>/',
        'edit':'/edit/<pk:str>/',
        'detail view':'/detail/<pk:str>/',
    }
    return Response(mylist)


@api_view(['GET'])
def view(requset):
    alltodo=todo.objects.all()

    serializedTodo=todoSerializer(alltodo,many=True)
    ##print(serializedTodo)
    return Response(serializedTodo.data)

@api_view(['GET'])
def detail(request,pk):
    mytodo=todo.objects.get(id=pk)
    serializedTodo=todoSerializer(mytodo,many=False)
    print(serializedTodo)
    return Response(serializedTodo.data)


@api_view(['POST'])
def create(reqeust):
    serializedTodo=todoSerializer(data=reqeust.data)

    if serializedTodo.is_valid():
        serializedTodo.save()
    
    return Response(serializedTodo.data)

@api_view(['GET','POST'])
def edit(request,pk):
    mytodo=todo.objects.get(id=pk)
    serializedTodo=todoSerializer(instance=mytodo,data=request.data)
    if serializedTodo.is_valid():
        serializedTodo.save()
    
    return Response(serializedTodo.data)

@api_view(['GET','DELETE'])
def delete(request,pk):
    mytodo=todo.objects.get(id=pk)
    mytodo.delete()
    return Response("Item successfully deleted")

