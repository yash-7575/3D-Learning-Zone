from django.shortcuts import render, redirect
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
from django.contrib import messages
from django.views.decorators.csrf import csrf_protect
from django.contrib.auth.decorators import login_required
import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import Leaderboard


def HeartModelView(request):
    return render(request, 'heart.html')
def BrainModelView(request):
    return render(request, 'brain.html')
def LiverModelView(request):
    return render(request, 'liver.html')
def KidneyModelView(request):
    return render(request, 'kidney.html')
def LungsModelView(request):
    return render(request, 'lungs.html')
def HeartQuizView(request):
    return render(request, 'hquiz.html')
def BrainQuizView(request):
    return render(request, 'brainquiz.html')

@csrf_protect
def RegisterView(request):
    if request.method == "POST":
        first_name = request.POST.get('first_name')
        last_name = request.POST.get('last_name')
        username = request.POST.get('username')
        email = request.POST.get('email')
        password = request.POST.get('password')

        user_data_has_error = False

        if User.objects.filter(username=username).exists():
            user_data_has_error = True
            messages.error(request, "Username already exists")

        if User.objects.filter(email=email).exists():
            user_data_has_error = True
            messages.error(request, "Email already exists")

        if len(password) < 5:
            user_data_has_error = True
            messages.error(request, "Password must be at least 5 characters")

        if user_data_has_error:
            return redirect('register')
        else:
            new_user = User.objects.create_user(
                first_name=first_name,
                last_name=last_name,
                email=email, 
                username=username,
                password=password
            )
            messages.success(request, "Account created. Login now")
            return redirect('login')

    return render(request, 'register.html')

@csrf_protect
def LoginView(request):
    if request.method == "POST":
        username = request.POST.get("username")
        password = request.POST.get("password")

        user = authenticate(request, username=username, password=password)

        if user is not None:
            login(request, user)
            return redirect('dashboard')
        else:
            messages.error(request, "Invalid login credentials")
            return redirect('login')

    return render(request, 'login.html')

def LogoutView(request):
    logout(request)
    return redirect('login')

@login_required
def DashboardView(request):
    return render(request, 'dashboard.html')

@csrf_exempt
@login_required
def submit_score(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        username = request.user.username
        score = data.get('score', 0)

        Leaderboard.objects.create(username=username, score=score)
        return JsonResponse({'message': 'Score saved successfully'}, status=201)

    return JsonResponse({'error': 'Invalid request'}, status=400)

def leaderboard(request):
    top_scores = Leaderboard.objects.order_by('-score', 'date')[:10]  # Top 10 users
    return render(request, 'leaderboard.html', {'top_scores': top_scores})