from typing import Iterable

from bson import ObjectId
from pymongo.results import InsertOneResult

from v1.entities.note_entity import NewNoteEntity, NoteEntity
from v1.exceptions.exceptions import NotRightEntity
from v1.repositories.baseRepo import BaseRepo
from pymongo import ReturnDocument
from pymongo.cursor import Cursor

class NotesRepo(BaseRepo):
    collection_store_name = "notes"

    def __init__(self):
        super().__init__()

    def create(self, new_note : NewNoteEntity) -> ObjectId | None:

        if not isinstance(new_note, NewNoteEntity):
            raise NotRightEntity(f"Expected a NewNoteEntity, got: f{type(new_note)}")

        result = self.collection.insert_one(new_note.model_dump(mode="python"))
        return result.inserted_id if result else None


    def get_all(self) -> Iterable[dict]:
        all_notes = self.collection.find({})

        return all_notes

    def delete(self, note_id : ObjectId):
        print(note_id)
        result = self.collection.find_one({"_id" : note_id})
        return True if result else False


    def put(self, new_data : NoteEntity):
        updated = self.collection.find_one_and_update(
            filter={"_id" : ObjectId(new_data.id)},
            update={"$set": new_data.model_dump(mode="json", by_alias=True)},
            return_document=ReturnDocument.AFTER
        )

        return  updated

    def get_by_name(self, name):
        return self.collection.find_one({"title" : f"{str(name).strip()}"})


    def get_by_id(self, note_id : ObjectId) -> dict | None:
        if not isinstance(note_id, ObjectId):
            raise  NotRightEntity(f"Expected type: ObjectID, received: {type(note_id)}")

        result = self.collection.find_one({"_id" : note_id})

        return result


