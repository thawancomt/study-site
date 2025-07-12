from typing import List

from bson import ObjectId
from pydantic import BaseModel, Field, AliasChoices

from v1.entities.subjectEntity import SubjectEntity
from v1.utils.pyObjectID import PyObjectId


class NoteEntity(BaseModel):
    id : PyObjectId = Field(validation_alias=AliasChoices('_id', 'id'))
    title : str
    note: str
    subjects: List[SubjectEntity] | None = None

    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True

class NewNoteEntity(BaseModel):
    note : str
    title : str
    subjects : List[PyObjectId] | None = None

    model_config = {
        "arbitrary_types_allowed": True
    }