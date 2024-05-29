from django.shortcuts import render
from django.http import JsonResponse
from .forms import TeacherForm


# Create your views here.

def teacher_view(request):
    context = {}

    form = TeacherForm(request.POST or None, request.FILES or None)

    if form.is_valid():
        form.save()

    context['form'] = form

    return render(request, context)
