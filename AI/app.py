# app.py
"""Main Flask application."""

from flask import Flask
from flask_cors import CORS  # ✅ Import CORS
from config import Config
from routes import ChatBotRoutes

def create_app():
    """Application factory pattern."""
    app = Flask(__name__)
    app.config['MAX_CONTENT_LENGTH'] = Config.MAX_CONTENT_LENGTH

    # ✅ Enable CORS (allow all origins by default or customize if needed)
    CORS(app)

    # Create necessary directories
    Config.create_directories()

    # Initialize routes
    chat_routes = ChatBotRoutes()

    # Register routes
    app.add_url_rule('/', 'index', chat_routes.index, methods=['GET'])
    app.add_url_rule('/update', 'update', chat_routes.update_knowledge_base, methods=['POST'])
    app.add_url_rule('/ask', 'ask', chat_routes.ask_question, methods=['POST'])
    app.add_url_rule('/health', 'health', chat_routes.health_check, methods=['GET'])

    return app

def main():
    """Main entry point."""
    app = create_app()
    app.run(
        host='0.0.0.0',
        port=Config.FLASK_PORT,
        debug=Config.FLASK_DEBUG
    )

if __name__ == "__main__":
    main()
