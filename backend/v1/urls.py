from django.urls import  path

from v1.views import NotesView, SubjectsView, AiResumeView

urlpatterns = [
    path("api/subjects", view=SubjectsView.as_view()),
    path("api/notes", view=NotesView.as_view()),
    path("api/ask", view=AiResumeView.as_view()),
]
