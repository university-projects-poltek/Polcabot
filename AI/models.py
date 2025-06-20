# models.py
"""Data models and document processing utilities."""

import pandas as pd
from langchain_core.documents import Document
from langchain.text_splitter import RecursiveCharacterTextSplitter
from typing import List, Tuple
import os

class DocumentProcessor:
    """Handle document processing and text extraction."""
    
    def __init__(self, chunk_size: int = 500, chunk_overlap: int = 50):
        self.text_splitter = RecursiveCharacterTextSplitter(
            chunk_size=chunk_size,
            chunk_overlap=chunk_overlap
        )
    
    def read_file(self, file_path: str) -> Tuple[pd.DataFrame, str]:
        """
        Read file and return DataFrame.
        
        Args:
            file_path: Path to the file
            
        Returns:
            Tuple of (DataFrame, error_message)
        """
        try:
            if file_path.endswith(".csv"):
                df = pd.read_csv(file_path)
            elif file_path.endswith((".xlsx", ".xls")):
                df = pd.read_excel(file_path, engine="openpyxl")
            else:
                return None, "Unsupported file format. Only .csv and .xlsx are allowed."
            
            return df, None
            
        except Exception as e:
            return None, f"Error reading file: {str(e)}"
    
    def dataframe_to_text(self, df: pd.DataFrame) -> str:
        """
        Convert DataFrame to text for processing.
        
        Args:
            df: Input DataFrame
            
        Returns:
            Concatenated text from all rows
        """
        return "\n".join(
            df.astype(str).fillna("").agg(" ".join, axis=1).tolist()
        )
    
    def create_documents(self, text_data: str) -> List[Document]:
        """
        Create Document objects from text data.
        
        Args:
            text_data: Input text
            
        Returns:
            List of Document objects
        """
        documents = [Document(page_content=text_data)]
        return self.text_splitter.split_documents(documents)
    
    def process_file(self, file_path: str) -> Tuple[List[Document], str]:
        """
        Complete file processing pipeline.
        
        Args:
            file_path: Path to the file
            
        Returns:
            Tuple of (documents, error_message)
        """
        # Read file
        df, error = self.read_file(file_path)
        if error:
            return None, error
        
        # Convert to text
        text_data = self.dataframe_to_text(df)
        
        # Create documents
        documents = self.create_documents(text_data)
        
        return documents, None
