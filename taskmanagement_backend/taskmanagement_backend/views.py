
from django.shortcuts import render
from django.views import View


class LoginPage(View):
    def get(self, request):
        return render(request, 'login.html')


class RegisterPage(View):
    def get(self, request):
        return render(request, 'register.html')


class TaskList(View):
    def get(self, request):
        return render(request, 'tasklist.html')


class AddTask(View):
    def get(self, request):
        return render(request, 'task_form.html')
    
    
    
class EditTask(View):
    def get(self, request):
        return render(request, 'edit_task.html')