from rest_framework import serializers
from .models import Tag

class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = [
            "id", "sentence", "tag"
        ]

    def update(self, instance, validated_data):
        instance.sentence = validated_data.get('sentence', instance.sentence)
        instance.tag = validated_data.get('tag', instance.tag)
        return instance.save()
