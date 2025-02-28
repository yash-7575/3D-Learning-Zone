import requests
from django.http import JsonResponse
from django.shortcuts import render

# Replace with your actual API key
API_KEY = "AIzaSyBq4rJvueMOi0Tr_Y4ga17CNBrSVZ2jDw8"
API_URL = f"https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key={API_KEY}"

def chatbot_view(request):
    return render(request, "chatbot/chatbot.html")

def get_gemini_response(user_message):
    headers = {"Content-Type": "application/json"}
    
    data = {
        "contents": [
            {
                "parts": [{"text": user_message}]
            }
        ]
    }
    
    try:
        response = requests.post(API_URL, headers=headers, json=data)

        # Log full response to see if Gemini API returns an error
        print("Response Status Code:", response.status_code)
        print("Response Text:", response.text)

        if response.status_code == 200:
            result = response.json()
            return result["candidates"][0]["content"]["parts"][0]["text"]
        else:
            return f"Error: {response.status_code} - {response.text}"
    
    except Exception as e:
        return f"Exception: {str(e)}"

def chatbot_api(request):
    if request.method == "POST":
        user_message = request.POST.get("message")
        if not user_message:
            return JsonResponse({"error": "Empty message"}, status=400)
        
        bot_response = get_gemini_response(user_message)
        return JsonResponse({"response": bot_response})
    
    return JsonResponse({"error": "Invalid request method"}, status=405)
