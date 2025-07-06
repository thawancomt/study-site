from typing import List

from bson import ObjectId
from pydantic import BaseModel

from v1.entities.subjectEntity import SubjectEntity
from v1.utils.pyObjectID import PyObjectId


class NoteEntity(BaseModel):
    id : PyObjectId
    title : str
    note: str
    subjects: List[SubjectEntity] | None = None

    model_config = {
        "arbitrary_types_allowed" : True
    }

class NewNoteEntity(BaseModel):
    note : str
    title : str
    subjects : List[PyObjectId] | None = None

    model_config = {
        "arbitrary_types_allowed": True
    }