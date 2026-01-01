
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


# ===== HR INFORMATION MODULE VIEWS =====

def hr_information_index(request):
    """
    HR Information Module Dashboard
    Displays summary statistics and quick access to personnel records
    """
    # TODO: Replace with real database queries when Employee model is created
    context = {
        'total_staff': 487,
        'active_staff': 462,
        'on_leave': 18,
        'retired_separated': 7,
    }
    return render(request, 'hr_information/index.html', context)


def staff_list(request):
    """
    Staff Records List
    Browse all personnel with search and filter capabilities
    """
    # TODO: Implement actual staff query and filtering logic
    context = {
        'total_staff': 487,
    }
    return render(request, 'hr_information/staff_list.html', context)


def staff_profile(request, staff_id=1):
    """
    Individual Staff HR Profile
    Displays complete personnel record with 6 sections:
    1. Identity & Personal Information
    2. Employment & Placement
    3. Appointment, Grade & Band
    4. Compliance & Credentials
    5. Posting & Movement History
    6. HR Notes & Remarks
    
    Args:
        staff_id: Primary key of staff member (will be connected to Employee model)
    """
    # TODO: Replace with actual database query when Employee model is created
    # Example: staff = Employee.objects.get(id=staff_id)
    
    # Placeholder sample data
    sample_staff = {
        'id': staff_id,
        'biometric_code': 'C01522',
        'staff_number': 'KATH-10234',
        'old_staff_code': 'BK-18',
        'national_id': 'GHA-123456789-1',
        'surname': 'Owusu',
        'first_name': 'Akosua',
        'other_name': 'Serwaa',
        'gender': 'Female',
        'date_of_birth': '1985-04-15',
        'category': 'Clinical',
        'cadre': 'Nursing (Cardiac)',
        'job_title': 'Registered Nurse',
        'job_description': 'Patient care & ICU support',
        'department': 'Cardiology',
        'unit_ward': 'Cardiac ICU',
        'office_location': 'Block A, Ground Floor',
        'employment_type': 'Permanent',
        'appointment_grade': 'Grade 8',
        'current_grade': 'Grade 6',
        'band': 'Band 2',
        'date_first_appointment': '2016-08-12',
        'date_current_appointment': '2022-04-05',
        'years_of_service': '8 years',
        'regulatory_body': 'Nursing and Midwifery Council',
        'license_number': 'NMC-12345-GH',
        'license_issue_date': '2015-06-10',
        'license_expiry_date': '2026-06-10',
        'status': 'Active',
        'hr_notes': 'Exemplary performance record. No disciplinary actions on file.',
        'last_updated': '2024-12-20',
    }
    
    context = {
        'staff': sample_staff,
    }
    return render(request, 'hr_information/staff_profile.html', context)


def print_record(request, staff_id=1):
    """
    Printable HR Record
    Generates official A4 personnel file document for printing/export
    
    Args:
        staff_id: Primary key of staff member
    """
    # TODO: Replace with actual database query when Employee model is created
    # Placeholder sample data (same as profile)
    sample_staff = {
        'id': staff_id,
        'biometric_code': 'C01522',
        'staff_number': 'KATH-10234',
        'old_staff_code': 'BK-18',
        'national_id': 'GHA-123456789-1',
        'surname': 'Owusu',
        'first_name': 'Akosua',
        'other_name': 'Serwaa',
        'gender': 'Female',
        'date_of_birth': '1985-04-15',
        'category': 'Clinical',
        'cadre': 'Nursing (Cardiac)',
        'job_title': 'Registered Nurse',
        'job_description': 'Patient care & ICU support',
        'department': 'Cardiology',
        'unit_ward': 'Cardiac ICU',
        'office_location': 'Block A, Ground Floor',
        'employment_type': 'Permanent',
        'appointment_grade': 'Grade 8',
        'current_grade': 'Grade 6',
        'band': 'Band 2',
        'date_first_appointment': '2016-08-12',
        'date_current_appointment': '2022-04-05',
        'years_of_service': '8 years',
        'regulatory_body': 'Nursing and Midwifery Council',
        'license_number': 'NMC-12345-GH',
        'license_issue_date': '2015-06-10',
        'license_expiry_date': '2026-06-10',
        'status': 'Active',
        'hr_notes': 'Exemplary performance record.',
        'last_updated': '2024-12-20',
    }
    
    from datetime import datetime
    context = {
        'staff': sample_staff,
        'now': datetime.now(),
    }
    return render(request, 'hr_information/print_record.html', context)
