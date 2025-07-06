from typing import  TypedDict
from pydantic import BaseModel, field_validator


class NewSubjectEntity(BaseModel):
    name : str
    description : str



class SubjectEntity(BaseModel):
    id: int
    name: str
    description : str