from django.contrib.auth.models import AbstractUser
from django.db import models
from datetime import date

class User(AbstractUser):
    full_name = models.CharField(max_length=255)

    def __str__(self):
        return self.username
    

class Employee(models.Model):
    WORK_STATUS_CHOICES = [
        ('Active', 'Active'),
        ('On Leave', 'On Leave'),
        ('Resigned', 'Resigned'),
        ('Retired', 'Retired'),
    ]

    DIRECTORATE_UNIT_CHOICES= [
        ('Human Resources', 'Human Resources'),
        ('Information Technology', 'Information Technology'),
        ('Finance', 'Finance'),
        ("Anaesthesia & Intensive Care", "Anaesthesia & Intensive Care"),
        ("Child Health", "Child Health"),
        ("Domestics", "Domestics"),
        ("Ears, Nose & Throat", "Ear, Nose & Throat"),
        ("Emergency Medicine", "Emergency Medicine"),
        ("Eye","Eye"),
        ("Family Medicine", "Family Medicine"),
        ("Transfusion Medicine Unit", "Transfusion Medicine Unit"),
        ("Internal Medicine", "Internal Medicine"),
        ("Obstetrics & Gynecology", "Obstetrics & Gynecology"),
        ("Oncology", "Oncology"),
        ("Oral Health", "Oral Health"),
        ("Radiology", "Radiology"),
        ("Surgery", "Surgery"),
        ("Trauma & Orthopedics", "Trauma & Orthopedics"),
        ("Biostatics", "Biostatics"),
        ("General Administration", "General Administration"),
        ("Public Affairs", "Public Affairs"),
        ("EMD", "EMD"),
        ("Supply Chain Management Units", "Supply Chain Management Units"),
        ("Project Management Unit", "Project Management Unit"),
        ("Pharmacy Unit", "Pharmacy Unit"),
        ("Lab service(LSD)", "Lab service(LSD)"),
        ("Public Health", "Public Health"),
        ("Chaplaincy", "Chaplaincy"),
        ("Social Welfare", "Social Welfare"),
        ("Quality Assurance(QA)", "Quality Assurance(QA)"),
        ("Internal Audit", "Internal Audit"),
        ("PMEU", "PMEU"),
        ("EMRS", "EMRS Units"),
        ("CSSU", "CSSU"),
        ("Pathology", "Pathology"),
        # Add more units as needed
    ]
    PAYROLL_STATUS_CHOICES = [
        ('On Payroll', 'On Payroll'),
        ('Off Payroll', 'Off Payroll'),
    ]
    GOG_IGF_STATUS_CHOICES = [
        ('GOG', 'GOG'),
        ('IGF', 'IGF'),
    ]
    #list of  all nationalities in the world.
    NATIONALITY_CHOICES = [
    # Africa
    ('Algerian', 'Algerian'),
    ('Angolan', 'Angolan'),
    ('Beninese', 'Beninese'),
    ('Botswanan', 'Botswanan'),
    ('Burkinabe', 'Burkinabe'),
    ('Burundian', 'Burundian'),
    ('Cameroonian', 'Cameroonian'),
    ('Cape Verdean', 'Cape Verdean'),
    ('Central African', 'Central African'),
    ('Chadian', 'Chadian'),
    ('Comorian', 'Comorian'),
    ('Congolese', 'Congolese'),
    ('Ivorian', 'Ivorian'),
    ('Djiboutian', 'Djiboutian'),
    ('Egyptian', 'Egyptian'),
    ('Equatorial Guinean', 'Equatorial Guinean'),
    ('Eritrean', 'Eritrean'),
    ('Ethiopian', 'Ethiopian'),
    ('Gabonese', 'Gabonese'),
    ('Gambian', 'Gambian'),
    ('Ghanaian', 'Ghanaian'),
    ('Guinean', 'Guinean'),
    ('Guinea-Bissauan', 'Guinea-Bissauan'),
    ('Kenyan', 'Kenyan'),
    ('Lesotho', 'Lesotho'),
    ('Liberian', 'Liberian'),
    ('Libyan', 'Libyan'),
    ('Malagasy', 'Malagasy'),
    ('Malawian', 'Malawian'),
    ('Malian', 'Malian'),
    ('Mauritanian', 'Mauritanian'),
    ('Mauritian', 'Mauritian'),
    ('Moroccan', 'Moroccan'),
    ('Mozambican', 'Mozambican'),
    ('Namibian', 'Namibian'),
    ('Nigerien', 'Nigerien'),
    ('Nigerian', 'Nigerian'),
    ('Rwandan', 'Rwandan'),
    ('Sao Tomean', 'Sao Tomean'),
    ('Senegalese', 'Senegalese'),
    ('Seychellois', 'Seychellois'),
    ('Sierra Leonean', 'Sierra Leonean'),
    ('Somali', 'Somali'),
    ('South African', 'South African'),
    ('South Sudanese', 'South Sudanese'),
    ('Sudanese', 'Sudanese'),
    ('Tanzanian', 'Tanzanian'),
    ('Togolese', 'Togolese'),
    ('Tunisian', 'Tunisian'),
    ('Ugandan', 'Ugandan'),
    ('Zambian', 'Zambian'),
    ('Zimbabwean', 'Zimbabwean'),

    # Americas
    ('Antiguan', 'Antiguan'),
    ('Argentine', 'Argentine'),
    ('Bahamian', 'Bahamian'),
    ('Barbadian', 'Barbadian'),
    ('Belizean', 'Belizean'),
    ('Bolivian', 'Bolivian'),
    ('Brazilian', 'Brazilian'),
    ('Canadian', 'Canadian'),
    ('Chilean', 'Chilean'),
    ('Colombian', 'Colombian'),
    ('Costa Rican', 'Costa Rican'),
    ('Cuban', 'Cuban'),
    ('Dominican', 'Dominican'),
    ('Ecuadorian', 'Ecuadorian'),
    ('Salvadoran', 'Salvadoran'),
    ('Grenadian', 'Grenadian'),
    ('Guatemalan', 'Guatemalan'),
    ('Guyanese', 'Guyanese'),
    ('Haitian', 'Haitian'),
    ('Honduran', 'Honduran'),
    ('Jamaican', 'Jamaican'),
    ('Mexican', 'Mexican'),
    ('Nicaraguan', 'Nicaraguan'),
    ('Panamanian', 'Panamanian'),
    ('Paraguayan', 'Paraguayan'),
    ('Peruvian', 'Peruvian'),
    ('Surinamese', 'Surinamese'),
    ('Trinidadian', 'Trinidadian'),
    ('Uruguayan', 'Uruguayan'),
    ('Venezuelan', 'Venezuelan'),
    ('American', 'American'),

    # Asia
    ('Afghan', 'Afghan'),
    ('Armenian', 'Armenian'),
    ('Azerbaijani', 'Azerbaijani'),
    ('Bahraini', 'Bahraini'),
    ('Bangladeshi', 'Bangladeshi'),
    ('Bhutanese', 'Bhutanese'),
    ('Bruneian', 'Bruneian'),
    ('Cambodian', 'Cambodian'),
    ('Chinese', 'Chinese'),
    ('Cypriot', 'Cypriot'),
    ('Georgian', 'Georgian'),
    ('Indian', 'Indian'),
    ('Indonesian', 'Indonesian'),
    ('Iranian', 'Iranian'),
    ('Iraqi', 'Iraqi'),
    ('Israeli', 'Israeli'),
    ('Japanese', 'Japanese'),
    ('Jordanian', 'Jordanian'),
    ('Kazakhstani', 'Kazakhstani'),
    ('Kuwaiti', 'Kuwaiti'),
    ('Kyrgyz', 'Kyrgyz'),
    ('Laotian', 'Laotian'),
    ('Lebanese', 'Lebanese'),
    ('Malaysian', 'Malaysian'),
    ('Maldivian', 'Maldivian'),
    ('Mongolian', 'Mongolian'),
    ('Nepalese', 'Nepalese'),
    ('North Korean', 'North Korean'),
    ('Omani', 'Omani'),
    ('Pakistani', 'Pakistani'),
    ('Philippine', 'Philippine'),
    ('Qatari', 'Qatari'),
    ('Saudi', 'Saudi'),
    ('Singaporean', 'Singaporean'),
    ('South Korean', 'South Korean'),
    ('Sri Lankan', 'Sri Lankan'),
    ('Syrian', 'Syrian'),
    ('Taiwanese', 'Taiwanese'),
    ('Tajik', 'Tajik'),
    ('Thai', 'Thai'),
    ('Turkish', 'Turkish'),
    ('Turkmen', 'Turkmen'),
    ('Emirati', 'Emirati'),
    ('Uzbek', 'Uzbek'),
    ('Vietnamese', 'Vietnamese'),
    ('Yemeni', 'Yemeni'),

    # Europe
    ('Albanian', 'Albanian'),
    ('Austrian', 'Austrian'),
    ('Belgian', 'Belgian'),
    ('Bosnian', 'Bosnian'),
    ('Bulgarian', 'Bulgarian'),
    ('Croatian', 'Croatian'),
    ('Czech', 'Czech'),
    ('Danish', 'Danish'),
    ('Dutch', 'Dutch'),
    ('English', 'English'),
    ('Estonian', 'Estonian'),
    ('Finnish', 'Finnish'),
    ('French', 'French'),
    ('German', 'German'),
    ('Greek', 'Greek'),
    ('Hungarian', 'Hungarian'),
    ('Icelandic', 'Icelandic'),
    ('Irish', 'Irish'),
    ('Italian', 'Italian'),
    ('Latvian', 'Latvian'),
    ('Lithuanian', 'Lithuanian'),
    ('Luxembourgish', 'Luxembourgish'),
    ('Maltese', 'Maltese'),
    ('Moldovan', 'Moldovan'),
    ('Montenegrin', 'Montenegrin'),
    ('Norwegian', 'Norwegian'),
    ('Polish', 'Polish'),
    ('Portuguese', 'Portuguese'),
    ('Romanian', 'Romanian'),
    ('Russian', 'Russian'),
    ('Scottish', 'Scottish'),
    ('Serbian', 'Serbian'),
    ('Slovak', 'Slovak'),
    ('Slovenian', 'Slovenian'),
    ('Spanish', 'Spanish'),
    ('Swedish', 'Swedish'),
    ('Swiss', 'Swiss'),
    ('Ukrainian', 'Ukrainian'),
    ('Welsh', 'Welsh'),
    ('British', 'British'),

    # Oceania
    ('Australian', 'Australian'),
    ('Fijian', 'Fijian'),
    ('Kiribati', 'Kiribati'),
    ('Marshallese', 'Marshallese'),
    ('Micronesian', 'Micronesian'),
    ('Nauruan', 'Nauruan'),
    ('New Zealander', 'New Zealander'),
    ('Palauan', 'Palauan'),
    ('Papua New Guinean', 'Papua New Guinean'),
    ('Samoan', 'Samoan'),
    ('Solomon Islander', 'Solomon Islander'),
    ('Tongan', 'Tongan'),
    ('Tuvaluan', 'Tuvaluan'),
    ('Vanuatuan', 'Vanuatuan'),
]

    SEX_CHOICES = [
        ('Male', 'Male'),
        ('Female', 'Female'),
    ]

    PROFESSION_STATUS_CHOICES = [
        ('Permanent', 'Permanent'),
        ('Contract', 'Contract'),
        ('Temporary', 'Temporary'),
    ]
    CATEGORY_OF_PROFESSION_CHOICES = [
        ('Medical', 'Medical'),
        ('Nursing', 'Nursing'),
        ('Allied Health', 'Allied Health'),
        ('Administrative', 'Administrative'),
        ('Support Staff', 'Support Staff'),
    ]
    
    # =========================
    # IDENTIFICATION
    # =========================

    employee_id = models.CharField(max_length=50, unique=True)
    kath_staff_number = models.CharField(max_length=50, unique=True)
    ghana_card_number = models.CharField(max_length=50, unique=True)
    ssnit_number = models.CharField(max_length=50, unique=True)

    # =========================
    # PERSONAL DETAILS
    # =========================

    first_name = models.CharField(max_length=100)
    surname = models.CharField(max_length=100)
    other_names = models.CharField(max_length=100, blank=True, null=True)

    sex = models.CharField(max_length=10, choices=SEX_CHOICES)
    nationality = models.CharField(max_length=100, choices=NATIONALITY_CHOICES)
    date_of_birth = models.DateField()

    # =========================
    # CONTACT DETAILS
    # =========================

    institutional_email = models.EmailField(unique=True)
    email = models.EmailField(unique=True)
    contact_number = models.CharField(max_length=15)

    # =========================
    # EMPLOYMENT DETAILS
    # =========================

    profession = models.CharField(max_length=100)
    category_of_profession = models.CharField(max_length=100, choices=CATEGORY_OF_PROFESSION_CHOICES)
    profession_status = models.CharField(
        max_length=100, choices=PROFESSION_STATUS_CHOICES
    )

    directorate = models.CharField(
        max_length=100, choices=DIRECTORATE_UNIT_CHOICES
    )
    unit = models.CharField(max_length=100)

    work_status = models.CharField(
        max_length=100, choices=WORK_STATUS_CHOICES, default='Active'
    )
    payroll_status = models.CharField(
        max_length=100, choices=PAYROLL_STATUS_CHOICES
    )
    gog_igf_status = models.CharField(
        max_length=50, choices=GOG_IGF_STATUS_CHOICES
    )

    seniority_status = models.CharField(max_length=100)

    # =========================
    # APPOINTMENT DETAILS
    # =========================

    date_of_first_appointment = models.DateField()
    date_of_current_appointment = models.DateField()

    date_of_previous_appointment = models.DateField(
        blank=True, null=True
    )

    grade_on_first_appointment = models.CharField(max_length=100)
    grade_on_current_appointment = models.CharField(max_length=100)

    year_of_current_grade = models.PositiveIntegerField()

    at_post_of_duty = models.CharField(max_length=255)

    # =========================
    # QUALIFICATIONS
    # =========================

    academic_qualification = models.CharField(max_length=255)
    professional_qualification = models.CharField(max_length=255)

    # =========================
    # PAYROLL / BANK DETAILS
    # =========================

    sal_grouping = models.CharField(max_length=100)
    job_category = models.CharField(max_length=100)
    job_classification = models.CharField(max_length=100)

    bank_name = models.CharField(max_length=100)
    bank_branch = models.CharField(max_length=100)
    bank_account_number = models.CharField(max_length=50)

    # =========================
    # FILE STORAGE
    # =========================

    shelf_location_number = models.CharField(
        max_length=100, blank=True, null=True
    )
    shelf_call_number = models.CharField(
        max_length=100, blank=True, null=True
    )

    # =========================
    # CALCULATED PROPERTIES
    # =========================

    @property
    def age(self):
        today = date.today()
        return (
            today.year
            - self.date_of_birth.year
            - ((today.month, today.day) <
               (self.date_of_birth.month, self.date_of_birth.day))
        )

    @property
    def birth_month(self):
        return self.date_of_birth.month

    @property
    def years_served(self):
        today = date.today()
        return (
            today.year
            - self.date_of_first_appointment.year
            - ((today.month, today.day) <
               (self.date_of_first_appointment.month,
                self.date_of_first_appointment.day))
        )

    @property
    def years_to_retirement(self):
        retirement_age = 60
        return max(retirement_age - self.age, 0)

    @property
    def years_on_current_grade(self):
        return date.today().year - self.year_of_current_grade

    # =========================
    # META & STRING
    # =========================

    class Meta:
        ordering = ['surname', 'first_name']
        verbose_name = 'Employee'
        verbose_name_plural = 'Employees'

    def __str__(self):
        return f"{self.first_name} {self.surname} ({self.employee_id})"
