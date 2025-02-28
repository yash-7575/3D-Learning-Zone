# Generated by Django 5.1.5 on 2025-02-27 19:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('authentication', '0003_alter_leaderboard_username'),
    ]

    operations = [
        migrations.CreateModel(
            name='Leaderboard_kidney',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('username', models.CharField(max_length=100)),
                ('score', models.IntegerField()),
                ('date', models.DateTimeField(auto_now_add=True)),
            ],
        ),
        migrations.AlterField(
            model_name='leaderboard',
            name='username',
            field=models.CharField(max_length=100),
        ),
    ]
