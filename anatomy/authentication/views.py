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
from authentication.models import Leaderboard_brain
from .models import Leaderboard_kidney
from .models import Leaderboard_liver
from .models import Leaderboard_lungs

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
    return render(request, 'heartquiz.html')
def BrainQuizView(request):
    return render(request, 'brainquiz.html')

def HeartQuizView(request):
    return render(request, 'heartquiz.html')

def LiverQuizView(request):
    return render(request, 'liverquiz.html')

def KidneyQuizView(request):
    return render(request, 'kidneyquiz.html')

def LungsQuizView(request):
    return render(request, 'lungsquiz.html')

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
        try:
            data = json.loads(request.body)
            username = request.user.username
            score = data.get('score', 0)

            print(f"Received score: {username} - {score}")  # Debugging print

            # Ensure score is a valid integer
            if not isinstance(score, int):
                return JsonResponse({'error': 'Invalid score format'}, status=400)

            # Save to database
            new_entry = Leaderboard.objects.create(username=username, score=score)
            print(f"Saved score: {new_entry}")  # Debugging print

            return JsonResponse({'message': 'Score saved successfully'}, status=201)
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON'}, status=400)
        except Exception as e:
            print("Error:", e)  # Debugging print
            return JsonResponse({'error': str(e)}, status=500)

    return JsonResponse({'error': 'Invalid request'}, status=400)


@login_required
def leaderboard(request):
    current_user = request.user.username  # Get the logged-in user's username

    # Get the logged-in user's score from the Leaderboard_liver model
    user_score = Leaderboard.objects.filter(username=current_user).first()

    # Get the top 10 scores for the leaderboard
    top_scores = Leaderboard.objects.order_by('-score')[:10]

    print("Top Scores:", top_scores)  # Debugging line
    print("User Score:", user_score)  # Debugging line

    return render(request, 'leaderboard_liver.html', {
        "user_score": user_score,
        "top_scores": top_scores
    })

@csrf_exempt
@login_required
def submit_score(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        username = request.user.username
        score = data.get('score', 0)

        Leaderboard_brain.objects.create(username=username, score=score)
        return JsonResponse({'message': 'Score saved successfully'}, status=201)

    return JsonResponse({'error': 'Invalid request'}, status=400)

@login_required
def leaderboard_brain(request):
    current_user = request.user.username  # ✅ Get the logged-in user's username

    # ✅ Get the logged-in user's score from the Leaderboard_brain model
    user_score = Leaderboard_brain.objects.filter(username=current_user).first()

    # ✅ Get the top 10 scores for the leaderboard
    top_scores = Leaderboard_brain.objects.order_by('-score')[:10]

    return render(request, 'leaderboard_brain.html', {
        "user_score": user_score,
        "top_scores": top_scores
    }) 

@csrf_exempt
@login_required
def submit_score_kidney(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            username = request.user.username
            score = data.get('score', 0)

            print(f"Received score: {username} - {score}")  # Debugging print

            # Ensure score is a valid integer
            if not isinstance(score, int):
                return JsonResponse({'error': 'Invalid score format'}, status=400)

            # Save to database
            new_entry = Leaderboard_kidney.objects.create(username=username, score=score)
            print(f"Saved score: {new_entry}")  # Debugging print

            return JsonResponse({'message': 'Score saved successfully'}, status=201)
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON'}, status=400)
        except Exception as e:
            print("Error:", e)  # Debugging print
            return JsonResponse({'error': str(e)}, status=500)

    return JsonResponse({'error': 'Invalid request'}, status=400)


@login_required
def leaderboard_kidney(request):
    current_user = request.user.username  # Get the logged-in user's username

    # Get the logged-in user's score from the Leaderboard_kidney model
    user_score = Leaderboard_kidney.objects.filter(username=current_user).first()

    # Get the top 10 scores for the leaderboard
    top_scores = Leaderboard_kidney.objects.order_by('-score')[:10]

    print("Top Scores:", top_scores)  # Debugging line
    print("User Score:", user_score)  # Debugging line

    return render(request, 'leaderboard_kidney.html', {
        "user_score": user_score,
        "top_scores": top_scores
    })



@csrf_exempt
@login_required
def submit_score_liver(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            username = request.user.username
            score = data.get('score', 0)

            print(f"Received score: {username} - {score}")  # Debugging print

            # Ensure score is a valid integer
            if not isinstance(score, int):
                return JsonResponse({'error': 'Invalid score format'}, status=400)

            # Save to database
            new_entry = Leaderboard_liver.objects.create(username=username, score=score)
            print(f"Saved score: {new_entry}")  # Debugging print

            return JsonResponse({'message': 'Score saved successfully'}, status=201)
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON'}, status=400)
        except Exception as e:
            print("Error:", e)  # Debugging print
            return JsonResponse({'error': str(e)}, status=500)

    return JsonResponse({'error': 'Invalid request'}, status=400)


@login_required
def leaderboard_liver(request):
    current_user = request.user.username  # Get the logged-in user's username

    # Get the logged-in user's score from the Leaderboard_liver model
    user_score = Leaderboard_liver.objects.filter(username=current_user).first()

    # Get the top 10 scores for the leaderboard
    top_scores = Leaderboard_liver.objects.order_by('-score')[:10]

    print("Top Scores:", top_scores)  # Debugging line
    print("User Score:", user_score)  # Debugging line

    return render(request, 'leaderboard_liver.html', {
        "user_score": user_score,
        "top_scores": top_scores
    })

@csrf_exempt
@login_required
def submit_score_lungs(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            username = request.user.username
            score = data.get('score', 0)

            print(f"Received score: {username} - {score}")  # Debugging print

            # Ensure score is a valid integer
            if not isinstance(score, int):
                return JsonResponse({'error': 'Invalid score format'}, status=400)

            # Save to database
            new_entry = Leaderboard_lungs.objects.create(username=username, score=score)
            print(f"Saved score: {new_entry}")  # Debugging print

            return JsonResponse({'message': 'Score saved successfully'}, status=201)
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON'}, status=400)
        except Exception as e:
            print("Error:", e)  # Debugging print
            return JsonResponse({'error': str(e)}, status=500)

    return JsonResponse({'error': 'Invalid request'}, status=400)


@login_required
def leaderboard_lungs(request):
    try:
        current_user = request.user.username  # Get the logged-in user's username

        # Get the logged-in user's score from the Leaderboard_lungs model
        user_score = Leaderboard_lungs.objects.filter(username=current_user).first()

        # Get the top 10 scores for the leaderboard
        top_scores = Leaderboard_lungs.objects.order_by('-score')[:10]

        print("Top Scores:", top_scores)  # Debugging line
        print("User Score:", user_score)  # Debugging line

        return render(request, 'leaderboard_liver.html', {
            "user_score": user_score,
            "top_scores": top_scores
        })
    except Exception as e:
        print("Error:", e)
        return JsonResponse({'error': str(e)}, status=500)