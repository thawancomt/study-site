from typing import List
from xmlrpc.client import Boolean

from bson import ObjectId
from pydantic import ValidationError, BaseModel
from pyexpat.errors import messages
from rest_framework.decorators import api_view
from rest_framework.response import Response

from v1.ai_pipeline.services.ai_resume_services import AIResume
from v1.entities.note_entity import NewNoteEntity, NoteEntity
from v1.entities.subjectEntity import SubjectEntity, NewSubjectEntity
from v1.exceptions.exceptions import NoteAlreadyExists
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
            note_entity  = self.service.get_by_id(query_id)

            if note_entity:
                return Response(
                    note_entity.model_dump(mode="json")
                )

        all_notes = self.service.get_all()
        return Response(
            all_notes
        )

    def post(self, req):
        try:
            result_data = self.service.create_note_from_data(req.data)
            return Response(result_data.model_dump(mode="json"))

        except ValidationError as e:
            return Response({
                "errors" : str(e)
            }, status=400)

        except NoteAlreadyExists as e:
            return Response(
                {"message": "Note with this title already exists"}, status=409
            )

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

        print(req.data)
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

class AiResumeView(APIView):

    service = AIResume("")

    def post(self, req):
        payload = req.data


        if prompt := payload.get("prompt"):
            print(f"Your prompt: {prompt}")

            try:
                model_output = self.service.ask(prompt)
                return Response({
                    "message" : f"{model_output}"
                })
            except Exception as e:
                return Response({
                    "error" : "Your prompt couldnt be processed"
                }, status=500)

        return Response({
            "message" : "We got you"
        })




