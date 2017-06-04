from .models import Job
from rest_framework import serializers


class JobsSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Job
        fields = ("id", "title", "description", "postdate")
