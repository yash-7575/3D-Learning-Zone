from django.db import models


class Leaderboard(models.Model):
    username = models.CharField(max_length=100)
    score = models.IntegerField()
    date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.username} - {self.score}"


class Leaderboard_brain(models.Model):
    username = models.CharField(max_length=100)
    score = models.IntegerField()
    date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.username} - {self.score}"
    
class Leaderboard_kidney(models.Model):
    username = models.CharField(max_length=100)
    score = models.IntegerField()
    date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.username} - {self.score}"
    
class Leaderboard_liver(models.Model):
    username = models.CharField(max_length=100)
    score = models.IntegerField()
    date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.username} - {self.score}"
    
class Leaderboard_lungs(models.Model):
    username = models.CharField(max_length=100)
    score = models.IntegerField()
    date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.username} - {self.score}"