# json_placeholder_clone/urls.py
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('api/', include('api.urls')),
    path('admin/', admin.site.urls),
    
]
