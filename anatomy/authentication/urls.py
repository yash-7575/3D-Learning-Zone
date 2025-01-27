from django.urls import path
from authentication import views

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
    path('heart-quiz/', views.HeartQuizView, name='heart-quiz'),
]