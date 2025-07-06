from pydantic import AfterValidator,BeforeValidator
from bson.objectid import ObjectId
from typing_extensions import Annotated

PyObjectId = Annotated[
    ObjectId, 
    BeforeValidator(lambda x: ObjectId(x) if isinstance(x, str) and ObjectId.is_valid(x) else x ),
    AfterValidator(str)
]