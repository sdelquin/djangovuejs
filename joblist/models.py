from django.db import models


class Job(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField(max_length=300)
    postdate = models.DateField(auto_now_add=True)
