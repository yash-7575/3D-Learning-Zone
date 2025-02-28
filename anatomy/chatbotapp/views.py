import cohere
from django.http import JsonResponse
from django.shortcuts import render

# Replace with your actual Cohere API key
API_KEY = "zSKsi6h3aDNC6E2pb4JNY5EGnOh06h52sxLNwdle"
co = cohere.Client(API_KEY)

def chatbot_view(request):
    return render(request, "chatbot/chatbot.html")

def get_cohere_response(user_message):
    try:
        response = co.chat(
            message=user_message, 
            model="command-r-plus",  # You can also use "command-r"
            temperature=0.7
        )

        # Log full response for debugging
        print("Response:", response)

        return response.text  # Extract chatbot reply
    except Exception as e:
        return f"Exception: {str(e)}"

def chatbot_api(request):
    if request.method == "POST":
        user_message = request.POST.get("message")
        if not user_message:
            return JsonResponse({"error": "Empty message"}, status=400)
        
        bot_response = get_cohere_response(user_message)
        return JsonResponse({"response": bot_response})
    
    return JsonResponse({"error": "Invalid request method"}, status=405)
