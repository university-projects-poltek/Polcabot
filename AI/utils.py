# utils.py
"""Utility functions and helpers."""

import os
from werkzeug.utils import secure_filename
from config import Config
from typing import Tuple, Optional

class FileUtils:
    """File handling utilities."""
    
    @staticmethod
    def is_allowed_file(filename: str) -> bool:
        """
        Check if file extension is allowed.
        
        Args:
            filename: Name of the file
            
        Returns:
            True if file extension is allowed
        """
        if not filename:
            return False
        
        _, ext = os.path.splitext(filename.lower())
        return ext in Config.ALLOWED_EXTENSIONS
    
    @staticmethod
    def save_uploaded_file(file, upload_dir: str = None) -> Tuple[Optional[str], Optional[str]]:
        """
        Save uploaded file to disk.
        
        Args:
            file: Uploaded file object
            upload_dir: Directory to save file (defaults to Config.UPLOAD_DIR)
            
        Returns:
            Tuple of (file_path, error_message)
        """
        if not file or file.filename == '':
            return None, "No file selected"
        
        if not FileUtils.is_allowed_file(file.filename):
            return None, "File type not allowed"
        
        try:
            upload_dir = upload_dir or Config.UPLOAD_DIR
            os.makedirs(upload_dir, exist_ok=True)
            
            filename = secure_filename(file.filename)
            file_path = os.path.join(upload_dir, filename)
            file.save(file_path)
            
            return file_path, None
            
        except Exception as e:
            return None, f"Error saving file: {str(e)}"
    
    @staticmethod
    def cleanup_file(file_path: str) -> None:
        """
        Safely remove a file.
        
        Args:
            file_path: Path to the file to remove
        """
        try:
            if os.path.exists(file_path):
                os.remove(file_path)
        except Exception:
            pass  # Ignore cleanup errors

class ResponseUtils:
    """HTTP response utilities."""
    
    @staticmethod
    def success_response(message: str, data: dict = None):
        """Create a success response."""
        response = {"success": True, "message": message}
        if data:
            response.update(data)
        return response
    
    @staticmethod
    def error_response(message: str, error_code: str = None):
        """Create an error response."""
        response = {"success": False, "error": message}
        if error_code:
            response["error_code"] = error_code
        return response
