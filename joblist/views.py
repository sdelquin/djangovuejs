from django.shortcuts import render
from .models import Job
from rest_framework import viewsets
from .serializers import JobsSerializer


def job_list(request):
    context = {}
    context["jobs"] = Job.objects.all()

    return render(request, "index.html", context)


class JobsViewSet(viewsets.ModelViewSet):
    queryset = Job.objects.all()
    serializer_class = JobsSerializer
