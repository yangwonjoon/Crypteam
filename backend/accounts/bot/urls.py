from django.urls import path, include

from .views import StartView

urlpatterns = [
    path('start_bot/', StartView.as_view()),
]