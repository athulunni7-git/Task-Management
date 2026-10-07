from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny
from django.contrib.auth import authenticate
from accounts.serializers import UserSerializer

# Create your views here.


class RegisterView(APIView):
    
    permission_classes = [AllowAny]
    authentication_classes = []
    
    def post(self,request):
        
        serializer = UserSerializer(data=request.data)
        
        if serializer.is_valid():
            serializer.save()
            
            return Response(serializer.data,status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
    
    
class LoginView(APIView):
    permission_classes = [AllowAny]
    authentication_classes = []

    def post(self, request):
        user = authenticate(
            username=request.data.get('username'),
            password=request.data.get('password')
        )

        if user:
            return Response({'message': 'Login successful'},status=status.HTTP_200_OK)

        return Response(
            {'error': 'Invalid username or password'},status=status.HTTP_401_UNAUTHORIZED
           
        )