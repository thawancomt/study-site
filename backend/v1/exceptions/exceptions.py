class AppError(Exception):
    """Base error for this app"""
    pass

class SubjectNotFoundError(AppError):
    """The requested subject wasn't found on the database."""
    pass