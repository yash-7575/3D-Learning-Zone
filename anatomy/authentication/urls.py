from django.urls import path
from authentication import views
from authentication.views import leaderboard_brain
from .views import submit_score_kidney, leaderboard_kidney, submit_score_liver, leaderboard_liver, submit_score_lungs, leaderboard_lungs, leaderboard
urlpatterns = [
    path('register/', views.RegisterView, name='register'),
    path('login/', views.LoginView, name='login'),
    path('logout/', views.LogoutView, name='logout'),
    path('dashboard/', views.DashboardView, name='dashboard'),
    path('heart-model/', views.HeartModelView, name='heart-model'),
    path('brain-model/', views.BrainModelView, name='brain-model'),
    path('liver-model/', views.LiverModelView, name='liver-model'),
    path('kidney-model/', views.KidneyModelView, name='kidney-model'),
    path('lungs-model/', views.LungsModelView, name='lungs-model'),
    path('submit-score/', views.submit_score, name='submit_score'),
    path('leaderboard/', leaderboard, name='leaderboard'),
    path('submit_score_heart/', views.submit_score, name='submit_score_heart'),
    path('leaderboard_brain/', leaderboard_brain, name='leaderboard_brain'),
    path('brain-quiz/', views.BrainQuizView, name='brain-quiz'),
    path('heart-quiz/', views.HeartQuizView, name='heart-quiz'),
    path('liver-quiz/', views.LiverQuizView, name='liver-quiz'),
    path('kidney-quiz/', views.KidneyQuizView, name='kidney-quiz'),
    path('submit_score_kidney/', submit_score_kidney, name='submit_score_kidney'),
    path('leaderboard_kidney/', leaderboard_kidney, name='leaderboard_kidney'),
    path('submit_score_liver/', submit_score_liver, name='submit_score_liver'),
    path('leaderboard_liver/', leaderboard_liver, name='leaderboard_liver'),
    path('submit_score_lungs/', submit_score_lungs, name='submit_score_lungs'),
    path('leaderboard_lungs/', leaderboard_lungs, name='leaderboard_lungs'),
    path('lungs-quiz/', views.LungsQuizView, name='lungs-quiz'),
]