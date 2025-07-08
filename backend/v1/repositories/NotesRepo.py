
from pymongo.results import InsertOneResult

from v1.entities.note_entity import NewNoteEntity, NoteEntity
from v1.exceptions.exceptions import NotRightEntity
from v1.repositories.baseRepo import BaseRepo
from v1.repositories.subjectsRepo import SubjectRepo

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
            subjects_objects[subject_id] = SubjectRepo().get_by_id(subject_id)


        all_notes.rewind()

        return [{
                "title" : note.get("title"),
                "note" : note.get("note"),
                "id" : str(note.get("_id")),
                "subjects" : [ SubjectRepo().get_by_id( str(subject_id ) ).model_dump(mode="json") for subject_id in note.get("subjects") if note.get("subjects") and subject_id not in []]
        } for note in all_notes]

    def delete(self):
        pass


    def update(self):
        pass

    def get_by_name(self, name):
        return self.collection.find_one({"title" : f"{str(name).strip()}"})



