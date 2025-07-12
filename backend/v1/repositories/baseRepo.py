from abc import ABC, abstractmethod

from pymongo import MongoClient
from pymongo.synchronous.collection import Collection
from pymongo.synchronous.database import Database


class BaseRepo(ABC):

    URI : str = "mongodb://127.0.0.1:27017/"

    database : Database = None
    collection : Collection = None
    collection_store_name : str


    def __init__(self):
        """By default in instantiate time the class open the dbCOnnection and connection with the colletion"""
        self.database = self.getDB()
        self.collection = self.get_collection()

    @abstractmethod
    def create(self, *args, **kwargs):
        pass

    @abstractmethod
    def delete(self, *args, **kwargs):
        return

    @abstractmethod
    def update(self, *args, **kwargs):
        return

    @abstractmethod
    def get_all(self):
        pass

    def get_collection(self):
        if self.database != None:
            return self.database.get_collection(self.collection_store_name)

    def getDB(self):

        """Return openned connection with mongoDB"""
        try:
            return MongoClient(BaseRepo.URI).get_database("mongoloid")
        except:
            raise NotImplemented


