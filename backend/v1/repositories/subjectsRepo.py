from django.db.models.expressions import result

from v1.entities.subjectEntity import SubjectEntity, NewSubjectEntity
from v1.repositories.baseRepo import BaseRepo
from bson.objectid import ObjectId

SUBJECTS_NAMESPACE = "subjects"

class SubjectRepo(BaseRepo):

    collection_store_name = "subjects"

    def __init__(self):
        self.database = self.getDB()
        self.collection = self.get_collection()

    def get_collection(self):
        return self.database.get_collection(SUBJECTS_NAMESPACE)

    def create(self, newSubject : NewSubjectEntity) -> SubjectEntity:
        result = self.collection.insert_one(
            newSubject
        )

        return result.inserted_id

    def get(self):
        pass

    def get_by_id(self, id : ObjectId ) -> SubjectEntity | None :

        try:
            object_id = ObjectId(id)
            result = self.collection.find_one({"_id" : object_id})

        except:
            print(f"Erro: O ID '{id}' não é um ObjectId válido. Retornando None.")
            return None

        return result

    def get_by_name(self, name):
        result = self.collection.find_one({"name" : name})

        return result if result else []


    def get_all(self):

        all_result = self.collection.find({}, {"name" : 1, "description" : 1, "_id" : 1})


        return [{"name": subject["name"], "description": subject["description"], "id": str(subject["_id"])} for subject in all_result]


    def delete(self):
        pass

    def update(self):
        pass




