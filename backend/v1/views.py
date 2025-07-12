from typing import List
from xmlrpc.client import Boolean

from bson import ObjectId
from pydantic import ValidationError, BaseModel
from rest_framework.decorators import api_view
from rest_framework.response import Response

from v1.entities.note_entity import NewNoteEntity, NoteEntity
from v1.entities.subjectEntity import SubjectEntity, NewSubjectEntity
from v1.repositories.NotesRepo import NotesRepo
from v1.repositories.subjectsRepo import SubjectRepo
from v1.services.notes_services import NotesService
from rest_framework.views import APIView

from v1.services.subjects_services import SubjectsServices


class NotesView(APIView):

    repo = NotesRepo()
    subject_repo = SubjectRepo()

    service = NotesService(note_repo=repo, subjects_repo=subject_repo)

    def get(self, req):

        if query_id := req.GET.get("id") :
            note_obj = self.repo.get_by_id(query_id)


            return Response(
                NoteEntity(**note_obj).model_dump(mode="json") if note_obj else {}
            )

        return Response(
            self.service.get_all()
        )

    def post(self, req):
        try:
            result_data = self.service.create_note_from_data(req.data)
            return Response(result_data.model_dump(mode="json"))

        except ValidationError as e:
            raise e
            return Response({
                "errors": str(e.errors())
            }, status=400)

    def delete(self, req):
        result = Boolean()
        if id_obj := ObjectId.is_valid(req.data.get("id")):
            result = self.service.delete(ObjectId(req.data.get("id")))

        return  Response({
            "message" : result
        })

    def patch(self):
        pass

    def put(self, req):
        req.data["subjects"] = []
        try:
            updated_entity = NoteEntity(**req.data)
            result = NoteEntity(**self.repo.put(updated_entity))

            return Response(
                result.model_dump(mode="json"))
        except Exception as e:
            raise e

        return Response({
            "message" : "not found object"
        })

class SubjectsView(APIView):
    repo = SubjectRepo()

    def get(self, req):
        query = req.query_params

        if name_query := query.get("name"):
            subject = self.repo.get_by_name(name_query)

            if subject:

                new_subject = SubjectEntity(**subject)
                return Response(new_subject.model_dump(mode="json"))

            return Response({"error" : "none object found"},status=404)

        return Response(self.repo.get_all())

    def post(self, req):
        try:
            new_subject = NewSubjectEntity(**req.data)

            new_subject_id = self.repo.create(new_subject.model_dump())

            return Response(new_subject.model_dump(mode="json") | {"id": str(new_subject_id)})

        except ValidationError as e:
            return Response({
                "errors": str(e.errors())
            }, status=400)




