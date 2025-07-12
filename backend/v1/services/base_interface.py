from abc import  ABC, abstractmethod

from bson import ObjectId


class BaseService(ABC):
    @abstractmethod
    def create(self, *args, **kwargs): return

    @abstractmethod
    def get_all(self): return

    @abstractmethod
    def get_by_id(self, object_id : ObjectId): return

    def __init__(self, repository_instance):
        self.repo = repository_instance()

    @abstractmethod
    def delete(self, item_id : ObjectId):
        pass

