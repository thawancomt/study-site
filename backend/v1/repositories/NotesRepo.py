from pymongo import MongoClient

from v1.repositories.baseRepo import BaseRepo


class Notes(BaseRepo):
    def __init__(self):
        self.database = self.getDB()
        pass

    def create(self, *args, **kwargs):
        pass

    def get(self):
        pass

    def delete(self):
        pass

    def update(self):
        pass



