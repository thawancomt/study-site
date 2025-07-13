from typing import List, Any, Type, TypeVar

from bson import ObjectId
from pydantic import ValidationError, BaseModel

from v1.entities.note_entity import NewNoteEntity, NoteEntity
from v1.exceptions.exceptions import SubjectNotFoundError, NoteAlreadyExists
from v1.loggers.file_handler import get_file_handler
from v1.repositories.NotesRepo import NotesRepo
from v1.repositories.subjectsRepo import SubjectRepo
from v1.services.base_interface import BaseService

import logging
logging_formater = logging.Formatter(fmt="%(asctime)s - %(name)s: %(levelname)s - line: %(lineno)d - %(message)s")

logger = logging.getLogger(__name__)
logger.setLevel(logging.DEBUG)

file_handler = get_file_handler("notes_services.log")
file_handler.setFormatter(logging_formater)

logger.addHandler(file_handler)


T = TypeVar("T", bound=BaseModel)

class NotesService(BaseService):
    def __init__(self, note_repo: NotesRepo, subjects_repo: SubjectRepo):
        self.repo = note_repo
        self.subjects_repo = subjects_repo
        logger.debug("NotesService initialized with NoteRepo and SubjectRepo")

    def parse_result_to_entity(self, target_entity : Type[T], data : dict) -> T:
        try:
            return target_entity(**data)
        except ValidationError as e:
            logger.error(f"the Data send: {data} can not be used to create a {target_entity.__name__}")
            raise e


    def create(self, new_note: NewNoteEntity) -> NoteEntity :
        logger.debug(f"Attempting to create a new note with title: {new_note.title}")

        if self.repo.get_by_name(new_note.title):
            logger.info(f"Note with title '{new_note.title}' already exists. Skipping creation.")

            raise NoteAlreadyExists("Note with this title already exist")

        note_id  = self.repo.create(new_note=new_note)
        logger.info(f"Note created successfully with title: {new_note.title}")

        try:
            note_entity = NoteEntity(**new_note.model_dump() | {"id" : note_id})
            return note_entity
        except ValidationError as e:
            logger.warning(f"The note with ID has a problem: {str(note_id)}")
            raise e


    def create_note_from_data(self, req_data: dict) -> NoteEntity:
        logger.debug(f"Processing request data to create note: {req_data}")

        received_subjects_id = req_data.get("subjects")

        if self.repo.get_by_name(req_data.get("title")):
            logger.info(f"Note with title '{req_data.get('title')}' already exists. Returning existing note.")
            raise NoteAlreadyExists("This note with this title already exists")

        found_subjects: List[ObjectId] = []

        for subject_id in received_subjects_id:
            if subject_object := self.subjects_repo.get_by_id(subject_id):
                logger.debug(f"Subject found for ID: {subject_id}")
                found_subjects.append(ObjectId(subject_object.id))
            else:
                logger.warning(f"Subject with ID {subject_id} not found. Raising error.")
                raise SubjectNotFoundError()

        # Data flow
        new_note_data = req_data.copy()
        new_note_data["subjects"] = found_subjects

        try:
            new_note_entity = NewNoteEntity(**new_note_data)

        except ValidationError as e:
            logger.error(f"Error on creation: {e}")
            raise ValidationError(str(e))


        note_entity = self.create(new_note_entity)

        logger.info(f"Note entity created and inserted: {new_note_entity.title}")

        return note_entity

    def get_by_id(self, note_id: str) -> NoteEntity | None:
        logger.debug(f"get_by_id called with note_id: {note_id}")

        if ObjectId.is_valid(note_id):
            object_id = ObjectId(note_id)

            result = self.repo.get_by_id(note_id=object_id)

            if result:
                logger.info(f"Note fetched with ID: {note_id}")
                note_entity = self.parse_result_to_entity(NoteEntity, result)
                return note_entity

        logger.warning(f"Invalid ObjectId provided: {note_id}")
        return None

    def get_all(self):
        all_notes = [note for note in self.repo.get_all()]
        logger.info(f"{len(all_notes)} notes fetched from the database.")

        return [{
            "title": note.get("title"),
            "note": note.get("note"),
            "id": str(note.get("_id")),
            "aiResume" : note.get("aiResume"),
            "subjects": [
                subject_id for subject_id in (note.get("subjects") or [])
                if note.get("subjects") and subject_id and note is not None
            ]
        } for note in all_notes]

    def get_all_as_entity(self):
        all_notes = self.repo.get_all()
        logger.info(f"Attempting to convert all notes to NoteEntity")

        note_entities: List[NoteEntity] = []

        for note in all_notes:
            try:
                note_entity = NoteEntity(**note)
                note_entities.append(note_entity)
            except ValidationError:
                logger.warning(f"A badly formatted Note was found. Note id: {note.get('_id')}")
                continue

        logger.info(f"Successfully converted {len(note_entities)} notes to NoteEntity format")
        return note_entities

    def delete(self, item_id: ObjectId):
        logger.debug(f"Attempting to delete note with ID: {item_id}")
        result = self.repo.delete(item_id)
        logger.info(f"Note with ID {item_id} deleted.")
        return result

