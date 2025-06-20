"""Business logic and service layer."""

import os
import shutil
from typing import Optional, Tuple
from langchain_community.embeddings import HuggingFaceEmbeddings
from langchain_community.vectorstores import Chroma
from langchain_community.llms import Ollama
from langchain.prompts import PromptTemplate
from langchain.chains import RetrievalQA
from models import DocumentProcessor
from config import Config

class KnowledgeBaseService:
    """Service for managing the knowledge base and QA operations."""
    
    def __init__(self):
        self.embedding = HuggingFaceEmbeddings(model_name=Config.EMBEDDING_MODEL)
        self.llm = Ollama(model=Config.LLM_MODEL)
        self.document_processor = DocumentProcessor(
            chunk_size=Config.CHUNK_SIZE,
            chunk_overlap=Config.CHUNK_OVERLAP
        )
        self.retriever = None
        self.qa_chain = None
        self._setup_prompt_template()
    
    def _setup_prompt_template(self):
        """Setup the prompt template for QA chain."""
        self.prompt = PromptTemplate(
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
    
    def update_knowledge_base(self, file_path: str) -> Tuple[str, int]:
        """
        Update the knowledge base with a new document.
        
        Args:
            file_path: Path to the document file
            
        Returns:
            Tuple of (message, status_code)
        """
        if not os.path.exists(file_path):
            return "File not found.", 404
        
        # Process the document
        documents, error = self.document_processor.process_file(file_path)
        if error:
            return error, 500
        
        try:
            # Remove existing database
            if os.path.exists(Config.DB_DIR):
                shutil.rmtree(Config.DB_DIR)
            
            # Create new vector database
            db = Chroma.from_documents(
                documents, 
                self.embedding, 
                persist_directory=Config.DB_DIR
            )
            db.persist()
            
            # Setup retriever and QA chain
            self.retriever = db.as_retriever()
            self.qa_chain = RetrievalQA.from_chain_type(
                llm=self.llm,
                chain_type="stuff",
                retriever=self.retriever,
                chain_type_kwargs={"prompt": self.prompt},
                return_source_documents=False,
            )
            
            return "Knowledge base updated successfully.", 200
            
        except Exception as e:
            return f"Error updating knowledge base: {str(e)}", 500
    
    def ask_question(self, question: str) -> Tuple[str, int]:
        """
        Ask a question to the QA system.
        
        Args:
            question: The question to ask
            
        Returns:
            Tuple of (answer, status_code)
        """
        if not self.qa_chain:
            return "Knowledge base not initialized. Please upload a file first.", 400
        
        if not question or not question.strip():
            return "Question cannot be empty.", 400
        
        try:
            answer = self.qa_chain.run(question)
            return answer, 200
        except Exception as e:
            return f"Error processing question: {str(e)}", 500
    
    def is_initialized(self) -> bool:
        """Check if the knowledge base is initialized."""
        return self.qa_chain is not None
