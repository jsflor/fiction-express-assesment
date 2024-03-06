from lorem_text import lorem
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from drf_yasg.utils import swagger_auto_schema
from random import randint
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi

text = openapi.Parameter('text', openapi.IN_QUERY, type=openapi.TYPE_STRING)

class LoremView(APIView):
    permission_classes = [IsAuthenticated]

    @swagger_auto_schema(manual_parameters=[text]) 
    def post(self, request, *args, **kwargs):
        input_text = request.GET.get('text', '')

        # Check if the input is valid (non-empty string)
        if not input_text:
            return Response({'error': 'Please provide input text'}, status=status.HTTP_400_BAD_REQUEST)

        sentences_count = randint(1, 4)

        # Generate short sentences using lorem_text
        output = [lorem.sentence() for _ in range(sentences_count)]

        return Response({'output': output})
