from app.rag.pinecone_client import get_index

# Get Pinecone index
index = get_index()

# Insert a single test vector
index.upsert(
    vectors=[
        {
            "id": "test1",                   # unique id
            "values": [0.1] * 1536,          # must match embedding dimension
            "metadata": {"name": "test product"}
        }
    ]
)

print("Inserted test vector!")

# Query the index
result = index.query(
    vector=[0.1] * 1536,
    top_k=1,
    include_metadata=True
)

print("Query result:")
print(result)