class AppError(Exception):
    """Base error for this app"""
    pass

class SubjectNotFoundError(AppError):
    """The requested subject wasn't found on the database."""
    pass

class NotRightEntity(AppError):
    """A expected entity was not received, instead it receive other type"""
    pass