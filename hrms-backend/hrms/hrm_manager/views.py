from django.shortcuts import render

# Create your views here.
def login_view(request):
    if request.method == 'POST':
        # Handle login logic here
        username = request.POST.get('username')
        password = request.POST.get('password')

        # Authenticate user  
        if username == 'admin' and password == 'password':  # Simplified for example
            return render(request, 'dashboard.html')
    return render(request, 'login.html')


def dashboard_view(request):
    return render(request, 'dashboard.html')
