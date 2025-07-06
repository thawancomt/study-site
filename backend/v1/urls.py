from django.urls import  path

from v1.views import get, get_by_name, get_all

urlpatterns = [
    path("api/", view=get),
    path("api/<str:name>/", view=get_by_name),
    path("api/all", view=get_all)
]
