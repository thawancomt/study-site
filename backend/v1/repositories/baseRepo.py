from abc import ABC, abstractmethod


class BaseRepo(ABC):

    URI : str = "mongodb://127.0.0.1:27017/"

    @abstractmethod
    def create(self, *args, **kwargs):
        pass

    @abstractmethod
    def get(self):
        return

    @abstractmethod
    def delete(self):
        return

    @abstractmethod
    def update(self):
        return

    @abstractmethod
    def openDB(self):
        return
