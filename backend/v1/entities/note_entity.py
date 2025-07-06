from pydantic import BaseModel

class NotesEntity(BaseModel):
    id : str
    name: str
    content: str