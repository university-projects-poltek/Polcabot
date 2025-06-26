# routes.py
"""Flask route handlers."""

from flask import request, jsonify
from services import KnowledgeBaseService
from utils import FileUtils, ResponseUtils

class ChatBotRoutes:
    """Route handlers for the chatbot API."""
    
    def __init__(self):
        self.kb_service = KnowledgeBaseService()
    
    def index(self):
        """Welcome endpoint."""
        return jsonify(ResponseUtils.success_response(
            "Welcome to the AI Chat Bot API",
            {"version": "1.0", "status": "running"}
        ))
    
    def update_knowledge_base(self):
        """Handle file upload and knowledge base update."""
        try:
            # Check if file is present
            if 'file' not in request.files:
                return jsonify(ResponseUtils.error_response(
                    "No file provided"
                )), 400
            
            file = request.files['file']
            
            # Save uploaded file
            file_path, error = FileUtils.save_uploaded_file(file)
            if error:
                return jsonify(ResponseUtils.error_response(error)), 400
            
            # Update knowledge base
            message, status_code = self.kb_service.update_knowledge_base(file_path)
            
            # Cleanup uploaded file
            FileUtils.cleanup_file(file_path)
            
            # Return response
            if status_code == 200:
                return jsonify(ResponseUtils.success_response(message)), status_code
            else:
                return jsonify(ResponseUtils.error_response(message)), status_code
                
        except Exception as e:
            return jsonify(ResponseUtils.error_response(
                f"Unexpected error: {str(e)}"
            )), 500
    
    def ask_question(self):
        """Handle question asking."""
        try:
            # Get JSON data
            data = request.get_json()
            if not data:
                return jsonify(ResponseUtils.error_response(
                    "No JSON data provided"
                )), 400
            
            question = data.get("question")
            if not question:
                return jsonify(ResponseUtils.error_response(
                    "No question provided"
                )), 400
            
            # Process question
            answer, status_code = self.kb_service.ask_question(question)
            
            if status_code == 200:
                return jsonify(ResponseUtils.success_response(
                    "Question processed successfully",
                    {"answer": answer}
                )), status_code
            else:
                return jsonify(ResponseUtils.error_response(answer)), status_code
                
        except Exception as e:
            return jsonify(ResponseUtils.error_response(
                f"Unexpected error: {str(e)}"
            )), 500
    
    def health_check(self):
        """Health check endpoint."""
        return jsonify({
            "status": "healthy",
            "knowledge_base_initialized": self.kb_service.is_initialized()
        })
