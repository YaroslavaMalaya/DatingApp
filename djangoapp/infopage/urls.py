from django.urls import path
from .views import policy_view

urlpatterns = [
    path('policy/', policy_view, name='policy'),
]
