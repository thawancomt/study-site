from pydantic import BaseModel

from v1.utils.pyObjectID import PyObjectId


class NewSubjectEntity(BaseModel):
    name : str
    description : str



class SubjectEntity(BaseModel):
    id: PyObjectId
    name: str
    description : str

    model_config = {
        "arbitrary_types_allowed" : True
    }