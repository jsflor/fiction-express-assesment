from rest_framework import serializers
from blog.models import BlogPost

class BlogPostSerializer(serializers.ModelSerializer):

    author_username = serializers.StringRelatedField(source='author.username', read_only=True)
    class Meta:
        model = BlogPost
        fields = ["id","title", "content", "author_username"]
