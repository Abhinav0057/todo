
from django.contrib import admin
from .models import todo
# Register your models here.
#register our todo model here>

class todoAdmin(admin.ModelAdmin):
    list_display=('title','description','completed')

#register our model with what we want to seee in the admin panel by todoAdmin class

admin.site.register(todo,todoAdmin)