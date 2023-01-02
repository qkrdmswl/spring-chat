from django.shortcuts import render
from django.views.generic import ListView
from rest_framework.generics import CreateAPIView, UpdateAPIView, DestroyAPIView
from rest_framework import generics
from .models import Tag
from .serializers import TagSerializer
import nltk
from nltk.sentiment.vader import SentimentIntensityAnalyzer

# Create your views here.
class CreateTagView(CreateAPIView):
    model = Tag
    serializer_class = TagSerializer

    def perform_create(self, serializer):
        sentence = self.request.data.get("sentence", None)
        result = SentimentIntensityAnalyzer().polarity_scores(sentence)
        print(result)
        print(max(result, key=result.get))
        serializer.save(
            tag=max(result, key=result.get)
        )


class UpdateTagView(UpdateAPIView):
    queryset = Tag.objects.all()
    serializer_class = TagSerializer
    lookup_field = 'pk'

class DeleteTagView(DestroyAPIView):
    queryset = Tag.objects.all()
    serializer_class = TagSerializer
    lookup_field = 'pk'


class TagListView(ListView):
    serializer_class = TagSerializer

    def get_queryset(self):
        return Tag.objects.order_by('created_at')