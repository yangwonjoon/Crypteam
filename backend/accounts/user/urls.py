from django.urls import path, include

from .views import DataView

urlpatterns = [
    path('data/', DataView.as_view()),
]