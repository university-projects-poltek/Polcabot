from flask import Flask, request, jsonify
import os
import pandas as pd
from langchain_community.embeddings import HuggingFaceEmbeddings
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_community.vectorstores import Chroma
from langchain.prompts import PromptTemplate
from langchain.chains import RetrievalQA
from langchain_community.llms import Ollama
from langchain_core.documents import Document
import shutil

app = Flask(__name__)

DB_DIR = "db"
UPLOAD_DIR = "uploads"

embedding = HuggingFaceEmbeddings(model_name="all-MiniLM-L6-v2")
llm = Ollama(model="deepseek-r1:1.5b")
retriever = None
qa_chain = None

def update_knowledge_base(file_path):
    global retriever, qa_chain

    if not os.path.exists(file_path):
        return "File not found.", 404

    try:
        if file_path.endswith(".csv"):
            df = pd.read_csv(file_path)
        elif file_path.endswith(".xlsx") or file_path.endswith(".xls"):
            df = pd.read_excel(file_path, engine="openpyxl")
        else:
            return "Unsupported file format. Only .csv and .xlsx are allowed.", 400
    except Exception as e:
        return f"Error reading file: {str(e)}", 500

    text_data = "\n".join(df.astype(str).fillna("").agg(" ".join, axis=1).tolist())
    documents = [Document(page_content=text_data)]

    splitter = RecursiveCharacterTextSplitter(chunk_size=500, chunk_overlap=50)
    chunks = splitter.split_documents(documents)

    if os.path.exists(DB_DIR):
        shutil.rmtree(DB_DIR)

    db = Chroma.from_documents(chunks, embedding, persist_directory=DB_DIR)
    db.persist()

    retriever = db.as_retriever()

    prompt = PromptTemplate(
        template="""
Gunakan informasi berikut untuk menjawab pertanyaan pengguna.
Jawablah dalam Bahasa Indonesia dengan jelas, padat, dan sopan.

---------------------
{context}
---------------------

Pertanyaan: {question}
Jawaban:
""",
        input_variables=["context", "question"],
    )

    qa_chain = RetrievalQA.from_chain_type(
        llm=llm,
        chain_type="stuff",
        retriever=retriever,
        chain_type_kwargs={"prompt": prompt},
        return_source_documents=False,
    )

    return "Knowledge base updated.", 200

@app.route('/', methods=['GET'])
def index():
    return jsonify({"message": "Welcome to the AI Chat Bot API"})

@app.route("/update", methods=["POST"])
def update():
    file = request.files.get("file")
    if not file:
        return jsonify({"error": "No file uploaded"}), 400

    os.makedirs(UPLOAD_DIR, exist_ok=True)
    upload_path = os.path.join(UPLOAD_DIR, file.filename)
    file.save(upload_path)

    msg, status = update_knowledge_base(upload_path)

    os.remove(upload_path)
    return jsonify({"message": msg}), status

@app.route("/ask", methods=["POST"])
def ask():
    global qa_chain
    data = request.get_json()
    question = data.get("question")
    if not question:
        return jsonify({"error": "No question provided"}), 400

    if not qa_chain:
        return jsonify({"error": "Knowledge base not initialized. Please upload a file first via /update."}), 400

    answer = qa_chain.run(question)
    return jsonify({"answer": answer})

if __name__ == "__main__":
    os.makedirs(UPLOAD_DIR, exist_ok=True)
    # optional: preload from a file
    # update_knowledge_base("uploads/default.csv")
    app.run(port=5000)
