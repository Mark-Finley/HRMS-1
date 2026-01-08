
from django.shortcuts import render, redirect, get_object_or_404
from django.contrib import messages
from django.contrib.auth import get_user_model
from django.contrib.auth import authenticate, login
from .models import Employee

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
    total_staff = Employee.objects.count()
    active_staff = Employee.objects.filter(work_status='Active').count()
    on_leave = Employee.objects.filter(work_status='On Leave').count()
    retired_separated = Employee.objects.filter(work_status__in=['Resigned', 'Retired']).count()
    
    context = {
        'total_staff': total_staff,
        'active_staff': active_staff,
        'on_leave': on_leave,
        'retired_separated': retired_separated,
    }
    return render(request, 'hr_information/index.html', context)


def staff_list(request):
    """
    Staff Records List
    Browse all personnel with search and filter capabilities
    """
    staff = Employee.objects.all()
    
    # Filter by work status if provided
    work_status = request.GET.get('work_status')
    if work_status:
        staff = staff.filter(work_status=work_status)
    
    # Search by name or employee ID
    search = request.GET.get('search')
    if search:
        from django.db.models import Q
        staff = staff.filter(
            Q(first_name__icontains=search) |
            Q(surname__icontains=search) |
            Q(employee_id__icontains=search)
        )
    
    total_staff = Employee.objects.count()
    active_staff = Employee.objects.filter(work_status='Active').count()
    on_leave = Employee.objects.filter(work_status='On Leave').count()
    retired_separated = Employee.objects.filter(work_status__in=['Resigned', 'Retired']).count()
    
    # Count distinct directorates and professions
    directorates_list = Employee.objects.values_list('directorate', flat=True).distinct()
    professions_list = Employee.objects.values_list('profession', flat=True).distinct()
    
    context = {
        'staff': staff,
        'total_staff': total_staff,
        'active_staff': active_staff,
        'on_leave': on_leave,
        'retired_separated': retired_separated,
        'full_time': active_staff,
        'new_hires': on_leave,
        'departments': len(directorates_list),
        'job_positions': len(professions_list),
        'directorates': [choice[0] for choice in Employee.DIRECTORATE_UNIT_CHOICES],
        'work_statuses': [choice[0] for choice in Employee.WORK_STATUS_CHOICES],
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
        staff_id: Primary key of staff member
    """
    staff = get_object_or_404(Employee, id=staff_id)
    
    context = {
        'staff': staff,
    }
    return render(request, 'hr_information/staff_profile.html', context)


def print_record(request, staff_id=1):
    """
    Printable HR Record
    Generates official A4 personnel file document for printing/export
    
    Args:
        staff_id: Primary key of staff member
    """
    staff = get_object_or_404(Employee, id=staff_id)
    
    from datetime import datetime
    context = {
        'staff': staff,
        'now': datetime.now(),
    }
    return render(request, 'hr_information/print_record.html', context)


def edit_staff(request, staff_id=1):
    """
    Edit Staff HR Record
    Allows updating employee information across all sections
    
    Args:
        staff_id: Primary key of staff member
    """
    staff = get_object_or_404(Employee, id=staff_id)
    
    if request.method == 'POST':
        # Update employee fields from POST data
        staff.employee_id = request.POST.get('employee_id', staff.employee_id)
        staff.kath_staff_number = request.POST.get('kath_staff_number', staff.kath_staff_number)
        staff.ghana_card_number = request.POST.get('ghana_card_number', staff.ghana_card_number)
        staff.ssnit_number = request.POST.get('ssnit_number', staff.ssnit_number)
        staff.surname = request.POST.get('surname', staff.surname)
        staff.first_name = request.POST.get('first_name', staff.first_name)
        staff.other_names = request.POST.get('other_names', staff.other_names)
        staff.sex = request.POST.get('sex', staff.sex)
        staff.date_of_birth = request.POST.get('date_of_birth', staff.date_of_birth)
        staff.nationality = request.POST.get('nationality', staff.nationality)
        staff.contact_number = request.POST.get('contact_number', staff.contact_number)
        staff.email = request.POST.get('email', staff.email)
        staff.category_of_profession = request.POST.get('category_of_profession', staff.category_of_profession)
        staff.profession = request.POST.get('profession', staff.profession)
        staff.profession_status = request.POST.get('profession_status', staff.profession_status)
        staff.directorate = request.POST.get('directorate', staff.directorate)
        staff.unit = request.POST.get('unit', staff.unit)
        staff.at_post_of_duty = request.POST.get('at_post_of_duty', staff.at_post_of_duty) == 'on'
        staff.work_status = request.POST.get('work_status', staff.work_status)
        staff.payroll_status = request.POST.get('payroll_status', staff.payroll_status)
        staff.grade_on_first_appointment = request.POST.get('grade_on_first_appointment', staff.grade_on_first_appointment)
        staff.grade_on_current_appointment = request.POST.get('grade_on_current_appointment', staff.grade_on_current_appointment)
        staff.year_of_current_grade = request.POST.get('year_of_current_grade', staff.year_of_current_grade)
        staff.date_of_first_appointment = request.POST.get('date_of_first_appointment', staff.date_of_first_appointment)
        staff.date_of_current_appointment = request.POST.get('date_of_current_appointment', staff.date_of_current_appointment)
        staff.academic_qualification = request.POST.get('academic_qualification', staff.academic_qualification)
        staff.professional_qualification = request.POST.get('professional_qualification', staff.professional_qualification)
        staff.gog_igf_status = request.POST.get('gog_igf_status', staff.gog_igf_status)
        staff.seniority_status = request.POST.get('seniority_status', staff.seniority_status)
        staff.bank_name = request.POST.get('bank_name', staff.bank_name)
        staff.bank_branch = request.POST.get('bank_branch', staff.bank_branch)
        staff.bank_account_number = request.POST.get('bank_account_number', staff.bank_account_number)
        staff.sal_grouping = request.POST.get('sal_grouping', staff.sal_grouping)
        staff.job_category = request.POST.get('job_category', staff.job_category)
        staff.job_classification = request.POST.get('job_classification', staff.job_classification)
        
        staff.save()
        messages.success(request, 'Staff record updated successfully!')
        return redirect('staff_profile', staff_id=staff.id)
    
    context = {
        'staff': staff,
        'directorates': [choice[0] for choice in Employee.DIRECTORATE_UNIT_CHOICES],
        'work_statuses': [choice[0] for choice in Employee.WORK_STATUS_CHOICES],
        'professions': [choice[0] for choice in Employee.PROFESSION_STATUS_CHOICES],
        'nationalities': [choice[0] for choice in Employee.NATIONALITY_CHOICES],
        'sex_choices': [choice[0] for choice in Employee.SEX_CHOICES],
    }
    return render(request, 'hr_information/edit_staff.html', context)


def create_staff(request):
    """
    Create New Staff HR Record
    Form for adding new employee to the system
    """
    
    if request.method == 'POST':
        # Create new employee from POST data
        staff = Employee()
        staff.employee_id = request.POST.get('employee_id', '')
        staff.kath_staff_number = request.POST.get('kath_staff_number', '')
        staff.ghana_card_number = request.POST.get('ghana_card_number', '')
        staff.ssnit_number = request.POST.get('ssnit_number', '')
        staff.surname = request.POST.get('surname', '')
        staff.first_name = request.POST.get('first_name', '')
        staff.other_names = request.POST.get('other_names', '')
        staff.sex = request.POST.get('sex', '')
        staff.date_of_birth = request.POST.get('date_of_birth', None)
        staff.nationality = request.POST.get('nationality', '')
        staff.contact_number = request.POST.get('contact_number', '')
        staff.email = request.POST.get('email', '')
        staff.category_of_profession = request.POST.get('category_of_profession', '')
        staff.profession = request.POST.get('profession', '')
        staff.profession_status = request.POST.get('profession_status', '')
        staff.directorate = request.POST.get('directorate', '')
        staff.unit = request.POST.get('unit', '')
        staff.at_post_of_duty = request.POST.get('at_post_of_duty') == 'on'
        staff.work_status = request.POST.get('work_status', '')
        staff.payroll_status = request.POST.get('payroll_status', '')
        staff.grade_on_first_appointment = request.POST.get('grade_on_first_appointment', '')
        staff.grade_on_current_appointment = request.POST.get('grade_on_current_appointment', '')
        staff.year_of_current_grade = request.POST.get('year_of_current_grade', None)
        staff.date_of_first_appointment = request.POST.get('date_of_first_appointment', None)
        staff.date_of_current_appointment = request.POST.get('date_of_current_appointment', None)
        staff.academic_qualification = request.POST.get('academic_qualification', '')
        staff.professional_qualification = request.POST.get('professional_qualification', '')
        staff.gog_igf_status = request.POST.get('gog_igf_status', '')
        staff.seniority_status = request.POST.get('seniority_status', '')
        staff.bank_name = request.POST.get('bank_name', '')
        staff.bank_branch = request.POST.get('bank_branch', '')
        staff.bank_account_number = request.POST.get('bank_account_number', '')
        staff.sal_grouping = request.POST.get('sal_grouping', '')
        staff.job_category = request.POST.get('job_category', '')
        staff.job_classification = request.POST.get('job_classification', '')
        
        staff.save()
        messages.success(request, 'New staff record created successfully!')
        return redirect('staff_profile', staff_id=staff.id)
    
    context = {
        'directorates': [choice[0] for choice in Employee.DIRECTORATE_UNIT_CHOICES],
        'work_statuses': [choice[0] for choice in Employee.WORK_STATUS_CHOICES],
        'professions': [choice[0] for choice in Employee.PROFESSION_STATUS_CHOICES],
        'nationalities': [choice[0] for choice in Employee.NATIONALITY_CHOICES],
        'sex_choices': [choice[0] for choice in Employee.SEX_CHOICES],
    }
    return render(request, 'hr_information/create_staff.html', context)
