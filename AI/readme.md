# Flask AI Chatbot with RAG - Clean Architecture

A professionally structured Flask-based AI chatbot using Retrieval-Augmented Generation (RAG) with clean code principles, proper separation of concerns, and modular architecture.

## 🏗️ Architecture Overview

This application follows clean architecture principles with clear separation of concerns:

- **`config.py`** - Configuration management and settings
- **`models.py`** - Data models and document processing logic
- **`services.py`** - Business logic and core services
- **`utils.py`** - Utility functions and helpers
- **`routes.py`** - HTTP route handlers and API logic
- **`app.py`** - Flask application factory and main entry point
- **`run.py`** - Alternative entry point with enhanced logging

## 📁 Project Structure

```
chatbot-project/
├── app.py                 # Main Flask application factory
├── config.py              # Configuration and settings
├── models.py              # Document processing models
├── services.py            # Knowledge base service layer
├── utils.py               # Utility functions
├── routes.py              # API route handlers
├── run.py                 # Enhanced entry point
├── requirements.txt       # Python dependencies
├── .env                   # Environment variables (optional)
├── README.md              # This documentation
├── uploads/               # Auto-created upload directory
└── db/                    # Auto-created vector database
```

## ✨ Features

### Core Features

- **Clean Architecture** - Modular design with separation of concerns
- **Document Processing** - Support for CSV and Excel files
- **Vector Search** - Intelligent document retrieval using embeddings
- **Indonesian Responses** - Localized AI responses
- **Error Handling** - Comprehensive error handling and validation
- **File Management** - Secure file upload and cleanup

### Technical Features

- **Configuration Management** - Centralized settings in `config.py`
- **Service Layer** - Business logic separated from routes
- **Utility Functions** - Reusable helper functions
- **Input Validation** - Robust input validation and sanitization
- **Response Formatting** - Consistent API response format
- **Health Checks** - System health monitoring endpoint

## 🚀 Quick Start

### 1. Prerequisites

```bash
# Install Ollama
curl -fsSL https://ollama.ai/install.sh | sh

# Pull the required model
ollama pull deepseek-r1:1.5b
```

### 2. Project Setup

```bash
# Clone/create project directory
mkdir chatbot-project && cd chatbot-project

# Create virtual environment
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt
```

### 3. Run the Application

**Option 1: Using app.py**

```bash
python app.py
```

**Option 2: Using run.py (recommended)**

```bash
python run.py
```

The application will start on `http://localhost:5000`

## 🔧 Configuration

### Environment Variables (.env file)

```bash
# Flask Configuration
FLASK_PORT=5000
FLASK_DEBUG=False

# Model Configuration
EMBEDDING_MODEL=all-MiniLM-L6-v2
LLM_MODEL=deepseek-r1:1.5b

# Processing Configuration
CHUNK_SIZE=500
CHUNK_OVERLAP=50

# File Configuration
MAX_CONTENT_LENGTH=16777216
UPLOAD_DIR=uploads
DB_DIR=db
```

### Programmatic Configuration

Modify `config.py` to change application settings:

```python
class Config:
    # Change chunk size for different document processing
    CHUNK_SIZE = 1000
    CHUNK_OVERLAP = 100

    # Use different models
    EMBEDDING_MODEL = "sentence-transformers/all-mpnet-base-v2"
    LLM_MODEL = "llama2:7b"

    # Adjust file size limits
    MAX_CONTENT_LENGTH = 32 * 1024 * 1024  # 32MB
```

## 📡 API Endpoints

### GET `/` - Welcome

```bash
curl http://localhost:5000/
```

Response:

```json
{
  "success": true,
  "message": "Welcome to the AI Chat Bot API",
  "version": "1.0",
  "status": "running"
}
```

### POST `/update` - Upload Document

```bash
curl -X POST -F "file=@data.csv" http://localhost:5000/update
```

Response:

```json
{
  "success": true,
  "message": "Knowledge base updated successfully."
}
```

### POST `/ask` - Ask Question

```bash
curl -X POST -H "Content-Type: application/json" \
     -d '{"question": "Apa saja data yang tersedia?"}' \
     http://localhost:5000/ask
```

Response:

```json
{
  "success": true,
  "message": "Question processed successfully",
  "answer": "Berdasarkan data yang tersedia..."
}
```

### GET `/health` - Health Check

```bash
curl http://localhost:5000/health
```

Response:

```json
{
  "status": "healthy",
  "knowledge_base_initialized": true
}
```

## 🛠️ Development

### Adding New Features

1. **New Route**: Add to `routes.py`

```python
def new_endpoint(self):
    """Handle new functionality."""
    # Implementation here
    pass
```

2. **New Service**: Extend `services.py`

```python
class NewService:
    """New business logic service."""
    pass
```

3. **New Utility**: Add to `utils.py`

```python
class NewUtils:
    """New utility functions."""
    pass
```

### Code Style Guidelines

- Follow PEP 8 style guidelines
- Use type hints where possible
- Write comprehensive docstrings
- Add unit tests for new functionality
- Use descriptive variable and function names

### Error Handling Pattern

```python
def your_function():
    try:
        # Main logic
        result = some_operation()
        return result, None
    except SpecificException as e:
        return None, f"Specific error: {str(e)}"
    except Exception as e:
        return None, f"Unexpected error: {str(e)}"
```

## 🔍 Troubleshooting

### Common Issues

**ImportError: No module named 'X'**

```bash
pip install -r requirements.txt
```

**Ollama connection failed**

```bash
# Check if Ollama is running
ollama serve

# Verify model is installed
ollama list
```

**File upload fails**

- Check file size (default limit: 16MB)
- Verify file format (CSV, XLSX, XLS only)
- Ensure proper permissions on upload directory

**Knowledge base not initialized**

- Upload a file first using `/update` endpoint
- Check if the file was processed successfully
- Verify Ollama model is available

### Debug Mode

Enable debug mode in `config.py`:

```python
class Config:
    FLASK_DEBUG = True
```

Or set environment variable:

```bash
export FLASK_DEBUG=True
python run.py
```

## 📊 Monitoring and Logging

### Health Monitoring

The `/health` endpoint provides system status:

- Application health
- Knowledge base initialization status
- Model availability (future enhancement)

### Logging Enhancement

Add logging to track application behavior:

```python
import logging

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)
```

## 🚀 Deployment

### Production Considerations

1. **Use Production WSGI Server**

```bash
pip install gunicorn
gunicorn -w 4 -b 0.0.0.0:5000 app:create_app()
```

2. **Environment Variables**

```bash
export FLASK_DEBUG=False
export FLASK_PORT=5000
```

3. **Security Enhancements**

- Add authentication middleware
- Implement rate limiting
- Use HTTPS in production
- Validate and sanitize all inputs

4. **Performance Optimization**

- Use Redis for caching
- Implement connection pooling
- Add request/response compression
- Monitor memory usage

## 📝 Contributing

1. Fork the repository
2. Create a feature branch
3. Write tests for new functionality
4. Ensure all tests pass
5. Follow code style guidelines
6. Submit a pull request

## 📄 License

This project is open source and available under the MIT License.

## 🆘 Support

For support and questions:

- Check the troubleshooting section
- Review the API documentation
- Submit issues for bugs or feature requests
- Contribute improvements via pull requests
