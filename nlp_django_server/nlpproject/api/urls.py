from . import views
from django.urls import path, include

urlpatterns = [
    path('create/', views.CreateTagView.as_view()),
    path('update/<int:pk>', views.UpdateTagView.as_view()),
    path('delete/<int:pk>', views.DeleteTagView.as_view()),
]