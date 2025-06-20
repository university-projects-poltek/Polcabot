# Flask AI Chatbot with RAG

A Flask-based AI chatbot that uses Retrieval-Augmented Generation (RAG) to answer questions based on uploaded CSV/Excel files. The bot processes your documents, creates a vector database, and provides intelligent responses in Indonesian.

## Features

- Upload CSV/Excel files to create a knowledge base
- RAG-based question answering using local LLM
- Vector similarity search with Chroma database
- Indonesian language responses
- RESTful API endpoints
- Automatic document chunking and embedding

## Prerequisites

- Python 3.8 or higher
- Ollama installed and running
- At least 4GB of RAM (recommended 8GB+)

## Installation

### 1. Install Ollama

First, install Ollama from [https://ollama.ai](https://ollama.ai)

Then pull the required model:

```bash
ollama pull deepseek-r1:1.5b
```

### 2. Clone/Download the Code

Save the Flask application code to a file named `app.py`.

### 3. Install Python Dependencies

Create a virtual environment (recommended):

```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

Install required packages:

```bash
pip install flask pandas langchain-community langchain-core chromadb sentence-transformers openpyxl
```

### 4. Create Project Structure

```
your-project/
├── app.py
├── uploads/          # Will be created automatically
├── db/              # Will be created automatically
└── requirements.txt  # Optional
```

## Usage

### 1. Start the Application

```bash
python app.py
```

The server will start on `http://localhost:5000`

### 2. Upload a Document

Upload a CSV or Excel file to create the knowledge base:

```bash
curl -X POST -F "file=@your_data.csv" http://localhost:5000/update
```

Or using Python:

```python
import requests

with open('your_data.csv', 'rb') as f:
    files = {'file': f}
    response = requests.post('http://localhost:5000/update', files=files)
    print(response.json())
```

### 3. Ask Questions

Send questions to get AI-powered answers:

```bash
curl -X POST -H "Content-Type: application/json" \
     -d '{"question": "Apa saja data yang tersedia?"}' \
     http://localhost:5000/ask
```

Or using Python:

```python
import requests

data = {"question": "Apa saja data yang tersedia?"}
response = requests.post('http://localhost:5000/ask', json=data)
print(response.json())
```

## API Endpoints

### GET /

- **Description**: Welcome message
- **Response**: `{"message": "Welcome to the AI Chat Bot API"}`

### POST /update

- **Description**: Upload and process a document
- **Parameters**:
  - `file`: CSV or Excel file (multipart/form-data)
- **Response**: `{"message": "Knowledge base updated."}`
- **Supported formats**: `.csv`, `.xlsx`, `.xls`

### POST /ask

- **Description**: Ask a question based on uploaded documents
- **Parameters**:
  - `question`: Your question in JSON format
- **Response**: `{"answer": "AI generated answer"}`

## Example Workflow

1. **Start the server**:

   ```bash
   python app.py
   ```

2. **Upload your data** (example with sales data):

   ```bash
   curl -X POST -F "file=@sales_data.csv" http://localhost:5000/update
   ```

3. **Ask questions**:

   ```bash
   # Ask about sales data
   curl -X POST -H "Content-Type: application/json" \
        -d '{"question": "Berapa total penjualan bulan ini?"}' \
        http://localhost:5000/ask

   # Ask for trends
   curl -X POST -H "Content-Type: application/json" \
        -d '{"question": "Apa tren penjualan yang terlihat dari data?"}' \
        http://localhost:5000/ask
   ```

## Configuration

### Change the LLM Model

To use a different Ollama model, modify this line in `app.py`:

```python
llm = Ollama(model="your-preferred-model")
```

### Adjust Chunk Size

Modify the text splitter settings:

```python
splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=100)
```

### Change Embedding Model

Replace with a different HuggingFace model:

```python
embedding = HuggingFaceEmbeddings(model_name="sentence-transformers/all-mpnet-base-v2")
```

## Troubleshooting

### Common Issues

1. **"Ollama model not found"**

   - Make sure Ollama is running: `ollama serve`
   - Verify the model is installed: `ollama list`

2. **"No module named 'sentence_transformers'"**

   - Install it: `pip install sentence-transformers`

3. **Memory issues**

   - Use a smaller model like `deepseek-r1:1.5b`
   - Reduce chunk_size in the text splitter

4. **File upload errors**
   - Check file format (only CSV/Excel supported)
   - Ensure file is not corrupted
   - Verify file size (large files may take time)

### Performance Tips

- Use SSD storage for better vector database performance
- Increase RAM for larger documents
- Consider using GPU acceleration for embeddings
- Batch process multiple files if needed

## Dependencies

Create a `requirements.txt` file:

```
flask==2.3.3
pandas==2.0.3
langchain-community==0.2.10
langchain-core==0.2.23
chromadb==0.4.15
sentence-transformers==2.2.2
openpyxl==3.1.2
```

## Security Notes

- This is a development server; use a production WSGI server for deployment
- Add authentication for production use
- Validate and sanitize file uploads
- Implement rate limiting for API endpoints

## License

This project is open source. Modify and use as needed for your applications.

## Contributing

Feel free to submit issues, feature requests, or pull requests to improve this chatbot implementation.
