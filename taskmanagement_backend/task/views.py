from rest_framework.response import Response
from .serializers import TaskSerializer
from .models import Task
from rest_framework import viewsets 
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated

# Create your views here.

class TaskView(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    serializer_class = TaskSerializer

    def get_queryset(self):
        return Task.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
        

class TaskSearchView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        tasks = Task.objects.filter(user=request.user)

        search = request.GET.get('search')
        status = request.GET.get('status')
        priority = request.GET.get('priority')

        if search:
            tasks = tasks.filter(title__icontains=search)

        if status:
            tasks = tasks.filter(status=status)

        if priority:
            tasks = tasks.filter(priority=priority)

        return Response(TaskSerializer(tasks, many=True).data)