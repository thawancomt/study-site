from django.db.models.expressions import result

from v1.entities.subjectEntity import SubjectEntity, NewSubjectEntity
from v1.repositories.baseRepo import BaseRepo

from pymongo import MongoClient
from pymongo.database import Database

SUBJECTS_NAMESPACE = "subjects"

class SubjectRepo(BaseRepo):
    def __init__(self):
        self.database : Database | None = None
        self.openDB()

        self.collection = self.get_collection()


    def openDB(self):
        try:
            self.database = MongoClient(BaseRepo.URI).get_database("mongoloid")
        except:
            raise NotImplemented

    def get_collection(self):
        return self.database.get_collection(SUBJECTS_NAMESPACE)

    def create(self, newSubject : NewSubjectEntity) -> SubjectEntity:
        result = self.collection.insert_one(
            newSubject
        )

        return result.inserted_id

    def get(self):
        pass

    def get_by_name(self, name):
        result = self.collection.find_one({"name" : name})

        return result if result else []


    def get_all(self):

        result = self.collection.find({}, {"name" : 1, "description" : 1, "_id" : 1})


        return [{"name": f["name"], "description": f["description"], "id": str(f["_id"])} for f in result]


    def delete(self):
        pass

    def update(self):
        pass


