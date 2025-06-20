# run.py (Alternative entry point)
"""
Alternative entry point for running the application.
Usage: python run.py
"""

from app import create_app
from config import Config

if __name__ == "__main__":
    app = create_app()
    print(f"🚀 Starting Flask AI Chatbot on port {Config.FLASK_PORT}")
    print(f"📊 Knowledge Base Directory: {Config.DB_DIR}")
    print(f"📁 Upload Directory: {Config.UPLOAD_DIR}")
    print("🤖 Ready to accept file uploads and answer questions!")
    
    app.run(
        host='0.0.0.0',
        port=Config.FLASK_PORT,
        debug=Config.FLASK_DEBUG
    )