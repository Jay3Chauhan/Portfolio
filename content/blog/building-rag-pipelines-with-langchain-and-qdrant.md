---
title: "Building Production RAG Pipelines with LangChain and Qdrant"
description: "A practical guide to building Retrieval-Augmented Generation systems — from document ingestion and vector embeddings to LLM inference with citation grounding."
date: "2026-04-15"
category: "Tutorial"
tags: ["RAG", "LangChain", "Qdrant", "GenAI", "Python"]
readTime: "10 min read"
---

## Why RAG Matters

Large Language Models are powerful, but they hallucinate. Retrieval-Augmented Generation (RAG) grounds LLM responses in your actual data — making them reliable enough for production use cases like regulatory compliance, financial Q&A, and enterprise search.

In this guide, I'll walk through building a production RAG pipeline using LangChain and Qdrant, based on my experience building ComplianceIQ for RBI/SEBI regulatory documents.

## Architecture Overview

A production RAG system has three core stages:

1. **Ingestion** — Parse documents, chunk them, generate embeddings, store in a vector database
2. **Retrieval** — Given a query, find the most relevant chunks using semantic search
3. **Generation** — Feed retrieved context to an LLM to produce grounded answers

## Step 1: Document Ingestion

```python
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_community.document_loaders import PyPDFLoader

loader = PyPDFLoader("rbi_circular.pdf")
documents = loader.load()

splitter = RecursiveCharacterTextSplitter(
    chunk_size=500,
    chunk_overlap=50,
    separators=["\n\n", "\n", ". ", " "]
)
chunks = splitter.split_documents(documents)
```

Key decisions here: **500-token chunks** with overlap give the best balance of context and precision. Too large and you dilute the signal; too small and you lose context.

## Step 2: Embedding & Vector Storage

```python
from langchain_community.embeddings import HuggingFaceBgeEmbeddings
from langchain_qdrant import QdrantVectorStore

embeddings = HuggingFaceBgeEmbeddings(
    model_name="BAAI/bge-small-en-v1.5"
)

vectorstore = QdrantVectorStore.from_documents(
    documents=chunks,
    embedding=embeddings,
    url="your-qdrant-cloud-url",
    collection_name="regulatory_docs",
)
```

I use `BAAI/bge-small-en-v1.5` for zero embedding API cost with strong retrieval performance. For production, Qdrant Cloud handles scaling and persistence.

## Step 3: Retrieval with Filters

```python
retriever = vectorstore.as_retriever(
    search_type="similarity_score_threshold",
    search_kwargs={
        "score_threshold": 0.35,
        "k": 5,
        "filter": {"category": "RBI"}
    }
)
```

The `0.35` relevance threshold drops low-signal context before it reaches the LLM — critical for reducing hallucinations.

## Step 4: LLM Generation with Grounding

```python
from langchain_groq import ChatGroq
from langchain.chains import RetrievalQA

llm = ChatGroq(
    model_name="llama-3.3-70b-versatile",
    temperature=0.1,
)

chain = RetrievalQA.from_chain_type(
    llm=llm,
    retriever=retriever,
    return_source_documents=True,
)
```

Low temperature (0.1) keeps answers factual. Returning source documents enables citation enforcement.

## Evaluation with RAGAS

Don't ship a RAG system without evaluation:

- **Faithfulness** — Does the answer stick to the retrieved context?
- **Context Precision** — Are the retrieved chunks relevant?
- **Answer Relevancy** — Does the answer address the question?

Benchmark with at least 20 Q&A pairs across different categories.

## Lessons Learned

1. **Chunk size matters more than embedding model** — Experiment with 300-700 token ranges
2. **Metadata filtering is essential** — Category/date filters dramatically improve precision
3. **Threshold tuning prevents hallucinations** — Better to return "I don't know" than wrong answers
4. **Exponential backoff for LLM APIs** — Rate limits are real in production

RAG is the bridge between powerful LLMs and reliable enterprise applications. Get the retrieval right, and the generation follows.
