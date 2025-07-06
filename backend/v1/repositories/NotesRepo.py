
from pymongo import MongoClient
from pymongo.response import Response
from pymongo.results import InsertOneResult

from v1.entities.note_entity import NewNoteEntity, NoteEntity
from v1.repositories.baseRepo import BaseRepo

from rest_framework.views import APIView
class NotesRepo(BaseRepo):
    collection_store_name = "notes"

    def __init__(self):
        super().__init__()

    def create(self, new_note : NewNoteEntity) -> InsertOneResult:
        return self.collection.insert_one(new_note.model_dump())


    def get_all(self):
        all_notes = self.collection.find({})

        return [{
                "title" : note.get("title"),
                "note" : note.get("note"),
                "id" : str(note.get("_id")),
                 "subjects" : [  str(subject_id) for subject_id in note.get("subjects") if note.get("subjects")]
        } for note in all_notes]

    def delete(self):
        pass


    def update(self):
        pass




