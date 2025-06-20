# config.py
"""Configuration settings for the Flask AI Chatbot application."""

import os

class Config:
    """Application configuration class."""
    
    # Directories
    DB_DIR = "db"
    UPLOAD_DIR = "uploads"
    
    # Model configurations
    EMBEDDING_MODEL = "all-MiniLM-L6-v2"
    LLM_MODEL = "deepseek-r1:1.5b"
    
    # Text processing settings
    CHUNK_SIZE = 500
    CHUNK_OVERLAP = 50
    
    # Flask settings
    FLASK_PORT = 5000
    FLASK_DEBUG = False
    
    # File settings
    MAX_CONTENT_LENGTH = 16 * 1024 * 1024  # 16MB max file size
    ALLOWED_EXTENSIONS = {'.csv', '.xlsx', '.xls'}
    
    @staticmethod
    def create_directories():
        """Create necessary directories if they don't exist."""
        os.makedirs(Config.UPLOAD_DIR, exist_ok=True)
        os.makedirs(Config.DB_DIR, exist_ok=True)
