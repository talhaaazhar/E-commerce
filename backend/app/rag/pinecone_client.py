import os
from pinecone import Pinecone, ServerlessSpec
from app.core.config import settings


pc = Pinecone(api_key=settings.PINECONE_API_KEY)

INDEX_NAME = settings.PINECONE_INDEX_NAME


def create_index():

    if INDEX_NAME not in [i.name for i in pc.list_indexes()]:

        pc.create_index(
            name=INDEX_NAME,
            dimension=1536,
            metric="cosine",
            spec=ServerlessSpec(
                cloud="aws",
                region="us-east-1"
            )
        )


def get_index():
    return pc.Index(INDEX_NAME)

