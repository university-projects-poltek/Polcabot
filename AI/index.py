import pandas as pd
from langchain_community.embeddings import HuggingFaceEmbeddings
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_community.vectorstores import Chroma
from langchain.prompts import PromptTemplate
from langchain.chains import RetrievalQA
from langchain_community.llms import Ollama
from langchain_core.documents import Document

# === Load and preprocess Excel data ===
df = pd.read_excel("list-question.xlsx")  # Make sure this file exists

# Combine all rows into one text block (customize if needed)
text_data = "\n".join(df.astype(str).fillna("").agg(" ".join, axis=1).tolist())

# Convert to LangChain Document
documents = [Document(page_content=text_data)]

# === Split text into chunks ===
splitter = RecursiveCharacterTextSplitter(chunk_size=500, chunk_overlap=50)
chunks = splitter.split_documents(documents)

# === Generate embeddings and persist in ChromaDB ===
embedding = HuggingFaceEmbeddings(model_name="all-MiniLM-L6-v2")
db = Chroma.from_documents(chunks, embedding, persist_directory="db")
db.persist()

# === Load vector store ===
db = Chroma(persist_directory="db", embedding_function=embedding)

# === Set up Ollama with deepseek-r1 ===
llm = Ollama(model="deepseek-r1:1.5b")

# === Bahasa Indonesia Prompt Template ===
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

# === QA chain with retriever and Indonesian prompt ===
qa_chain = RetrievalQA.from_chain_type(
    llm=llm,
    chain_type="stuff",
    retriever=db.as_retriever(),
    chain_type_kwargs={"prompt": prompt},
    return_source_documents=False
)

# === Chat loop ===
print("\n🧠 Chatbot Bahasa Indonesia (Tekan Ctrl+C untuk keluar)")
while True:
    try:
        query = input("\n🧑 Anda: ")
        if query.strip() == "":
            continue
        answer = qa_chain.run(query)
        print(f"\n🤖 Bot: {answer}")
    except KeyboardInterrupt:
        print("\n👋 Sampai jumpa!")
        break
