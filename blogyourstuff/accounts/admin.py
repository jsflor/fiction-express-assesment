from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from accounts.models import User

class UserAdmin(UserAdmin):
    model = User
    list_display = ['username', 'first_name', 'last_name', 'is_staff', 'is_active']
    ordering = ['username']
    fieldsets = (
        (None, {'fields': ('username', 'password')}),
        ('Personal info', {'fields': ('first_name', 'last_name')}),
        ('Permissions', {'fields': ('is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions')}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('username', 'password1', 'password2'),
        }),
    )

admin.site.register(User, UserAdmin)