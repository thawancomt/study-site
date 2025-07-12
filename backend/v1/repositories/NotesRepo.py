

from bson import ObjectId
from pymongo.results import InsertOneResult

from v1.entities.note_entity import NewNoteEntity, NoteEntity
from v1.exceptions.exceptions import NotRightEntity
from v1.repositories.baseRepo import BaseRepo
from v1.repositories.subjectsRepo import SubjectRepo
from pymongo import ReturnDocument
from typing import List
from pymongo.cursor import Cursor

class NotesRepo(BaseRepo):
    collection_store_name = "notes"

    def __init__(self):
        super().__init__()

    def create(self, new_note : NewNoteEntity) -> InsertOneResult:

        if (not isinstance(new_note, NewNoteEntity)):
            raise NotRightEntity


        return self.collection.insert_one(new_note.model_dump(mode="python"))


    def get_all(self):
        all_notes : Cursor[NoteEntity] = self.collection.find({})


        subjects_id_set = set()

        for note in all_notes:
            if note.get("subjects"):
                for subject_id in note.get("subjects"):
                    subjects_id_set.add(subject_id)

        subjects_objects = {

        }

        for subject_id in subjects_id_set:
            if subject_id:
                subjects_objects[subject_id] = SubjectRepo().get_by_id(subject_id)
            continue


        all_notes.rewind()

        return [{
                "title" : note.get("title"),
                "note" : note.get("note"),
                "id" : str(note.get("_id")),
                "subjects" : [ subject_id for subject_id in (note.get("subjects")  or  []) if note.get("subjects") and subject_id and note is not None  ]
        } for note in all_notes]

    def delete(self, note_id : ObjectId):
        print(note_id)
        result = self.collection.find_one({"_id" : note_id})
        return True if result else False


    def put(self, new_data : NoteEntity):
        updated = self.collection.find_one_and_update(
            filter={"_id" : ObjectId(new_data.id)},
            update={"$set": new_data.model_dump(mode="json")},
            return_document=ReturnDocument.AFTER
        )

        return  updated

    def get_by_name(self, name):
        return self.collection.find_one({"title" : f"{str(name).strip()}"})


    def get_by_id(self, note_id) -> dict | list:
        if not ObjectId.is_valid(note_id):
            return []

        result = self.collection.find_one({"_id" : ObjectId(note_id)})
        return result


