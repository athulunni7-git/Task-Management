"""
URL configuration for taskmanagement_backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/6.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path,include
from .views import LoginPage, RegisterPage
from .views import TaskList 
from .views import AddTask
from .views import EditTask
from .views import TaskDetails


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/auth/', include('accounts.urls')),
    path('api/', include('task.urls')),
    
    
     path('', LoginPage.as_view(), name='login'),
    path('register/', RegisterPage.as_view(), name='register'),
    path('dashboard/', TaskList.as_view(), name='dashboard'),
    path('task-form/', AddTask.as_view(), name='task-form'),
    path('edit-task/', EditTask.as_view(), name='edit-task'),
    path('task-detail/', TaskDetails.as_view(), name='task-detail'),
]
