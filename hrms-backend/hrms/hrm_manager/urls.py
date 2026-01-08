from django.urls import path
from . import views

urlpatterns = [
    # Authentication
    path('login/', views.login_view, name='login'),
    path('signup/', views.signup_view, name='signup'),
    
    # Dashboard
    path('dashboard/', views.dashboard_view, name='dashboard'),
    
    # HR Information Module
    path('hr-info/', views.hr_information_index, name='hr_information_index'),
    path('hr-info/staff/', views.staff_list, name='staff_list'),
    path('hr-info/staff/new/', views.create_staff, name='create_staff'),
    path('hr-info/staff/<int:staff_id>/', views.staff_profile, name='staff_profile'),
    path('hr-info/staff/<int:staff_id>/print/', views.print_record, name='print_record'),
    path('hr-info/staff/<int:staff_id>/edit/', views.edit_staff, name='edit_staff'),
    
]  
