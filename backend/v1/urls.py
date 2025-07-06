from django.urls import  path

from v1.views import NotesView, SubjectsView

urlpatterns = [
    path("api/subjects", view=SubjectsView.as_view()),
    path("api/notes", view=NotesView.as_view()),
]
