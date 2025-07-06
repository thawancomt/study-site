from django.db.models.expressions import result
from django.template.context_processors import request
from django.urls import re_path
from pydantic import ValidationError
from rest_framework.decorators import api_view
from rest_framework.response import Response

from v1.entities.subjectEntity import SubjectEntity, NewSubjectEntity
from v1.repositories.subjectsRepo import SubjectRepo


@api_view(["GET", "POST"])
def get(request):
    try:
        newSubject = NewSubjectEntity(**request.data)

        instanceOfRepo = SubjectRepo()

        id =  instanceOfRepo.create(newSubject.model_dump())

        print(request.data)
        return Response(newSubject.model_dump(mode="json") | {"id" : str(id)})

    except ValidationError as e:
        return Response({
            "errors" : str(e.errors())
        }, status=400)

    return Response({"response": "ok"})

@api_view(["GET", "POST"])
def get_by_name(req, name):
    instanceOfRepo = SubjectRepo()
    result = instanceOfRepo.get_by_name(name=name)
    if not result:
        return  Response({}, status=404)

    return (Response({
        "results" : str(instanceOfRepo.get_by_name(name=name))
    }))
@api_view(["GET", "POST"])
def get_all(req):
    instanceOfRepo = SubjectRepo()
    result = instanceOfRepo.get_all()

    print(result)


    return Response({
        "results" : result
    })