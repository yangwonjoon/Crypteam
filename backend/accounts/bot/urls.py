from django.urls import path, include

from .views import *

urlpatterns = [
    path('start_bot/', BacktestingView.as_view()),
    path('AutoTrading/', AutoTradingView.as_view()),
    path('Simulate/', SimulateTradingView.as_view()),
]