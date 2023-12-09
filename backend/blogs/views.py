from django.shortcuts import get_object_or_404
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.permissions import BasePermission
from .serializers import BlogSerializer
from .models import Blog
from accounts.models import Shelter

class BlogListCreatePermission(BasePermission):
    def has_permission(self, request, view):
        if not request.user.is_authenticated:
            return False
        
        # GET method by any authenticated user is allowed
        if request.method in ["GET"]:
            return True

        return hasattr(request.user, 'shelter')

class BlogListCreateView(ListCreateAPIView):
    serializer_class = BlogSerializer
    permission_classes = [BlogListCreatePermission]
    queryset = Blog.objects.all()
    
    def perform_create(self, serializer):
        author = get_object_or_404(Shelter, id=self.request.user.id)
        serializer.validated_data['author'] = author
        serializer.save()
        return serializer

class BlogRetrieveUpdatePermission(BasePermission):
    def has_permission(self, request, view):
        if not request.user.is_authenticated:
            return False
        
        # GET method by any authenticated user is allowed
        if request.method in ["GET"]:
            return True

        blog = get_object_or_404(Blog, id=view.kwargs['pk'])
        return request.user.id == blog.author.id

class BlogRetrieveUpdateDestroyView(RetrieveUpdateDestroyAPIView):
    serializer_class = BlogSerializer
    permission_classes = [BlogRetrieveUpdatePermission]

    def get_object(self):
        return get_object_or_404(Blog, id=self.kwargs['pk'])
