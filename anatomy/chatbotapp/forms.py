from django import forms

class ChatForm(forms.Form):
    user_input = forms.CharField(label='', widget=forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'Type your message...'}))
