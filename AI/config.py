# config.py
"""Strict configuration loading from .env only."""

import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

class Config:
    """Configuration loaded strictly from environment variables."""

    # Directories
    DB_DIR = os.environ["DB_DIR"]
    UPLOAD_DIR = os.environ["UPLOAD_DIR"]

    # Model configurations
    EMBEDDING_MODEL = os.environ["EMBEDDING_MODEL"]
    LLM_MODEL = os.environ["LLM_MODEL"]
    
    print((LLM_MODEL))

    # Text processing settings
    CHUNK_SIZE = int(os.environ["CHUNK_SIZE"])
    CHUNK_OVERLAP = int(os.environ["CHUNK_OVERLAP"])

    # Flask settings
    FLASK_PORT = int(os.environ["FLASK_PORT"])
    FLASK_DEBUG = os.environ["FLASK_DEBUG"].lower() == "true"

    # File settings
    MAX_CONTENT_LENGTH = int(os.environ["MAX_CONTENT_LENGTH"])
    ALLOWED_EXTENSIONS = {ext.strip() for ext in os.environ["ALLOWED_EXTENSIONS"].split(",")}

    @staticmethod
    def create_directories():
        """Create necessary directories if they don't exist."""
        os.makedirs(Config.UPLOAD_DIR, exist_ok=True)
        os.makedirs(Config.DB_DIR, exist_ok=True)
