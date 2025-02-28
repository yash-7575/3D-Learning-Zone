from django.urls import path
from chatbotapp.views import chatbot_view, chatbot_api

urlpatterns = [
    path("chatbot/", chatbot_view, name="chatbot"),
    path("api/chatbot/", chatbot_api, name="chatbot_api"),
]
