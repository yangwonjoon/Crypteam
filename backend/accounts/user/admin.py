from django.contrib import admin
from .models import UserInfo

class DMDDO(admin.ModelAdmin):
    pass

admin.site.register(UserInfo, DMDDO)