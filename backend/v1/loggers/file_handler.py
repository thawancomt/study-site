import logging

def get_file_handler(filename : str):
    return  logging.FileHandler(filename)