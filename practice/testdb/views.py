import json
from django.contrib import messages, admin
from django.contrib.auth import authenticate, login
from django.contrib.auth.models import User
from django.shortcuts import redirect, render, get_object_or_404
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt, ensure_csrf_cookie
from django.views.decorators.http import require_POST

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import status 

from .models import New
from django.core.paginator import Paginator

# Create your views here.

def home(request):
    return render (request, 'home.html')


class LoginView (APIView): 
    def post(self, request): 
        username = request.data.get('username')
        password = request.data.get('password')
        user= authenticate(username=username, password=password)

        if user is not None: 
            refresh = RefreshToken.for_user(user)
            return Response ({
                'refresh': str(refresh), 
                'access': str(refresh.access_token), 
            })
        return Response({'error': 'Invalid Credentials'}, status=status.HTTP_401_UNAUTHORIZED)

# @require_POST
# def login_view(request):
#     if request.method == 'POST':
#         username = request.POST.get('username')
#         password = request.POST.get('password')

#         user = authenticate(request, username=username, password=password)

#         if user is not None:
#             login(request, user)
#             return JsonResponse({'message': 'Login successful'})
#         else:
#             return JsonResponse({'error': 'Invalid username or password'}, status=400)

#     return JsonResponse({'error': 'Method not allowed'}, status=405)


@csrf_exempt
def signup_view(request):
    if request.method == "POST":
        data = json.loads(request.body)
        username = data.get('username')
        email = data.get('email')
        password = data.get('password')

        if User.objects.filter(username=username).exists():
            return JsonResponse({"error": "Username already taken"}, status=400)
        if User.objects.filter(email=email).exists():
            return JsonResponse({"error": "Email already registered"}, status=400)

        user = User.objects.create_user(username=username, email=email, password=password)
        login(request, user)
        return JsonResponse({"message": "Signup successful"}, status=201)
    
    return JsonResponse({"error": "Method Not Allowed"}, status=405)


@csrf_exempt
def delete_product(request, id): 
    obj= get_object_or_404(New, id=id)

    response = f"object {id} was deleted"
    if request.method == "POST":
        obj.delete()
        return JsonResponse({"message":response})
    
    return JsonResponse({"message": "does not exist"})

@csrf_exempt
def add_product (request): 
    if request.method == 'POST': 
        name = request.POST.get('name')
        price = request.POST.get('price')
        highlights = request.POST.get('highlights')
        image_url = request.POST.get('image_url')


        product= New.objects.create(
            name=name,
            price=price, 
            highlights = highlights, 
            image_url= image_url, 
        )
        return JsonResponse({"message": "new item added"})
    return JsonResponse({"message": "failed to add item"})


def get_products(request):
    all_products = New.objects.all().values("id", "name", "highlights", "image_url", "price")
    items_per_page = 15
    
    paginator = Paginator(all_products, items_per_page)
    page_number = request.GET.get('page', 1)

    products_on_page = paginator.get_page(page_number)
    serialized_products = list(products_on_page)
    return JsonResponse({"products": serialized_products})

