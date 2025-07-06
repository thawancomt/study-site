from bson import ObjectId

from v1.repositories.subjectsRepo import SubjectRepo
from v1.services.base_interface import BaseService


class SubjectsServices(BaseService):
    repo : SubjectRepo

    def create(self):
        pass

    def get_all(self):
        pass

    def get_by_id(self, id : ObjectId):
        return self.repo.get_by_id(id)