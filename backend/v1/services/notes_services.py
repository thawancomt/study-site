from typing import List

from bson import ObjectId
from django.http import QueryDict, HttpRequest

from v1.entities.note_entity import NewNoteEntity, NoteEntity
from v1.exceptions.exceptions import SubjectNotFoundError
from v1.repositories.NotesRepo import NotesRepo
from v1.repositories.subjectsRepo import SubjectRepo
from v1.services.base_interface import BaseService
from v1.services.subjects_services import SubjectsServices


class NotesService(BaseService):
    def __init__(self, note_repo : NotesRepo, subjects_repo : SubjectRepo):
        self.repo = note_repo
        self.subjects_repo = subjects_repo

    def create(self, new_note : NewNoteEntity) -> NoteEntity | None:
        if self.repo.get(new_note.title): return None

        created_object = self.repo.create(newNote=new_note.model_dump())

        return created_object

    def create_note_from_data(self, req_data : dict) -> NewNoteEntity :

        """
        This method receive a req, made all the processing to extract the data
        and return a NoteEntity Object.
        """
        # Gathering the subjects id received from request data
        received_subjects_id = req_data.get("subjects")
        
        if note := self.get_by_title(req_data.get("title")):
            return note

        found_subjects: List[ObjectId] = []

        for subject_id in received_subjects_id:
            if subjects_object := self.subjects_repo.get_by_id(subject_id):
                temp_id = str(subjects_object["_id"])

                subjects_object["id"] = temp_id

                del subjects_object["_id"]

                found_subjects.append(ObjectId(temp_id))
            else:
                raise SubjectNotFoundError()

        new_note = req_data.copy()
        new_note["subjects"] = [str(s_id) for s_id in found_subjects]

        new_note_obj = NewNoteEntity(**new_note)

        self.create(new_note_obj)

        return new_note_obj

    def get_by_title(self, title):

        pass

    def get_by_id(self, object_id: ObjectId):
        pass

    def get_all(self):
        return self.repo.get_all()