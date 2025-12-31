
from django.shortcuts import render, redirect
from django.contrib import messages
from django.contrib.auth import get_user_model
from django.contrib.auth import authenticate, login

# Create your views here.
def login_view(request): 
    if request.method == "POST":
        username = request.POST.get("username")
        password = request.POST.get("password")
        


        user = authenticate(request, username=username, password=password)

        if user is not None:
            login(request, user)
            return redirect("dashboard")  # change to your dashboard URL
        else:
            messages.error(request, "Invalid username or password.")
    return render(request, 'login.html')

User = get_user_model()

def signup_view (request):
    if request.method == "POST":
        full_name = request.POST.get("full_name")
        email = request.POST.get("email")
        username = request.POST.get("username")
        password = request.POST.get("password")
        confirm_password = request.POST.get("confirm_password")

        # Basic validation
        if password != confirm_password:
            messages.error(request, "Passwords do not match.")
            return redirect("signup")

        if len(password) < 8:
            messages.error(request, "Password must be at least 8 characters long.")
            return redirect("signup")

        if User.objects.filter(username=username).exists():
            messages.error(request, "Username already exists.")
            return redirect("signup")

        if User.objects.filter(email=email).exists():
            messages.error(request, "Email already exists.")
            return redirect("signup")

        # Create user
        user = User.objects.create_user(
            username=username,
            email=email,
            password=password,
        )
        user.full_name = full_name
        user.save()

        messages.success(request, "Account created successfully. You can now log in.")
        return redirect("login")

    return render(request, "signup.html")



def dashboard_view(request):
    return render(request, 'dashboard.html')
