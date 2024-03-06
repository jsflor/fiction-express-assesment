from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from blog.models import BlogPost
from blog.serializers import BlogPostSerializer  # You need to create a serializer for the BlogPost model

class BlogPostViewSet(viewsets.ModelViewSet):
    queryset = BlogPost.objects.all()
    serializer_class = BlogPostSerializer
    permission_classes = [IsAuthenticated]

    def destroy(self, request, *args, **kwargs):
        # Override the destroy method to add custom logic
        instance = self.get_object()

        # Check if the user has the required permission (admin)
        if not request.user.is_superuser:
            return Response({"detail": "You do not have permission to perform this action."}, status=status.HTTP_403_FORBIDDEN)

        # Perform the actual deletion
        instance.delete()

        return Response(status=status.HTTP_204_NO_CONTENT)

        
    def update(self, request, *args, **kwargs):
        instance = self.get_object()

        # Check if the user is staff or the author of the blog post
        if request.user.is_staff or request.user == instance.author:
            serializer = self.get_serializer(instance, data=request.data, partial=False)
            serializer.is_valid(raise_exception=True)
            self.perform_update(serializer)
            return Response(serializer.data)
        else:
            return Response({"detail": "Permission denied."}, status=status.HTTP_403_FORBIDDEN)
        
    def partial_update(self, request, *args, **kwargs):
        instance = self.get_object()

        # Check if the user is staff or the author of the blog post
        if request.user.is_staff or request.user == instance.author:
            serializer = self.get_serializer(instance, data=request.data, partial=True)
            serializer.is_valid(raise_exception=True)
            self.perform_update(serializer)
            return Response(serializer.data)
        else:
            return Response({"detail": "Permission denied."}, status=status.HTTP_403_FORBIDDEN)
        
    def perform_create(self, serializer):
        # Automatically set the author to the user making the request
        serializer.save(author=self.request.user)

