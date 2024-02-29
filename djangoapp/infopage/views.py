from django.shortcuts import render

def policy_view(request):
    return render(request, 'policy.html')


